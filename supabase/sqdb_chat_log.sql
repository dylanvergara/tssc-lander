-- Success Query (/sqdb) chat log. Applied to Supabase project iwvgztmpbwnlobhfizlc
-- as migration "sqdb_chat_log". Kept here for reference.
--
-- Writes: only through public.log_sqdb_chat(), called server-side by
-- app/api/chat/route.js with the anon key plus a shared secret (Vercel env
-- SQDB_LOG_SECRET). The function checks sha256(secret) against
-- sqdb_private.settings, so anon cannot write without the secret.
-- Reads: no anon/authenticated access (RLS on, no policies, grants revoked).
-- Read it from the Supabase SQL editor / service role.

create table public.sqdb_chat_log (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  session_id     text check (session_id ~ '^[A-Za-z0-9-]{16,64}$'),
  turn_index     integer check (turn_index between 0 and 1000),
  question       text check (char_length(question) <= 8000),
  reply          text check (char_length(reply) <= 20000),
  status         text not null check (status in ('ok','blocked_origin','rate_limited','bad_request','upstream_error','error')),
  http_status    smallint,
  latency_ms     integer check (latency_ms between 0 and 600000),
  model          text check (char_length(model) <= 100),
  env            text check (env in ('production','preview','development')),
  page_path      text check (char_length(page_path) <= 300),
  device_type    text check (device_type in ('mobile','tablet','desktop','bot','unknown')),
  utm_source     text check (char_length(utm_source) <= 200),
  utm_medium     text check (char_length(utm_medium) <= 200),
  utm_campaign   text check (char_length(utm_campaign) <= 200),
  utm_content    text check (char_length(utm_content) <= 200),
  utm_term       text check (char_length(utm_term) <= 200),
  -- Reserved for a possible future opt-in tie-back. Unused for now.
  visitor_id     text check (char_length(visitor_id) <= 100),
  subscriber_ref text check (char_length(subscriber_ref) <= 200)
);

comment on table public.sqdb_chat_log is
  'Every /sqdb Success Query chat turn (question + reply). No IPs, emails, names or user agents. Written only via log_sqdb_chat().';

create index sqdb_chat_log_created_at_idx on public.sqdb_chat_log (created_at desc);
create index sqdb_chat_log_session_idx on public.sqdb_chat_log (session_id, turn_index);

alter table public.sqdb_chat_log enable row level security;
revoke all on table public.sqdb_chat_log from anon, authenticated, public;

-- Private schema (not exposed through the Data API) for the secret hash.
create schema if not exists sqdb_private;
revoke all on schema sqdb_private from public, anon, authenticated;

create table sqdb_private.settings (
  name  text primary key,
  value text not null
);
revoke all on table sqdb_private.settings from public, anon, authenticated;
-- Then: insert into sqdb_private.settings (name, value) values ('log_secret_sha256', '<sha256 hex of SQDB_LOG_SECRET>');

create or replace function public.log_sqdb_chat(
  p_secret       text,
  p_session_id   text default null,
  p_turn_index   integer default null,
  p_question     text default null,
  p_reply        text default null,
  p_status       text default 'ok',
  p_http_status  integer default null,
  p_latency_ms   integer default null,
  p_model        text default null,
  p_env          text default null,
  p_page_path    text default null,
  p_device_type  text default null,
  p_utm_source   text default null,
  p_utm_medium   text default null,
  p_utm_campaign text default null,
  p_utm_content  text default null,
  p_utm_term     text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_expected text;
begin
  select s.value into v_expected from sqdb_private.settings s where s.name = 'log_secret_sha256';
  if v_expected is null or p_secret is null or char_length(p_secret) > 200
     or encode(extensions.digest(p_secret, 'sha256'), 'hex') <> v_expected then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  -- Flood guard: never more than 600 rows per minute, whatever the caller does.
  if (select count(*) from public.sqdb_chat_log l where l.created_at > now() - interval '1 minute') >= 600 then
    return;
  end if;

  insert into public.sqdb_chat_log (
    session_id, turn_index, question, reply, status, http_status, latency_ms, model, env,
    page_path, device_type, utm_source, utm_medium, utm_campaign, utm_content, utm_term
  ) values (
    case when p_session_id ~ '^[A-Za-z0-9-]{16,64}$' then p_session_id end,
    case when p_turn_index between 0 and 1000 then p_turn_index end,
    left(p_question, 8000),
    left(p_reply, 20000),
    case when p_status in ('ok','blocked_origin','rate_limited','bad_request','upstream_error','error') then p_status else 'error' end,
    case when p_http_status between 100 and 599 then p_http_status end,
    case when p_latency_ms between 0 and 600000 then p_latency_ms end,
    left(p_model, 100),
    case when p_env in ('production','preview','development') then p_env end,
    left(p_page_path, 300),
    case when p_device_type in ('mobile','tablet','desktop','bot','unknown') then p_device_type else 'unknown' end,
    left(p_utm_source, 200), left(p_utm_medium, 200), left(p_utm_campaign, 200),
    left(p_utm_content, 200), left(p_utm_term, 200)
  );
end;
$$;

revoke all on function public.log_sqdb_chat(text, text, integer, text, text, text, integer, integer, text, text, text, text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.log_sqdb_chat(text, text, integer, text, text, text, integer, integer, text, text, text, text, text, text, text, text, text) to anon;
