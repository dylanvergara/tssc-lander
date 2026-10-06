// Success Query (/sqdb) chat endpoint.
//
// This is NOT a general Anthropic proxy: the system prompt, model and
// max_tokens are fixed on the server, the client may only send the
// conversation ({ messages: [{ role, content }] }), and requests are limited
// by origin, size and per-IP rate.
import { SYSTEM_PROMPT, SQDB_MODEL, SQDB_MAX_TOKENS } from '../../../lib/sqdb-system-prompt';
import { logChatTurn } from '../../../lib/sqdb-chat-log';
import { originAllowed, clientIp } from '../../../lib/request-guard';
import { SQDB_CHAT_LIMITS, trimConversation } from '../../../lib/sqdb-chat-limits';

export const dynamic = 'force-dynamic';
// Long pasted inputs (e.g. a full call transcript) take longer to answer.
export const maxDuration = 60;

// Request size limits shared with the /sqdb page (lib/sqdb-chat-limits.js).
const LIMITS = SQDB_CHAT_LIMITS;
// Give up on Anthropic a little before the function itself would time out.
const UPSTREAM_TIMEOUT_MS = 55 * 1000;

// Anonymous client-generated conversation id (crypto.randomUUID() on the page).
const SESSION_ID_RE = /^[A-Za-z0-9-]{16,64}$/;
// Random first-party browser id (localStorage 'tssc_vid'): a lowercase UUID.
const VISITOR_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
// beehiiv subscription id from an email link (?sid=), canonical 'sub_<uuid>'.
const SUBSCRIBER_REF_RE = /^sub_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const BODY_FIELDS = new Set(['messages', 'session_id', 'visitor_id', 'subscriber_ref']);

// Per-IP rate limit (in-memory, per serverless instance: a lightweight speed bump).
const RATE = { windowMs: 60 * 1000, max: 12, dayMs: 24 * 60 * 60 * 1000, dayMax: 200 };
const hits = new Map();

function json(status, body, headers = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function rateLimited(ip) {
  const now = Date.now();
  let entry = hits.get(ip);
  if (!entry || now - entry.dayStart > RATE.dayMs) entry = { dayStart: now, day: 0, times: [] };
  entry.times = entry.times.filter((t) => now - t < RATE.windowMs);
  if (entry.times.length >= RATE.max || entry.day >= RATE.dayMax) {
    hits.set(ip, entry);
    const retry = entry.times.length ? Math.ceil((RATE.windowMs - (now - entry.times[0])) / 1000) : 60;
    return Math.max(retry, 1);
  }
  entry.times.push(now);
  entry.day += 1;
  hits.set(ip, entry);
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now - value.dayStart > RATE.dayMs || !value.times.some((t) => now - t < RATE.windowMs)) hits.delete(key);
    }
  }
  return 0;
}

// Blocked/failed attempts are logged too, but at most a few per IP per minute
// so a misbehaving client cannot flood the log. The IP itself is never stored.
const failLogHits = new Map();
function shouldLogFailure(ip) {
  const now = Date.now();
  const times = (failLogHits.get(ip) || []).filter((t) => now - t < 60 * 1000);
  if (times.length >= 3) return false;
  times.push(now);
  failLogHits.set(ip, times);
  if (failLogHits.size > 5000) failLogHits.clear();
  return true;
}

