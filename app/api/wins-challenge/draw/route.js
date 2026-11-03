import { getMemberRegistry, getWinsRaw } from '../../../../lib/wins-challenge';
import { adminAuthorized } from '../../../../lib/wins-admin';
import { applyOutcome } from '../../../../lib/wins-drawings';
import { updateDrawings } from '../../../../lib/wins-store';
import { clientIp, originAllowed } from '../../../../lib/request-guard';
import { resolveProfile } from '../../../../lib/wins-format';

export const dynamic = 'force-dynamic';

const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 40) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function fail(status, error) {
  return Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request) {
  if (!originAllowed(request)) return fail(403, 'Forbidden.');
  if (limited(clientIp(request))) return fail(429, 'Slow down.');
  if (!adminAuthorized(request.headers.get('x-wins-admin-key'))) {
    return fail(401, 'That key did not work.');
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }

  const monthKey = typeof body?.month === 'string' ? body.month : '';
  const action = body?.action;
  const memberId = body?.memberId == null ? '' : String(body.memberId);
  if (!/^\d{4}-\d{2}$/.test(monthKey) || (action !== 'absent' && action !== 'final') || !memberId) {
    return fail(400, 'Bad request.');
  }

  const raw = getWinsRaw();
  const registry = getMemberRegistry(raw);
  const month = (raw.months || []).find((item) => item.month === monthKey);
  if (!month) return fail(404, 'That month is not on the board.');
  const member = (month.tally || []).find((item) => String(item.memberId) === memberId);
  if (!member) return fail(400, 'That member is not on this month.');
  const profile = resolveProfile(registry, memberId, member);

  const at = new Date().toISOString();
  try {
    const drawings = await updateDrawings((current) => {
      const result = applyOutcome(current, {
        month,
        action,
        member: profile,
        at,
      });
      if (!result.ok) {
        const error = new Error(result.error);
        error.status = result.status;
        throw error;
      }
      return result.drawings;
    });
    const drawing = drawings.months[monthKey] || { absent: [], finalWinner: null };
    return Response.json({ ok: true, month: monthKey, drawing }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const status = error.status || 500;
    const message = status === 503
      ? 'Drawing storage is not configured.'
      : (error.status ? error.message : 'Could not save that.');
    return fail(status, message);
  }
}
