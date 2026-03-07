'use client';
import { useState, useCallback, useEffect } from 'react';

export default function ProofWall({ data }) {
  const { proof } = data;
  const [lb, setLb] = useState(null);

  const open  = useCallback(i => { setLb(i); document.body.style.overflow = 'hidden'; }, []);
  const close = useCallback(() => { setLb(null); document.body.style.overflow = ''; }, []);
  const prev  = useCallback(() => setLb(i => (i - 1 + proof.screenshots.length) % proof.screenshots.length), [proof.screenshots.length]);
  const next  = useCallback(() => setLb(i => (i + 1) % proof.screenshots.length), [proof.screenshots.length]);

  useEffect(() => {
    const fn = e => {
      if (lb === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lb, close, prev, next]);

  return (
    <section className="proof-section">
      <div className="col--wide">
        <div className="col" style={{ padding: 0, maxWidth: 'var(--col)', margin: '0 auto 24px' }}>
          <span className="eyebrow eyebrow--light reveal">Social Proof</span>
          <h2 className="headline headline--white reveal">{proof.headline}</h2>
          <p className="subhead subhead--light reveal reveal--delay-1">{proof.subhead}</p>
        </div>
        <div className="proof-grid">
          {proof.screenshots.map((s, i) => (
            <div key={s.id} className="proof-item reveal" onClick={() => open(i)}>
              <img src={s.src} alt={s.alt} className="proof-item__img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {lb !== null && (
        <div className="lightbox is-open" role="dialog" aria-modal="true">
          <div className="lightbox__content">
            <button className="lightbox__close" onClick={close} aria-label="Close">✕</button>
            <button className="lightbox__prev" onClick={prev} aria-label="Previous">‹</button>
            <img src={proof.screenshots[lb].src} alt={proof.screenshots[lb].alt} className="lightbox__img" />
            <button className="lightbox__next" onClick={next} aria-label="Next">›</button>
          </div>
          <div className="lightbox__backdrop" onClick={close} />
        </div>
      )}
    </section>
  );
}
