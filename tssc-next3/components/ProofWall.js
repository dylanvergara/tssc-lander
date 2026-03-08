'use client';
import { useState } from 'react';

// 81 image slots — fill with your proof screenshots
const PROOF_IMAGES = Array.from({ length: 81 }, (_, i) => ({
  id: i + 1,
  src: `/images/proof/proof-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Member win ${i + 1}`,
}));

const PAGE_SIZE = 9; // 3x3 grid per swipe

export default function ProofWall({ data }) {
  const { proof } = data;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(PROOF_IMAGES.length / PAGE_SIZE);
  const visible = PROOF_IMAGES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

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
            <div key={img.id} className="proof-carousel-cell">
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
    </section>
  );
}
