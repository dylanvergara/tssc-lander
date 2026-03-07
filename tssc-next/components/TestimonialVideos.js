'use client';
import { useState } from 'react';
import { VideoFacade } from './Hero';

const BATCH = 8;
const FILTERS = [
  { label: 'All Stories', value: 'all' },
  { label: 'Closers & AEs', value: 'closer' },
  { label: 'SDRs & BDRs', value: 'sdr' },
  { label: 'Sales Leaders', value: 'leader' },
];

export default function TestimonialVideos({ data }) {
  const { testimonialVideos } = data;
  const [filter, setFilter] = useState('all');
  const [shown, setShown]   = useState(BATCH);

  const filtered = filter === 'all'
    ? testimonialVideos
    : testimonialVideos.filter(v => v.category === filter);

  const visible  = filtered.slice(0, shown);
  const hasMore  = shown < filtered.length;

  return (
    <section className="testimonials section section--gray" id="testimonials">
      <div className="container">
        <span className="section-label reveal">Member Stories</span>
        <h2 className="h-display testimonials__headline reveal">Don't Take Our Word for It.</h2>
        <p className="testimonials__sub body-text reveal reveal--delay-1">
          Real members. Real results. Recorded and shared with permission.
        </p>

        <div className="video-filters reveal reveal--delay-2">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn${filter === f.value ? ' filter-btn--active' : ''}`}
              onClick={() => { setFilter(f.value); setShown(BATCH); }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="video-grid">
          {visible.map(vid => (
            <div key={vid.id} className="video-card reveal">
              <VideoFacade
                videoId={vid.videoId}
                platform={vid.platform}
                thumbnail={
                  vid.platform === 'youtube'
                    ? `https://img.youtube.com/vi/${vid.videoId}/maxresdefault.jpg`
                    : undefined
                }
                title={vid.name}
              />
              <div className="video-card__info">
                <span className="video-card__name">{vid.name}</span>
                <span className="video-card__title">{vid.title}</span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="testimonials__load-more reveal">
            <button className="btn btn--outline" onClick={() => setShown(s => s + BATCH)}>
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
