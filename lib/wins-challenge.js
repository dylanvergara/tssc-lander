import raw from '../data/wins-challenge.json';
import { emptyDrawings } from './wins-drawings';
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

export function getWinsPageData(now = new Date(), drawings = emptyDrawings()) {
  const tiers = tierList(raw.tiers);
  const byMonth = drawings?.months || {};
  const months = (raw.months || []).map((month) => prepareMonth(month, raw.tiers, byMonth[month.month]));
  return {
    generatedAt: raw.generatedAt || null,
    updatedLabel: formatUpdated(raw.generatedAt),
    spaceUrl: safeHttpsUrl(raw.meta?.spaceUrl),
    nowMonth: resolveCurrentMonth(raw.months, now),
    tiers,
    months,
  };
}
