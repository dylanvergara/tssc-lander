import raw from '../data/wins-challenge.json';
import registryFile from '../data/wins-members.json';
import { emptyDrawings } from './wins-drawings';
import { discoverMembers, mergeMemberRegistry, normalizeRegistry, sortedRegistry } from './wins-members';
import {
  prepareMonth,
  resolveCurrentMonth,
  safeHttpsUrl,
  tierList,
  formatUpdated,
} from './wins-format';

export function getWinsRaw() {
  return raw;
}

export function getMemberRegistry(challenge = raw) {
  return sortedRegistry(mergeMemberRegistry(normalizeRegistry(registryFile), discoverMembers(challenge)));
}

export function getWinsPageData(now = new Date(), drawings = emptyDrawings(), registry = getMemberRegistry()) {
  const tiers = tierList(raw.tiers);
  const byMonth = drawings?.months || {};
  const months = (raw.months || []).map((month) => prepareMonth(month, raw.tiers, byMonth[month.month], registry));
  return {
    generatedAt: raw.generatedAt || null,
    updatedLabel: formatUpdated(raw.generatedAt),
    spaceUrl: safeHttpsUrl(raw.meta?.spaceUrl),
    nowMonth: resolveCurrentMonth(raw.months, now),
    tiers,
    months,
  };
}
