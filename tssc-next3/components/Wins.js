'use client';
import { useState } from 'react';

export default function Wins({ data }) {
  const { wins, ctaUrl } = data;
  const [showPrizes, setShowPrizes] = useState(false);

  return (
    <section className="section">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline">{wins.headline}</h2>
          <div className="body-copy">
            {wins.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Fix 7: Condensed prize list behind a toggle */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setShowPrizes(o => !o)}
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#333',
                fontFamily: 'inherit',
              }}
            >
              <span>Last 12 months of prizes</span>
              <span style={{ transition: 'transform 0.3s', display: 'inline-block', transform: showPrizes ? 'rotate(180deg)' : 'none' }}>⌄</span>
            </button>

            {showPrizes && (
              <div style={{
                marginTop: '8px',
                background: '#f8f8f8',
                borderRadius: '8px',
                padding: '12px 16px',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px 12px',
                }}>
                  {wins.prizes.map((prize, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#444', lineHeight: 1.4 }}>
                      {prize}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fix 8: Single trophy photo */}
          <div style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1/1' }}>
            <img
              src={wins.meetupImage}
              alt="3rd Annual High-Ticket Sales Meet Up trophy winners"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
              Join TSSC
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
