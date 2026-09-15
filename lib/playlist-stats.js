// Public playlist_stats row that keeps SQDB marketing counts in sync
// with the live interview corpus. Falls back to 70 / 25+ so production
// never shows the old "20+" copy if env or fetch is missing.

export const FALLBACK_PLAYLIST_STATS = {
  people_count: 70,
  hours_band: '25+',
};

const PLAYLIST_STATS_ID = 'member_interviews';
const SELECT = 'people_count,interview_count,hours_band,hours_exact,video_count,updated_at';

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ''), anonKey };
}

function normalizeStats(row) {
  const people_count = Number(row?.people_count);
  const hours_band = typeof row?.hours_band === 'string' ? row.hours_band.trim() : '';
  if (!Number.isFinite(people_count) || people_count <= 0 || !hours_band) {
    return null;
  }
  return {
    people_count,
    hours_band,
    interview_count: row.interview_count ?? null,
    hours_exact: row.hours_exact ?? null,
    video_count: row.video_count ?? null,
    updated_at: row.updated_at ?? null,
  };
}

export async function fetchPlaylistStats() {
  const config = getSupabasePublicConfig();
  if (!config) return FALLBACK_PLAYLIST_STATS;

  try {
    const res = await fetch(
      `${config.url}/rest/v1/playlist_stats?id=eq.${PLAYLIST_STATS_ID}&select=${SELECT}`,
      {
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return FALLBACK_PLAYLIST_STATS;
    const rows = await res.json();
    return normalizeStats(Array.isArray(rows) ? rows[0] : null) || FALLBACK_PLAYLIST_STATS;
  } catch {
    return FALLBACK_PLAYLIST_STATS;
  }
}

export function formatSqdbHeaderSub(stats) {
  return `${stats.people_count} stories. ${stats.hours_band} hours of interviews. 1 chatbot ready to help.`;
}

export function formatGetSqdbMeta(stats) {
  return `${stats.people_count} member interviews, ${stats.hours_band} hours of stories, 1 chatbot`;
}
