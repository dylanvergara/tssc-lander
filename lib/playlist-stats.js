// Public playlist_stats row that keeps SQDB marketing counts in sync
// with the live interview corpus. Falls back to 75 interviews / 26+ hours
// when the fetch fails, so production never shows the old "20+" copy.
//
// NEXT_PUBLIC_SUPABASE_* (or SUPABASE_URL / SUPABASE_ANON_KEY) override the
// committed public project. The publishable key is browser-safe: RLS only
// lets the anon role SELECT playlist_stats.

export const FALLBACK_INTERVIEW_COUNT = 75;
export const FALLBACK_HOURS_LABEL = '26+';
export const FALLBACK_TENK_COUNT = 45;

export const FALLBACK_PLAYLIST_STATS = {
  people_count: 72,
  interview_count: FALLBACK_INTERVIEW_COUNT,
  hours_exact: 26,
  hours_band: FALLBACK_HOURS_LABEL,
};

const PUBLIC_SUPABASE_URL = 'https://iwvgztmpbwnlobhfizlc.supabase.co';
const PUBLIC_SUPABASE_ANON_KEY = 'sb_publishable_lKxPgF0wxUlmzQvji71WGA_QcQdoREj';

const PLAYLIST_STATS_ID = 'member_interviews';
const BASE_SELECT = 'people_count,interview_count,hours_band,hours_exact,video_count,updated_at';
const TENK_PARAGRAPH = `over ${FALLBACK_TENK_COUNT}x $10k/mo+ interviews`;

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ''), anonKey };
}

export function interviewCountOf(stats) {
  const n = Number(stats?.interview_count);
  if (Number.isFinite(n) && n > 0) return n;
  return FALLBACK_INTERVIEW_COUNT;
}

export function formatHoursPlus(stats) {
  const exact = Number(stats?.hours_exact);
  if (Number.isFinite(exact) && exact > 0) return `${Math.floor(exact)}+`;
  return FALLBACK_HOURS_LABEL;
}

export function tenkCountOf(stats) {
  const n = Number(stats?.tenk_people_count);
  if (Number.isFinite(n) && n > 0) return n;
  return FALLBACK_TENK_COUNT;
}

function normalizeStats(row) {
  const people_count = Number(row?.people_count);
  if (!Number.isFinite(people_count) || people_count <= 0) return null;
  const interview_count = Number(row?.interview_count);
  const hours_exact = Number(row?.hours_exact);
  const tenk = Number(row?.tenk_people_count);
  return {
    people_count,
    interview_count: Number.isFinite(interview_count) && interview_count > 0 ? interview_count : FALLBACK_INTERVIEW_COUNT,
    hours_exact: Number.isFinite(hours_exact) && hours_exact > 0 ? hours_exact : null,
    hours_band: typeof row?.hours_band === 'string' ? row.hours_band.trim() : '',
    tenk_people_count: Number.isFinite(tenk) && tenk > 0 ? tenk : null,
    video_count: row?.video_count ?? null,
    updated_at: row?.updated_at ?? null,
  };
}

async function readPlaylistRow(config, select, revalidate) {
  const init = {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      Accept: 'application/json',
    },
  };
  if (typeof revalidate === 'number') init.next = { revalidate };
  else init.cache = 'no-store';

  const res = await fetch(
    `${config.url}/rest/v1/playlist_stats?id=eq.${PLAYLIST_STATS_ID}&select=${select}`,
    init
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] || null : null;
}

export async function fetchPlaylistStats({ revalidate } = {}) {
  const config = getSupabasePublicConfig();
  if (!config) return FALLBACK_PLAYLIST_STATS;

  try {
    // tenk_people_count is being added separately. Selecting a missing column
    // makes PostgREST 400 the whole request, so retry without it.
    let row = await readPlaylistRow(config, `${BASE_SELECT},tenk_people_count`, revalidate);
    if (!row) row = await readPlaylistRow(config, BASE_SELECT, revalidate);
    return normalizeStats(row) || FALLBACK_PLAYLIST_STATS;
  } catch {
    return FALLBACK_PLAYLIST_STATS;
  }
}

export function withTenkInterviewCopy(data, count) {
  if (!data?.mission?.paragraphs) return data;
  const to = `over ${count}x $10k/mo+ interviews`;
  return {
    ...data,
    mission: {
      ...data.mission,
      paragraphs: data.mission.paragraphs.map((p) =>
        typeof p === 'string' && p.includes(TENK_PARAGRAPH) ? p.replace(TENK_PARAGRAPH, to) : p
      ),
    },
  };
}

export function formatSqdbHeaderSub(stats) {
  return `${interviewCountOf(stats)} interviews. ${formatHoursPlus(stats)} hours of interviews. 1 chatbot ready to help.`;
}

export function formatGetSqdbMeta(stats) {
  return `${interviewCountOf(stats)} interviews, ${formatHoursPlus(stats)} hours of stories, 1 chatbot`;
}
