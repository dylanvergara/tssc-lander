'use client';
import { useEffect, useRef } from 'react';
import VideoFacade from './VideoFacade';

function WistiaHeroPlayer({ videoId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Wistia scripts if not already present
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://fast.wistia.com/player.js';
      s1.async = true;
      document.head.appendChild(s1);
    }
    const embedSrc = `https://fast.wistia.com/embed/${videoId}.js`;
    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const s2 = document.createElement('script');
      s2.src = embedSrc;
      s2.async = true;
      s2.type = 'module';
      document.head.appendChild(s2);
    }
  }, [videoId]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
      <wistia-player
        media-id={videoId}
        aspect="1.7777777777777777"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default function Hero({ data }) {
  const { hero, ctaUrl, ctaText } = data;
  return (
    <section className="hero section">
      <div className="col">
        <span className="hero__eyebrow">{hero.eyebrow}</span>
        <h1 className="hero__headline">Everything you need to know about TSSC is in this video:</h1>
        <div className="reveal">
          <div className="vsl-glow">
            {hero.platform === 'wistia'
              ? <WistiaHeroPlayer videoId={hero.vslVideoId} />
              : <VideoFacade videoId={hero.vslVideoId} platform={hero.platform} title="Watch this first" />
            }
          </div>
        </div>
        <div className="hero__cta-wrap reveal reveal--delay-1">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--blue">
            Apply to TSSC
          </a>
        </div>
      </div>
    </section>
  );
}
