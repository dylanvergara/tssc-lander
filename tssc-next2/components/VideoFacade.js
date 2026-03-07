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

  if (playing) {
    return (
      <div className="video-facade" style={{ cursor: 'default' }}>
        <iframe src={embedUrl} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={title || 'Video'} />
      </div>
    );
  }

  return (
    <div className="video-facade" onClick={() => setPlaying(true)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setPlaying(true)}>
      <img src={thumbSrc} alt={title || 'Play video'} className="video-facade__thumb" loading="lazy" />
      <div className="video-facade__overlay">
        <button className={`play-btn${small ? ' play-btn--sm' : ''}`} aria-label="Play video">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
