import { createHash, timingSafeEqual } from 'crypto';

export function adminAuthorized(provided) {
  const expected = process.env.WINS_ADMIN_KEY || '';
  if (!expected || typeof provided !== 'string' || !provided || provided.length > 200) return false;
  const left = createHash('sha256').update(provided).digest();
  const right = createHash('sha256').update(expected).digest();
  return timingSafeEqual(left, right);
}
