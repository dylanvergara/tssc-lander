import { displayName, resolveProfile, safeAvatarRef } from './wins-format';

export function emptyDrawings() {
  return { version: 1, months: {} };
}

function cleanPerson(person) {
  if (!person || typeof person !== 'object') return null;
  const memberId = String(person.memberId ?? '');
  const name = displayName(person.name);
  if (!memberId || name === 'Member') return null;
  const at = typeof person.at === 'string' && !Number.isNaN(Date.parse(person.at)) ? person.at : null;
  return {
    memberId,
    name,
    avatarUrl: safeAvatarRef(person.avatarUrl),
    at,
  };
}

export function normalizeDrawings(input) {
  const months = {};
  const source = input && typeof input === 'object' ? input.months : null;
  if (!source || typeof source !== 'object') return emptyDrawings();
  for (const [key, value] of Object.entries(source)) {
    if (!/^\d{4}-\d{2}$/.test(key) || !value || typeof value !== 'object') continue;
    const absent = [];
    const seen = new Set();
    for (const person of value.absent || []) {
      const clean = cleanPerson(person);
      if (!clean || seen.has(clean.memberId)) continue;
      seen.add(clean.memberId);
      absent.push(clean);
    }
    const finalWinner = cleanPerson(value.finalWinner);
    if (finalWinner && seen.has(finalWinner.memberId)) continue;
    months[key] = { absent, finalWinner: finalWinner || null };
  }
  return { version: 1, months };
}

function cloneDrawings(drawings) {
  const months = {};
  for (const [key, value] of Object.entries(drawings.months || {})) {
    months[key] = {
      absent: (value.absent || []).map((person) => ({ ...person })),
      finalWinner: value.finalWinner ? { ...value.finalWinner } : null,
    };
  }
  return { version: 1, months };
}

// Records one official outcome. `member` is already taken from the tally file.
// Does not mutate `drawings`.
export function applyOutcome(drawings, { month, action, member, at }) {
  const state = cloneDrawings(normalizeDrawings(drawings));
  if (!month || month.winner) {
    return { ok: false, status: 409, error: 'This month already has a winner.' };
  }
  if (!member?.memberId) {
    return { ok: false, status: 400, error: 'That member is not on this month.' };
  }
  const record = state.months[month.month] || { absent: [], finalWinner: null };
  if (record.finalWinner) {
    return { ok: false, status: 409, error: 'This month is already locked.' };
  }
  const person = {
    memberId: String(member.memberId),
    name: displayName(member.name),
    avatarUrl: safeAvatarRef(member.avatarUrl),
    at,
  };
  if (person.name === 'Member') {
    return { ok: false, status: 400, error: 'That member is not on this month.' };
  }

  if (action === 'absent') {
    if (!record.absent.some((item) => item.memberId === person.memberId)) {
      record.absent.push(person);
    }
    state.months[month.month] = record;
    return { ok: true, drawings: state, drawing: record };
  }

  if (action === 'final') {
    if (record.absent.some((item) => item.memberId === person.memberId)) {
      return { ok: false, status: 409, error: 'That person was already marked not present.' };
    }
    record.finalWinner = person;
    state.months[month.month] = record;
    return { ok: true, drawings: state, drawing: record };
  }

  return { ok: false, status: 400, error: 'Unknown action.' };
}

function withProfile(person, registry) {
  if (!person) return person;
  const profile = resolveProfile(registry, person.memberId, person);
  return {
    ...person,
    memberId: profile.memberId || person.memberId,
    name: profile.name,
    avatarUrl: profile.avatarUrl,
  };
}

export function mergeWinsPayload(raw, drawings, registry) {
  const normalized = normalizeDrawings(drawings);
  return {
    ...raw,
    months: (raw.months || []).map((month) => {
      const draw = normalized.months[month.month] || { absent: [], finalWinner: null };
      const absent = draw.absent.map((person) => withProfile(person, registry));
      const finalWinner = draw.finalWinner ? withProfile(draw.finalWinner, registry) : null;
      let winner = month.winner
        ? {
            ...resolveProfile(registry, month.winner.memberId, month.winner),
            sourceUrl: month.winner.sourceUrl || null,
          }
        : null;
      if (!winner && finalWinner) {
        winner = {
          memberId: finalWinner.memberId,
          name: finalWinner.name,
          avatarUrl: finalWinner.avatarUrl,
          sourceUrl: null,
        };
      }
      return {
        ...month,
        tally: (month.tally || []).map((row) => {
          const profile = resolveProfile(registry, row.memberId, row);
          return { ...row, name: profile.name, avatarUrl: profile.avatarUrl };
        }),
        winner,
        drawing: { absent, finalWinner },
      };
    }),
  };
}
