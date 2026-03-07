'use client';
import { useState, useCallback, useEffect } from 'react';

export default function ProofWall({ data }) {
  const { screenshots } = data;
  const [lightbox, setLightbox] = useState(null); // index or null

  const open  = useCallback((i) => { setLightbox(i); document.body.style.overflow = 'hidden'; }, []);
  const close = useCallback(() => { setLightbox(null); document.body.style.overflow = ''; }, []);
  const prev  = useCallback(() => setLightbox(i => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next  = useCallback(() => setLightbox(i => (i + 1) % screenshots.length), [screenshots.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, prev, next]);

  return (
    <section className="proof section" id="proof">
      <div className="container">
        <span className="section-label reveal">Social Proof</span>
        <h2 className="h-display proof__headline reveal">
          The Wins Speak <em>For Themselves.</em>
        </h2>
        <p className="proof__sub body-text reveal reveal--delay-1">
          A snapshot of what members are reporting inside the community.
        </p>

        <div className="proof-grid">
          {screenshots.map((shot, i) => (
            <div
              key={shot.id}
              className="proof-item reveal"
              style={{ animationDelay: `${(i % 6) * 0.07}s` }}
              onClick={() => open(i)}
            >
              <img src={shot.src} alt={shot.alt} className="proof-item__img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox is-open" role="dialog" aria-modal="true">
          <div className="lightbox__content">
            <img
              src={screenshots[lightbox].src}
              alt={screenshots[lightbox].alt}
              className="lightbox__img"
            />
          </div>
          <button className="lightbox__close" onClick={close} aria-label="Close">✕</button>
          <button className="lightbox__prev"  onClick={prev}  aria-label="Previous">‹</button>
          <button className="lightbox__next"  onClick={next}  aria-label="Next">›</button>
          <div className="lightbox__backdrop" onClick={close} />
        </div>
      )}
    </section>
  );
}
