-- SQDB opt-in tie-back. Applied to Supabase project iwvgztmpbwnlobhfizlc as
-- migration "sqdb_optin_link". Kept here for reference.
--
-- visitor_id     : random first-party browser id (UUID, localStorage 'tssc_vid').
-- subscriber_ref : beehiiv subscription id, canonical form 'sub_<uuid>'.
-- No emails, names or IPs are stored anywhere.
--
-- Writes go only through SECURITY DEFINER functions gated by the shared secret
-- SQDB_LOG_SECRET (sha256 in sqdb_private.settings), called server-side.

-- 1. Link table: one row per (browser, subscriber, source).
create table public.sqdb_optin_link (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  visitor_id     text not null check (visitor_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'),
  subscriber_ref text not null check (subscriber_ref ~ '^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'),
  source         text not null check (source in ('confirmation','email_link')),
  id_param       text check (id_param in ('sid','subscription_id','subscriber_id','sub_id','id','uuid','email')),
  env            text check (env in ('production','preview','development')),
  unique (visitor_id, subscriber_ref, source)
);
comment on table public.sqdb_optin_link is
  'Links a random browser visitor_id to a beehiiv subscription id (from the /get-sqdb/confirmation redirect or an email link). No emails/names/IPs. Written only via log_sqdb_optin_link().';
create index sqdb_optin_link_visitor_idx on public.sqdb_optin_link (visitor_id, created_at desc);
create index sqdb_optin_link_subscriber_idx on public.sqdb_optin_link (subscriber_ref);

alter table public.sqdb_optin_link enable row level security;
revoke all on table public.sqdb_optin_link from anon, authenticated, public;

-- 2. Chat log: format checks for the two reserved columns, plus indexes.
alter table public.sqdb_chat_log
  add constraint sqdb_chat_log_visitor_id_format check (visitor_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'),
  add constraint sqdb_chat_log_subscriber_ref_format check (subscriber_ref ~ '^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
create index sqdb_chat_log_visitor_idx on public.sqdb_chat_log (visitor_id);
create index sqdb_chat_log_subscriber_idx on public.sqdb_chat_log (subscriber_ref);

-- 3. log_sqdb_chat: same as before plus p_visitor_id / p_subscriber_ref (defaulted,
--    so callers that omit them keep working).
drop function public.log_sqdb_chat(text, text, integer, text, text, text, integer, integer, text, text, text, text, text, text, text, text, text);

create function public.log_sqdb_chat(
  p_secret         text,
  p_session_id     text default null,
  p_turn_index     integer default null,
  p_question       text default null,
  p_reply          text default null,
  p_status         text default 'ok',
  p_http_status    integer default null,
  p_latency_ms     integer default null,
  p_model          text default null,
  p_env            text default null,
  p_page_path      text default null,
  p_device_type    text default null,
  p_utm_source     text default null,
  p_utm_medium     text default null,
  p_utm_campaign   text default null,
  p_utm_content    text default null,
  p_utm_term       text default null,
  p_visitor_id     text default null,
  p_subscriber_ref text default null
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

  if (select count(*) from public.sqdb_chat_log l where l.created_at > now() - interval '1 minute') >= 600 then
    return;
  end if;

  insert into public.sqdb_chat_log (
    session_id, turn_index, question, reply, status, http_status, latency_ms, model, env,
    page_path, device_type, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    visitor_id, subscriber_ref
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
    left(p_utm_content, 200), left(p_utm_term, 200),
    case when p_visitor_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then p_visitor_id end,
    case when p_subscriber_ref ~ '^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then p_subscriber_ref end
  );
end;
$$;

revoke all on function public.log_sqdb_chat(text, text, integer, text, text, text, integer, integer, text, text, text, text, text, text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.log_sqdb_chat(text, text, integer, text, text, text, integer, integer, text, text, text, text, text, text, text, text, text, text, text) to anon;

-- 4. log_sqdb_optin_link: insert-or-ignore a browser <-> subscriber link.
create function public.log_sqdb_optin_link(
  p_secret         text,
  p_visitor_id     text,
  p_subscriber_ref text,
  p_source         text,
  p_id_param       text default null,
  p_env            text default null
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

  if p_visitor_id is null or p_visitor_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     or p_subscriber_ref is null or p_subscriber_ref !~ '^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     or p_source is null or p_source not in ('confirmation','email_link') then
    raise exception 'invalid' using errcode = '22023';
  end if;

  -- Flood guard.
  if (select count(*) from public.sqdb_optin_link l where l.created_at > now() - interval '1 minute') >= 300 then
    return;
  end if;

  insert into public.sqdb_optin_link (visitor_id, subscriber_ref, source, id_param, env)
  values (
    p_visitor_id, p_subscriber_ref, p_source,
    case when p_id_param in ('sid','subscription_id','subscriber_id','sub_id','id','uuid','email') then p_id_param end,
    case when p_env in ('production','preview','development') then p_env end
  )
  on conflict (visitor_id, subscriber_ref, source) do nothing;
end;
$$;

revoke all on function public.log_sqdb_optin_link(text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.log_sqdb_optin_link(text, text, text, text, text, text) to anon;

-- 5. Reporting view: every chat with the subscriber it resolves to, either
--    directly (sid sent with the chat) or via a visitor_id link (chats from the
--    same browser before or after the opt-in). security_invoker so it never
--    bypasses RLS; no grants to anon/authenticated.
create view public.sqdb_chats_by_subscriber
with (security_invoker = true) as
select
  c.id,
  c.created_at,
  coalesce(c.subscriber_ref, l.subscriber_ref) as subscriber_ref,
  case when c.subscriber_ref is not null then 'direct'
       when l.subscriber_ref is not null then 'via_visitor'
  end as match_type,
  c.visitor_id,
  c.session_id,
  c.turn_index,
  c.question,
  c.reply,
  c.status,
  c.env,
  c.device_type,
  c.utm_source,
  c.utm_medium,
  c.utm_campaign
from public.sqdb_chat_log c
left join lateral (
  select ol.subscriber_ref
  from public.sqdb_optin_link ol
  where ol.visitor_id = c.visitor_id
  order by ol.created_at desc
  limit 1
) l on c.visitor_id is not null;

revoke all on table public.sqdb_chats_by_subscriber from anon, authenticated, public;
