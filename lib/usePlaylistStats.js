'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_PLAYLIST_STATS, fetchPlaylistStats } from './playlist-stats';

export default function usePlaylistStats() {
  const [stats, setStats] = useState(FALLBACK_PLAYLIST_STATS);

  useEffect(() => {
    let cancelled = false;
    fetchPlaylistStats().then((next) => {
      if (!cancelled) setStats(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
