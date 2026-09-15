'use client';
import { useEffect, useState } from 'react';

const STUB_MAX_PX = 120;

export function youtubeThumbUrl(videoId, quality) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * YouTube's maxresdefault is often a 120×90 grey stub (HTTP 404 + JPEG body)
 * when the upload has no true maxres. Never paint that — start on hqdefault
 * (always a real frame) and only upgrade to maxres after a width check.
 */
export default function useYoutubeThumb(videoId) {
  const hq = youtubeThumbUrl(videoId, 'hqdefault');
  const maxres = youtubeThumbUrl(videoId, 'maxresdefault');
  const [thumb, setThumb] = useState(hq);

  useEffect(() => {
    setThumb(hq);
    if (!videoId) return undefined;

    let cancelled = false;
    const probe = new Image();
    const maybeUpgrade = () => {
      if (!cancelled && probe.naturalWidth > STUB_MAX_PX) {
        setThumb(maxres);
      }
    };
    probe.onload = maybeUpgrade;
    probe.onerror = () => {};
    probe.src = maxres;

    return () => {
      cancelled = true;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [videoId, hq, maxres]);

  return thumb;
}
