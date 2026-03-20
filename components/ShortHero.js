'use client';
import { useEffect } from 'react';

export default function ShortHero({ data }) {
  const { hero, ctaUrl } = data;

  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://fast.wistia.com/player.js';
      s1.async = true;
      document.head.appendChild(s1);
    }
    const embedSrc = `https://fast.wistia.com/embed/${hero.vslVideoId}.js`;
    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const s2 = document.createElement('script');
      s2.src = embedSrc;
      s2.async = true;
      s2.type = 'module';
      document.head.appendChild(s2);
    }
  }, [hero.vslVideoId]);

  return (
    <section className="short-hero">
      {/* Logo only — no hamburger */}
      <div className="short-hero__nav">
        <img src="/images/logo-white-bg.png" alt="TSSC" className="short-hero__logo" />
      </div>

      <div className="short-hero__content">
        <span className="short-hero__eyebrow">Watch this first</span>
        <h1 className="short-hero__headline">Everything you need to know about TSSC is in this video.</h1>

        <div className="short-hero__vsl-wrap">
          <div className="vsl-glow">
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <wistia-player
                media-id={hero.vslVideoId}
                aspect="1.7777777777777777"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>

        <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="short-hero__cta">
          Apply to Join TSSC
        </a>
      </div>
    </section>
  );
}
