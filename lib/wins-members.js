import { displayName, safeAvatarRef, safeCircleProfileUrl } from './wins-format';

function profileFrom(input) {
  if (!input || typeof input !== 'object') return null;
  const id = String(input.id ?? input.memberId ?? '');
  if (!id) return null;
  const name = displayName(input.displayName || input.name);
  if (name === 'Member') return null;
  return {
    id,
    displayName: name,
    avatarUrl: safeAvatarRef(input.avatarUrl),
    circleProfileUrl: safeCircleProfileUrl(input.circleProfileUrl || input.profile_url),
  };
}

export function normalizeRegistry(input) {
  const registry = {};
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  for (const [key, value] of Object.entries(source)) {
    const profile = profileFrom({ ...value, id: value?.id || key });
    if (!profile) continue;
    registry[profile.id] = profile;
  }
  return registry;
}

// Adds ids that are not saved yet. An existing profile is left as-is.
export function mergeMemberRegistry(registry, discovered) {
  const next = { ...normalizeRegistry(registry) };
  for (const person of discovered || []) {
    const profile = profileFrom(person);
    if (!profile) continue;
    const saved = next[profile.id];
    if (!saved) {
      next[profile.id] = profile;
      continue;
    }
    if (!saved.circleProfileUrl && profile.circleProfileUrl) {
      next[profile.id] = { ...saved, circleProfileUrl: profile.circleProfileUrl };
    }
  }
  return next;
}

export function discoverMembers(challenge) {
  const found = [];
  for (const month of challenge?.months || []) {
    for (const row of month.tally || []) {
      found.push(row);
    }
    if (month.winner) found.push(month.winner);
  }
  return found;
}

export function sortedRegistry(registry) {
  return Object.fromEntries(
    Object.entries(registry).sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true })),
  );
}
