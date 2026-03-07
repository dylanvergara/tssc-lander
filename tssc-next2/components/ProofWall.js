'use client';
import { useState, useCallback, useEffect } from 'react';

export default function ProofWall({ data }) {
  const { proof } = data;
  const [lightbox, setLightbox] = useState(null);

  const open  = useCallback(i => { setLightbox(i); document.body.style.overflow = 'hidden'; }, []);
  const close = useCallback(() => { setLightbox(null); document.body.style.overflow = ''; }, []);
  const prev  = useCallback(() => setLightbox(i => (i - 1 + proof.screenshots.length) % proof.screenshots.length), [proof.screenshots.length]);
  const next  = useCallback(() => setLightbox(i => (i + 1) % proof.screenshots.length), [proof.screenshots.length]);

  useEffect(() => {
    const fn = e => {
      if (lightbox === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox, close, prev, next]);

  return (
    <section className="section">
      <div className="page-col page-col--wide">
        <h2 className="proof-section__headline reveal">{proof.sectionHeadline}</h2>
        <div className="proof-grid">
          {proof.screenshots.map((shot, i) => (
            <div key={shot.id} className="proof-item reveal" onClick={() => open(i)}>
              <img src={shot.src} alt={shot.alt} className="proof-item__img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox is-open" role="dialog" aria-modal="true">
          <div className="lightbox__content">
            <img src={proof.screenshots[lightbox].src} alt={proof.screenshots[lightbox].alt} className="lightbox__img" />
            <button className="lightbox__close" onClick={close} aria-label="Close">✕</button>
            <button className="lightbox__prev" onClick={prev} aria-label="Previous">‹</button>
            <button className="lightbox__next" onClick={next} aria-label="Next">›</button>
          </div>
          <div className="lightbox__backdrop" onClick={close} />
        </div>
      )}
    </section>
  );
}
