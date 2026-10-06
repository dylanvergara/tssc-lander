// Shared request guards for the public API routes (/api/chat, /api/optin-link):
// origin allowlist and client IP (used only for in-memory rate limiting, never stored).

const ALLOWED_HOSTS = new Set(['serialsalescommunity.co', 'www.serialsalescommunity.co']);
// Vercel production + preview URLs for this project, e.g.
// tssc-lander-t9bc.vercel.app, tssc-lander-t9bc-<hash>-dylans-projects-c06688cc.vercel.app,
// tssc-lander-t9bc-git-<branch>-dylans-projects-c06688cc.vercel.app
const VERCEL_HOST_RE = /^tssc-lander-t9bc(?:-[a-z0-9-]+)?\.vercel\.app$/;

function hostOf(value) {
  if (!value) return null;
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function isAllowedHost(host) {
  if (!host) return false;
  if (ALLOWED_HOSTS.has(host) || VERCEL_HOST_RE.test(host)) return true;
  if (process.env.NODE_ENV !== 'production' && (host === 'localhost' || host === '127.0.0.1')) return true;
  return false;
}

export function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (origin) return isAllowedHost(hostOf(origin));
  // Some browsers omit Origin on same-origin requests; fall back to Referer.
  return isAllowedHost(hostOf(request.headers.get('referer')));
}

export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
