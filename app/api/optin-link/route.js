// Records a link between the random first-party browser id (visitor_id) and a
// beehiiv subscription id (subscriber_ref), so /sqdb chats can be tied back to
// email opt-ins. Called by the inline <head> script (lib/early-id-script.js)
// from /get-sqdb/confirmation and from /sqdb?sid=... email links.
//
// Strict: origin allowlist, per-IP rate limit, tiny body, exact fields and
// formats. No email, name or IP is ever stored. Writes go through the
// secret-gated SECURITY DEFINER function public.log_sqdb_optin_link().
import { originAllowed, clientIp } from '../../../lib/request-guard';
import { callLogRpc } from '../../../lib/sqdb-chat-log';

export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 1024;
const VISITOR_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SUBSCRIBER_REF_RE = /^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SOURCES = new Set(['confirmation', 'email_link']);
// Which URL param carried the id (beehiiv's redirect param name is not documented).
const ID_PARAMS = new Set(['sid', 'subscription_id', 'subscriber_id', 'sub_id', 'id', 'uuid', 'email']);
const FIELDS = new Set(['visitor_id', 'subscriber_ref', 'source', 'id_param']);

// Per-IP rate limit (in-memory, per serverless instance).
const RATE = { windowMs: 60 * 1000, max: 10, dayMs: 24 * 60 * 60 * 1000, dayMax: 60 };
const hits = new Map();

function reply(status, body) {
  if (status === 204) return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function rateLimited(ip) {
  const now = Date.now();
  let entry = hits.get(ip);
  if (!entry || now - entry.dayStart > RATE.dayMs) entry = { dayStart: now, day: 0, times: [] };
  entry.times = entry.times.filter((t) => now - t < RATE.windowMs);
  if (entry.times.length >= RATE.max || entry.day >= RATE.dayMax) {
    hits.set(ip, entry);
    return true;
  }
  entry.times.push(now);
  entry.day += 1;
  hits.set(ip, entry);
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now - value.dayStart > RATE.dayMs) hits.delete(key);
    }
  }
  return false;
}

function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Body must be a JSON object.';
  const extra = Object.keys(body).filter((k) => !FIELDS.has(k));
  if (extra.length) return `Unsupported field(s): ${extra.join(', ')}.`;
  if (typeof body.visitor_id !== 'string' || !VISITOR_ID_RE.test(body.visitor_id)) return '"visitor_id" must be a lowercase UUID.';
  if (typeof body.subscriber_ref !== 'string' || !SUBSCRIBER_REF_RE.test(body.subscriber_ref)) return '"subscriber_ref" must look like sub_<lowercase uuid>.';
  if (!SOURCES.has(body.source)) return '"source" must be "confirmation" or "email_link".';
  if (body.id_param !== undefined && body.id_param !== null && !ID_PARAMS.has(body.id_param)) return '"id_param" is not recognized.';
  return null;
}

export async function POST(request) {
  if (!originAllowed(request)) return reply(403, { error: 'Forbidden origin.' });
  if (rateLimited(clientIp(request))) return reply(429, { error: 'Too many requests.' });

  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return reply(400, { error: 'Request body too large.' });
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply(400, { error: 'Request body too large.' });

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { error: 'Invalid JSON.' });
  }
  const problem = validate(body);
  if (problem) return reply(400, { error: problem });

  const ok = await callLogRpc('log_sqdb_optin_link', {
    p_visitor_id: body.visitor_id,
    p_subscriber_ref: body.subscriber_ref,
    p_source: body.source,
    p_id_param: body.id_param || null,
    p_env: process.env.VERCEL_ENV || (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
  });
  return ok ? reply(204) : reply(502, { error: 'Could not record link.' });
}

export function GET() {
  return reply(405, { error: 'Method not allowed.' });
}
