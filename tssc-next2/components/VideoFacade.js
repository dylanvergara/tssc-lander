'use client';
import { useState } from 'react';

export default function VideoFacade({ videoId, platform = 'youtube', title, small = false }) {
  const [playing, setPlaying] = useState(false);

  const embedUrl =
    platform === 'youtube' ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` :
    platform === 'vimeo'   ? `https://player.vimeo.com/video/${videoId}?autoplay=1` :
                             `https://www.loom.com/embed/${videoId}?autoplay=1`;

  const thumbSrc = platform === 'youtube'
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '/images/thumb-placeholder.jpg';

  return (
    <div className="video-facade" onClick={() => setPlaying(true)}>
      {playing ? (
        <iframe src={embedUrl} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={title || 'Video'} />
      ) : (
        <>
          <img src={thumbSrc} alt={title || 'Play video'} className="video-facade__thumb" loading="lazy" />
          <div className="video-facade__overlay">
            <button className={`play-btn${small ? ' play-btn--sm' : ''}`} aria-label="Play video">
              <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="29" stroke="currentColor" strokeWidth="2" />
                <path d="M24 20L42 30L24 40V20Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
