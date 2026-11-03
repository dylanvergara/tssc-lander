import { adminAuthorized } from '../../../../lib/wins-admin';
import { clientIp, originAllowed } from '../../../../lib/request-guard';

export const dynamic = 'force-dynamic';

const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request) {
  if (!originAllowed(request)) {
    return Response.json({ error: 'Forbidden.' }, { status: 403 });
  }
  if (limited(clientIp(request))) {
    return Response.json({ error: 'Slow down.' }, { status: 429 });
  }
  if (!process.env.WINS_ADMIN_KEY) {
    return Response.json({ error: 'Drawing is not configured.' }, { status: 503 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'That key did not work.' }, { status: 401 });
  }
  if (!adminAuthorized(body?.key)) {
    return Response.json({ error: 'That key did not work.' }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
