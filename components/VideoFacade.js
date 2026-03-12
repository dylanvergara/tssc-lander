'use client';
import { useState } from 'react';

export default function VideoFacade({ videoId, platform = 'youtube', title, small = false }) {
  const [playing, setPlaying] = useState(false);

  const thumbSrc = platform === 'youtube'
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : platform === 'wistia'
    ? `https://fast.wistia.com/embed/medias/${videoId}/swatch`
    : '/images/thumb-placeholder.jpg';

  // Wistia uses a web component — render it directly when playing
  if (playing && platform === 'wistia') {
    return (
      <div className="video-facade" style={{ cursor: 'default' }}>
        <script src="https://fast.wistia.com/player.js" async />
        <script src={`https://fast.wistia.com/embed/${videoId}.js`} async type="module" />
        <wistia-player
          media-id={videoId}
          aspect="1.7777777777777777"
          autoplay="true"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        />
      </div>
    );
  }

  const embedUrl =
    platform === 'youtube' ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1` :
    platform === 'vimeo'   ? `https://player.vimeo.com/video/${videoId}?autoplay=1` :
                             `https://www.youtube.com/embed/${videoId}?autoplay=1`;

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
