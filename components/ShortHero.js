'use client';
import { useEffect, useState, useRef } from 'react';
import ShortMain from './ShortMain';

export default function ShortHero({ data }) {
  const { hero } = data;
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef(null);

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

  // Load Typeform script once
  useEffect(() => {
    if (!document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')) {
      const s = document.createElement('script');
      s.src = '//embed.typeform.com/next/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const handleApply = () => {
    const opening = !formOpen;
    setFormOpen(opening);
    // Scroll to form when opening
    if (opening && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <>
      <section className="short-hero">
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

          <button className="short-hero__cta" onClick={handleApply}>
            {formOpen ? '✕ Close' : 'Apply to Join TSSC'}
          </button>

          {/* Inline form — renders below button, no scroll inside */}
          <div
            ref={formRef}
            className={`short-inline-form${formOpen ? ' is-open' : ''}`}
            aria-hidden={!formOpen}
          >
            <div className="short-inline-form__inner">
              <div data-tf-live="01KS3F4MKYJNQVE001P2WDFX49" />
            </div>
          </div>
        </div>
      </section>

      <ShortMain data={data} onApply={handleApply} formOpen={formOpen} />
    </>
  );
}
