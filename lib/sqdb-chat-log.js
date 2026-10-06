// Server-only: log each /sqdb chat turn to Supabase (public.sqdb_chat_log).
//
// Writes go through the SECURITY DEFINER function public.log_sqdb_chat(),
// called with the public anon key plus the shared secret SQDB_LOG_SECRET
// (Vercel env, server-only). The function checks the secret's sha256, caps
// every field and is the only way to write; anon/authenticated cannot read
// the table.
//
// Logging must never break or slow the chat: it runs after the response via
// waitUntil, has a short timeout, and swallows every error.
//
// Nothing identifying is stored: no IP, email, name or user agent. Only a
// coarse device type, the page path and UTM params from the Referer, and the
// anonymous client-generated session id.
import { waitUntil } from '@vercel/functions';
import { getSupabasePublicConfig } from './playlist-stats';
import { canonicalizeInterviewLinks } from './interview-links';

const LOG_TIMEOUT_MS = 4000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

// Coarse device class from the user agent. The user agent itself is never stored.
export function deviceTypeOf(userAgent) {
  const ua = String(userAgent || '');
  if (!ua) return 'unknown';
  if (/bot|crawler|spider|crawling|curl|wget|python|headless/i.test(ua)) return 'bot';
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Page path and UTM params from the Referer (the /sqdb page URL). Only the path
// and utm_* values are kept; any other query params are dropped.
export function pageInfoOf(referer) {
  const out = { page_path: null };
  if (!referer) return out;
  try {
    const u = new URL(referer);
    out.page_path = u.pathname.slice(0, 300);
    for (const key of UTM_KEYS) {
      const v = u.searchParams.get(key);
      if (v) out[key] = v.slice(0, 200);
    }
  } catch {
    // ignore malformed referer
  }
  return out;
}

async function insertLog(entry) {
  const secret = process.env.SQDB_LOG_SECRET;
  const config = getSupabasePublicConfig();
  if (!secret || !config) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOG_TIMEOUT_MS);
  try {
    const res = await fetch(`${config.url}/rest/v1/rpc/log_sqdb_chat`, {
      method: 'POST',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ p_secret: secret, ...entry }),
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) console.error('sqdb chat log failed', res.status);
  } catch (e) {
    console.error('sqdb chat log error', e?.name || 'error');
  } finally {
    clearTimeout(timer);
  }
}

// Fire-and-forget. Never throws.
export function logChatTurn(request, fields) {
  try {
    const page = pageInfoOf(request.headers.get('referer'));
    const entry = {
      p_session_id: fields.sessionId || null,
      p_turn_index: Number.isInteger(fields.turnIndex) ? fields.turnIndex : null,
      p_question: fields.question ?? null,
      p_reply: fields.reply ? canonicalizeInterviewLinks(fields.reply) : null,
      p_status: fields.status,
      p_http_status: fields.httpStatus ?? null,
      p_latency_ms: Number.isFinite(fields.latencyMs) ? Math.round(fields.latencyMs) : null,
      p_model: fields.model ?? null,
      p_env: process.env.VERCEL_ENV || (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
      p_page_path: page.page_path,
      p_device_type: deviceTypeOf(request.headers.get('user-agent')),
      p_utm_source: page.utm_source ?? null,
      p_utm_medium: page.utm_medium ?? null,
      p_utm_campaign: page.utm_campaign ?? null,
      p_utm_content: page.utm_content ?? null,
      p_utm_term: page.utm_term ?? null,
    };
    const p = insertLog(entry).catch(() => {});
    waitUntil(p);
  } catch {
    // logging must never affect the chat
  }
}
