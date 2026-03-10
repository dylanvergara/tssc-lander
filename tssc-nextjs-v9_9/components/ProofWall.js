'use client';
import { useState, useEffect, useCallback } from 'react';

// 90 image slots — 10 pages of 9
const PROOF_IMAGES = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  src: `/images/proof/proof-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Member win ${i + 1}`,
}));

const PAGE_SIZE = 9; // 3x3 grid per swipe

export default function ProofWall({ data }) {
  const { proof } = data;
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(null); // index into PROOF_IMAGES
  const totalPages = Math.ceil(PROOF_IMAGES.length / PAGE_SIZE);
  const visible = PROOF_IMAGES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Close on Escape, navigate with arrow keys
  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight') setLightbox(i => Math.min(PROOF_IMAGES.length - 1, i + 1));
    if (e.key === 'ArrowLeft')  setLightbox(i => Math.max(0, i - 1));
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const openLightbox = (img) => {
    const globalIdx = PROOF_IMAGES.findIndex(p => p.id === img.id);
    setLightbox(globalIdx);
  };

  return (
    <section className="section proof-section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow">{proof.headline}</span>
          <p className="subhead" style={{ marginTop: '6px', marginBottom: '16px', fontSize: '13px', color: '#666' }}>{proof.subhead}</p>
        </div>

        {/* 3x3 grid */}
        <div className="proof-carousel-grid reveal reveal--delay-1">
          {visible.map((img) => (
            <div
              key={img.id}
              className="proof-carousel-cell"
              onClick={() => openLightbox(img)}
              style={{ cursor: 'zoom-in' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.background = '#f0f0f0'; }}
              />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="proof-carousel-dots reveal reveal--delay-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`proof-dot${i === page ? ' is-active' : ''}`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="proof-carousel-nav reveal reveal--delay-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="proof-nav-btn"
          >← Prev</button>
          <span className="proof-page-label">{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="proof-nav-btn"
          >Next →</button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>

          {/* Prev arrow */}
          {lightbox > 0 && (
            <button
              className="lightbox-arrow lightbox-arrow--prev"
              onClick={e => { e.stopPropagation(); setLightbox(i => i - 1); }}
              aria-label="Previous"
            >‹</button>
          )}

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={PROOF_IMAGES[lightbox].src}
              alt={PROOF_IMAGES[lightbox].alt}
              className="lightbox-img"
            />
          </div>

          {/* Next arrow */}
          {lightbox < PROOF_IMAGES.length - 1 && (
            <button
              className="lightbox-arrow lightbox-arrow--next"
              onClick={e => { e.stopPropagation(); setLightbox(i => i + 1); }}
              aria-label="Next"
            >›</button>
          )}

          <div className="lightbox-counter">{lightbox + 1} / {PROOF_IMAGES.length}</div>
        </div>
      )}
    </section>
  );
}
