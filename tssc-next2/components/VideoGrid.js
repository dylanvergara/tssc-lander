'use client';
import { useState } from 'react';
import VideoFacade from './VideoFacade';

const BATCH = 6;

export default function VideoGrid({ data }) {
  const { testimonialVideos, ctaUrl, ctaText } = data;
  const [shown, setShown] = useState(BATCH);

  const visible = testimonialVideos.videos.slice(0, shown);
  const hasMore = shown < testimonialVideos.videos.length;

  return (
    <section className="section">
      <div className="page-col page-col--wide">
        <h2 className="video-section__headline reveal">{testimonialVideos.sectionHeadline}</h2>
        <div className="video-grid">
          {visible.map((vid, i) => (
            <div key={vid.id} className="video-card reveal" style={{ transitionDelay: `${(i % 4) * 0.06}s` }}>
              <VideoFacade videoId={vid.videoId} platform={vid.platform} title={vid.label} small />
              <div className="video-card__meta">
                <div className="video-card__label">{vid.label}</div>
                <div className="video-card__sub">{vid.sub}</div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-wrap reveal">
            <button className="load-more-btn" onClick={() => setShown(s => s + BATCH)}>
              Load More Stories
            </button>
          </div>
        )}
        <div style={{ paddingTop: '24px' }} className="reveal">
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
