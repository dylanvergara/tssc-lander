// Success Query (/sqdb) chat endpoint.
//
// This is NOT a general Anthropic proxy: the system prompt, model and
// max_tokens are fixed on the server, the client may only send the
// conversation ({ messages: [{ role, content }] }), and requests are limited
// by origin, size and per-IP rate.
import { SYSTEM_PROMPT, SQDB_MODEL, SQDB_MAX_TOKENS } from '../../../lib/sqdb-system-prompt';

export const dynamic = 'force-dynamic';

const LIMITS = {
  maxBodyBytes: 128 * 1024,
  maxMessages: 40,
  maxCharsPerMessage: 8000,
  maxTotalChars: 60000,
};

// Per-IP rate limit (in-memory, per serverless instance: a lightweight speed bump).
const RATE = { windowMs: 60 * 1000, max: 12, dayMs: 24 * 60 * 60 * 1000, dayMax: 200 };
const hits = new Map();

const ALLOWED_HOSTS = new Set(['serialsalescommunity.co', 'www.serialsalescommunity.co']);
// Vercel production + preview URLs for this project, e.g.
// tssc-lander-t9bc.vercel.app, tssc-lander-t9bc-<hash>-dylans-projects-c06688cc.vercel.app,
// tssc-lander-t9bc-git-<branch>-dylans-projects-c06688cc.vercel.app
const VERCEL_HOST_RE = /^tssc-lander-t9bc(?:-[a-z0-9-]+)?\.vercel\.app$/;

function json(status, body, headers = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function hostOf(value) {
  if (!value) return null;
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isAllowedHost(host) {
  if (!host) return false;
  if (ALLOWED_HOSTS.has(host) || VERCEL_HOST_RE.test(host)) return true;
  if (process.env.NODE_ENV !== 'production' && (host === 'localhost' || host === '127.0.0.1')) return true;
  return false;
}

function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (origin) return isAllowedHost(hostOf(origin));
  // Some browsers omit Origin on same-origin requests; fall back to Referer.
  return isAllowedHost(hostOf(request.headers.get('referer')));
}

function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
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

// Returns an error string, or null when the body is a valid conversation.
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Body must be a JSON object.';
  const extra = Object.keys(body).filter((k) => k !== 'messages');
  if (extra.length) return `Unsupported field(s): ${extra.join(', ')}. Only "messages" is accepted.`;
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
  if (!originAllowed(request)) return json(403, { error: 'Forbidden origin.' });

  const retryAfter = rateLimited(clientIp(request));
  if (retryAfter) return json(429, { error: 'Too many requests. Please wait a moment and try again.' }, { 'Retry-After': String(retryAfter) });

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > LIMITS.maxBodyBytes) return json(400, { error: 'Request body too large.' });
  const raw = await request.text();
  if (raw.length > LIMITS.maxBodyBytes) return json(400, { error: 'Request body too large.' });

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid JSON.' });
  }
  const problem = validate(body);
  if (problem) return json(400, { error: problem });

  // Rebuild the conversation from scratch so nothing but role/content reaches Anthropic.
  const messages = body.messages.map(({ role, content }) => ({ role, content }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
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
      return json(502, { error: 'The chat service is unavailable right now. Please try again.' });
    }
    // Same shape the page already reads: data.content[0].text
    return json(200, { content: (data.content || []).filter((c) => c.type === 'text').map((c) => ({ type: 'text', text: c.text })) });
  } catch (e) {
    console.error('Chat upstream failure', e);
    return json(502, { error: 'The chat service is unavailable right now. Please try again.' });
  }
}

export function GET() {
  return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' });
}