// Returns an error string, or null when the body is a valid conversation.
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Body must be a JSON object.';
  const extra = Object.keys(body).filter((k) => !BODY_FIELDS.has(k));
  if (extra.length) return `Unsupported field(s): ${extra.join(', ')}. Only "messages", "session_id", "visitor_id" and "subscriber_ref" are accepted.`;
  if (body.session_id !== undefined && (typeof body.session_id !== 'string' || !SESSION_ID_RE.test(body.session_id))) {
    return '"session_id" must be 16-64 letters, digits or dashes.';
  }
  if (body.visitor_id !== undefined && body.visitor_id !== null && (typeof body.visitor_id !== 'string' || !VISITOR_ID_RE.test(body.visitor_id))) {
    return '"visitor_id" must be a lowercase UUID.';
  }
  if (body.subscriber_ref !== undefined && body.subscriber_ref !== null && (typeof body.subscriber_ref !== 'string' || !SUBSCRIBER_REF_RE.test(body.subscriber_ref))) {
    return '"subscriber_ref" must look like sub_<lowercase uuid>.';
  }
  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) return '"messages" must be a non-empty array.';
  if (messages.length > LIMITS.maxMessages) return `Too many messages (max ${LIMITS.maxMessages}).`;
  let total = 0;
  for (const [i, m] of messages.entries()) {
    if (!m || typeof m !== 'object' || Array.isArray(m)) return `messages[${i}] must be an object.`;
    const keys = Object.keys(m).filter((k) => k !== 'role' && k !== 'content');
    if (keys.length) return `messages[${i}] has unsupported field(s): ${keys.join(', ')}.`;
    if (m.role !== 'user' && m.role !== 'assistant') return `messages[${i}].role must be "user" or "assistant".`;
    if (typeof m.content !== 'string') return `messages[${i}].content must be a string.`;
    if (m.content.length > LIMITS.maxCharsPerMessage) return `messages[${i}] is too long (max ${LIMITS.maxCharsPerMessage} characters).`;
    total += m.content.length;
  }
  if (total > LIMITS.maxTotalChars) return `Conversation is too long (max ${LIMITS.maxTotalChars} characters).`;
  const last = messages[messages.length - 1];
  if (last.role !== 'user' || !last.content.trim()) return 'The last message must be a non-empty user message.';
  return null;
}

export async function POST(request) {
  const started = Date.now();
  const ip = clientIp(request);
  const logFailure = (status, httpStatus, extra = {}) => {
    if (shouldLogFailure(ip)) logChatTurn(request, { status, httpStatus, latencyMs: Date.now() - started, ...extra });
  };

  if (!originAllowed(request)) {
    logFailure('blocked_origin', 403);
    return json(403, { error: 'Forbidden origin.' });
  }

  const retryAfter = rateLimited(ip);
  if (retryAfter) {
    logFailure('rate_limited', 429);
    return json(429, { error: 'Too many requests. Please wait a moment and try again.' }, { 'Retry-After': String(retryAfter) });
  }

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > LIMITS.maxBodyBytes) {
    logFailure('bad_request', 400);
    return json(400, { error: 'Request body too large.' });
  }
  const raw = await request.text();
  if (raw.length > LIMITS.maxBodyBytes) {
    logFailure('bad_request', 400);
    return json(400, { error: 'Request body too large.' });
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    logFailure('bad_request', 400);
    return json(400, { error: 'Invalid JSON.' });
  }
  const problem = validate(body);
  if (problem) {
    logFailure('bad_request', 400);
    return json(400, { error: problem });
  }

  // Rebuild the conversation from scratch so nothing but role/content reaches Anthropic.
  const conversation = body.messages.map(({ role, content }) => ({ role, content }));
  const turn = {
    sessionId: body.session_id,
    visitorId: body.visitor_id || null,
    subscriberRef: body.subscriber_ref || null,
    turnIndex: conversation.filter((m) => m.role === 'user').length - 1,
    question: conversation[conversation.length - 1].content,
    model: SQDB_MODEL,
  };
  // Sliding window: only the most recent turns that fit the context budget are
  // sent, so one huge paste can't permanently break (or bloat) the conversation.
  const messages = trimConversation(conversation, { maxChars: LIMITS.maxContextChars, maxMessages: LIMITS.maxMessages });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: SQDB_MODEL,
        max_tokens: SQDB_MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error', response.status, data?.error?.type, data?.error?.message);
      logFailure('upstream_error', 502, turn);
      return json(502, { error: 'The chat service is unavailable right now. Please try again.' });
    }
    // Same shape the page already reads: data.content[0].text
    const content = (data.content || []).filter((c) => c.type === 'text').map((c) => ({ type: 'text', text: c.text }));
    logChatTurn(request, { ...turn, status: 'ok', httpStatus: 200, latencyMs: Date.now() - started, reply: content.map((c) => c.text).join('\n\n') });
    return json(200, { content });
  } catch (e) {
    if (e?.name === 'AbortError') {
      console.error('Chat upstream timeout', UPSTREAM_TIMEOUT_MS);
      logFailure('upstream_error', 504, turn);
      return json(504, { error: 'The chat took too long to answer. Please try again.' });
    }
    console.error('Chat upstream failure', e);
    logFailure('error', 502, turn);
    return json(502, { error: 'The chat service is unavailable right now. Please try again.' });
  } finally {
    clearTimeout(timer);
  }
}

export function GET() {
  return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' });
}
