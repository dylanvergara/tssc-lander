'use client';
import { useState } from 'react';
import Image from 'next/image';

function VideoFacade({ videoId, platform, thumbnail, title }) {
  const [playing, setPlaying] = useState(false);

  const embedUrl =
    platform === 'youtube'
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : platform === 'vimeo'
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : `https://www.loom.com/embed/${videoId}?autoplay=1`;

  const thumbSrc =
    thumbnail ||
    (platform === 'youtube'
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : '/images/vsl-thumbnail.jpg');

  return (
    <div className="video-facade" onClick={() => setPlaying(true)}>
      {playing ? (
        <iframe
          src={embedUrl}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title || 'Video'}
        />
      ) : (
        <>
          <img src={thumbSrc} alt={title || 'Play video'} className="video-facade__thumb" loading="lazy" />
          <div className="video-facade__overlay">
            <button className="play-btn" aria-label="Play video">
              <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="29" stroke="currentColor" strokeWidth="2" />
                <path d="M24 20L42 30L24 40V20Z" fill="currentColor" />
              </svg>
            </button>
            {title && <span className="video-facade__label">{title}</span>}
          </div>
        </>
      )}
    </div>
  );
}

export { VideoFacade };

export default function Hero({ data }) {
  const { hero, ctaUrl, ctaText } = data;

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" />
      <div className="container">
        <div className="hero__content">
          <span className="section-label reveal">{hero.eyebrow}</span>
          <h1 className="hero__headline h-display reveal reveal--delay-1">
            {hero.headline[0]}<br />
            {hero.headline[1]}<br />
            <em>{hero.headline[2]}</em>
          </h1>
          <p className="hero__sub reveal reveal--delay-2">{hero.subheadline}</p>
          <div className="hero__cta-wrap reveal reveal--delay-3">
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              {ctaText}
            </a>
            <span className="hero__fine">Application takes 5 minutes · We respond within 48 hrs</span>
          </div>
        </div>

        <div className="vsl-wrap reveal reveal--delay-2">
          <VideoFacade
            videoId={hero.vslVideoId}
            platform="youtube"
            thumbnail={hero.vslThumbnail}
            title="Watch Our Story"
          />
        </div>
      </div>
    </section>
  );
}
