'use client';
import { useEffect, useState } from 'react';
import ShortMain from './ShortMain';

export default function ShortHero({ data }) {
  const { hero } = data;
  const [modalOpen, setModalOpen] = useState(false);

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

  // Load Typeform script when modal first opens
  useEffect(() => {
    if (modalOpen && !document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')) {
      const s = document.createElement('script');
      s.src = '//embed.typeform.com/next/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, [modalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

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

          <button className="short-hero__cta" onClick={() => setModalOpen(true)}>
            Apply to Join TSSC
          </button>
        </div>
      </section>

      {/* Pass openModal down to ShortMain so both CTAs share the same modal */}
      <ShortMain data={data} onApply={() => setModalOpen(true)} />

      {/* Typeform Modal */}
      {modalOpen && (
        <div className="tf-modal__backdrop" onClick={() => setModalOpen(false)}>
          <div className="tf-modal__box" onClick={(e) => e.stopPropagation()}>
            <button className="tf-modal__close" onClick={() => setModalOpen(false)} aria-label="Close">
              ✕
            </button>
            <div data-tf-live="01KS3F4MKYJNQVE001P2WDFX49" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      )}
    </>
  );
}
