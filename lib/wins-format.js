// Pure helpers for the Wins Challenge page. No data import, so the client
// bundle does not have to carry the JSON. The page and the API read
// data/wins-challenge.json through lib/wins-challenge.js.

export function displayName(raw) {
  if (typeof raw !== 'string') return 'Member';
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) return 'Member';
  const parts = cleaned.split(' ').filter(Boolean);
  const first = parts[0].replace(/\.+$/, '');
  if (!first) return 'Member';
  if (parts.length === 1) return first;
  const last = parts[parts.length - 1].replace(/\./g, '');
  if (!last) return first;
  return `${first} ${last[0].toUpperCase()}.`;
}

export function initials(name) {
  const shown = displayName(name);
  const parts = shown.replace(/\./g, '').split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const AVATAR_BG = ['#18445f', '#245773', '#0f2c3d', '#326888', '#16384c'];

export function fallbackColor(name) {
  const s = String(name || '');
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return AVATAR_BG[h % AVATAR_BG.length];
}

export function safeHttpsUrl(url) {
  if (typeof url !== 'string' || !url || url.length > 4000) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    return url;
  } catch {
    return null;
  }
}

export function safeAvatarRef(url) {
  if (typeof url !== 'string' || !url || url.includes('..') || url.includes('\\')) return null;
  if (/^\/images\/wins-members\/[A-Za-z0-9._-]+$/.test(url)) return url;
  return safeHttpsUrl(url);
}

export function safeCircleProfileUrl(url) {
  if (typeof url !== 'string' || !url || url.length > 400) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    if (parsed.hostname !== 'the-serial-sales-community.circle.so') return null;
    if (!parsed.pathname.startsWith('/u/')) return null;
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return null;
  }
}

export function resolveProfile(registry, memberId, hint) {
  const id = String(memberId ?? hint?.memberId ?? hint?.id ?? '');
  const saved = id && registry ? registry[id] : null;
  if (saved) {
    return {
      memberId: id,
      name: saved.displayName,
      avatarUrl: safeAvatarRef(saved.avatarUrl),
      circleProfileUrl: safeCircleProfileUrl(saved.circleProfileUrl),
    };
  }
  return {
    memberId: id,
    name: displayName(hint?.displayName || hint?.name),
    avatarUrl: safeAvatarRef(hint?.avatarUrl),
    circleProfileUrl: safeCircleProfileUrl(hint?.circleProfileUrl || hint?.profile_url),
  };
}

export function memberStory(months, memberId) {
  const id = String(memberId || '');
  const played = [];
  const won = [];
  const missed = [];
  for (const month of months || []) {
    const row = (month.tally || []).find((member) => member.memberId === id);
    if (row) {
      const entries = (row.breakdown || []).reduce((sum, item) => sum + (item.count || 0), 0);
      played.push({
        month: month.month,
        label: month.label,
        points: row.points,
        entries,
      });
    }
    if (month.winner && month.winner.memberId === id) {
      won.push({ month: month.month, label: month.label });
    }
    for (const person of month.absent || []) {
      if (person.memberId === id) missed.push({ month: month.month, label: month.label });
    }
  }
  return { played, won, missed };
}

export function chicagoMonth(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  if (!year || !month) return '';
  return `${year}-${month}`;
}

export function formatMonth(key, withYear = true) {
  if (typeof key !== 'string' || !/^\d{4}-\d{2}$/.test(key)) return '';
  const [year, month] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: withYear ? 'numeric' : undefined,
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatUpdated(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function tierList(tiers) {
  if (!tiers || typeof tiers !== 'object') return [];
  return Object.entries(tiers)
    .map(([topic, points]) => ({ topic, points: Number(points) || 0 }))
    .sort((a, b) => b.points - a.points || a.topic.localeCompare(b.topic));
}

export function breakdown(entries, tiers) {
  const order = new Map(tierList(tiers).map((tier, index) => [tier.topic, index]));
  const map = new Map();
  for (const entry of entries || []) {
    const topic = entry?.topic || 'Other';
    const current = map.get(topic) || { topic, count: 0, points: 0 };
    current.count += 1;
    current.points += Number(entry?.points) || 0;
    map.set(topic, current);
  }
  return [...map.values()].sort((a, b) => {
    const ai = order.has(a.topic) ? order.get(a.topic) : 99;
    const bi = order.has(b.topic) ? order.get(b.topic) : 99;
    if (ai !== bi) return ai - bi;
    return b.points - a.points;
  });
}

function cleanDrawingPerson(person, registry) {
  if (!person || typeof person !== 'object') return null;
  const memberId = String(person.memberId ?? '');
  if (!memberId) return null;
  const profile = resolveProfile(registry, memberId, person);
  if (!profile.name || profile.name === 'Member') return null;
  const at = typeof person.at === 'string' && !Number.isNaN(Date.parse(person.at)) ? person.at : null;
  return {
    memberId,
    name: profile.name,
    avatarUrl: profile.avatarUrl,
    at,
  };
}

export function prepareMonth(month, tiers, drawing, registry) {
  const tally = [...(month?.tally || [])]
    .map((member) => {
      const profile = resolveProfile(registry, member.memberId, member);
      return {
        memberId: profile.memberId,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        circleProfileUrl: profile.circleProfileUrl,
        points: Number(member.points) || 0,
        breakdown: breakdown(member.entries, tiers),
      };
    })
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  const fileWinner = month?.winner
    ? {
        ...resolveProfile(registry, month.winner.memberId, month.winner),
        sourceUrl: safeHttpsUrl(month.winner.sourceUrl),
      }
    : null;

  const absent = [];
  const seen = new Set();
  for (const person of drawing?.absent || []) {
    const clean = cleanDrawingPerson(person, registry);
    if (!clean || seen.has(clean.memberId)) continue;
    seen.add(clean.memberId);
    absent.push(clean);
  }

  const finalWinner = cleanDrawingPerson(drawing?.finalWinner, registry);
  let winner = fileWinner;
  let winnerSource = fileWinner ? 'file' : null;
  if (!winner && finalWinner) {
    winner = {
      name: finalWinner.name,
      avatarUrl: finalWinner.avatarUrl,
      sourceUrl: null,
    };
    winnerSource = 'drawing';
  }

  return {
    month: month.month,
    label: formatMonth(month.month, true),
    shortLabel: formatMonth(month.month, false),
    winner,
    winnerSource,
    absent,
    tally,
  };
}

export function activeTally(month) {
  const gone = new Set((month?.absent || []).map((person) => person.memberId));
  return (month?.tally || []).filter((member) => member.points > 0 && !gone.has(member.memberId));
}

export function canSpin(month) {
  return Boolean(month) && month.winner == null && activeTally(month).length > 0;
}

function clause(text) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export function drawingLine(month) {
  const hasDrawingWinner = month?.winnerSource === 'drawing' && month.winner;
  const absent = month?.absent || [];
  if (!hasDrawingWinner && absent.length === 0) return '';
  const parts = [];
  if (month.winner) parts.push(`Winner: ${month.winner.name}`);
  if (absent.length) {
    parts.push(`Picked but not present: ${absent.map((person) => person.name).join(', ')}`);
  }
  return parts.map(clause).join(' ');
}

export function resolveCurrentMonth(months, now = new Date()) {
  const key = chicagoMonth(now);
  if ((months || []).some((month) => month.month === key)) return key;
  const keys = (months || []).map((month) => month.month).filter(Boolean).sort();
  return keys[keys.length - 1] || key;
}

export function buildSlices(tally) {
  const members = (tally || []).filter((member) => member.points > 0);
  const total = members.reduce((sum, member) => sum + member.points, 0);
  if (total <= 0) return [];
  let angle = -Math.PI / 2;
  return members.map((member) => {
    const sweep = (member.points / total) * Math.PI * 2;
    const slice = { member, start: angle, end: angle + sweep, sweep };
    angle += sweep;
    return slice;
  });
}

export function pickWeighted(items, random = Math.random) {
  const total = items.reduce((sum, item) => sum + (Number(item.points) || 0), 0);
  if (total <= 0 || items.length === 0) return null;
  let ticket = random() * total;
  for (const item of items) {
    ticket -= Number(item.points) || 0;
    if (ticket < 0) return item;
  }
  return items[items.length - 1];
}

function mod(value, base) {
  return ((value % base) + base) % base;
}

// Clockwise CSS rotation that puts a random point inside `slice` under a
// pointer fixed at 12 o'clock. Always moves forward.
export function landingRotation({
  currentRotation = 0,
  slice,
  random = Math.random,
  minTurns = 6,
  maxExtraTurns = 2,
}) {
  const twoPi = Math.PI * 2;
  const sweep = slice.sweep;
  let alpha;
  if (sweep >= twoPi - 0.001) {
    alpha = -Math.PI / 2;
  } else {
    const margin = sweep * 0.1;
    const inner = Math.max(sweep - margin * 2, sweep * 0.2);
    const start = slice.start + (sweep - inner) / 2;
    alpha = start + random() * inner;
  }
  const desired = mod(-Math.PI / 2 - alpha, twoPi);
  const current = mod(currentRotation, twoPi);
  let delta = mod(desired - current, twoPi);
  if (delta < 0.02) delta += twoPi;
  const extraTurns = minTurns + Math.floor(random() * (maxExtraTurns + 1));
  delta += extraTurns * twoPi;
  return { next: currentRotation + delta, alpha };
}

export function formatShare(points, total) {
  if (!total) return '0%';
  const pct = (points / total) * 100;
  if (pct >= 10) return `${Math.round(pct)}%`;
  const rounded = Math.round(pct * 10) / 10;
  return `${rounded}%`;
}

export function pointWord(count) {
  return count === 1 ? 'point' : 'points';
}

export function memberWord(count) {
  return count === 1 ? 'member' : 'members';
}

export function withRanks(tally) {
  let rank = 0;
  let previous = null;
  return (tally || []).map((member, index) => {
    if (previous === null || member.points !== previous) rank = index + 1;
    previous = member.points;
    return { ...member, rank };
  });
}
