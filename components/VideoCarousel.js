'use client';
import { useRef, useState } from 'react';
import VideoFacade from './VideoFacade';

function CarouselCard({ vid }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`carousel-card${open ? ' carousel-card--expanded' : ''}`}>
      <div className="carousel-card__text">
        <div className="carousel-card__milestone">{vid.label}</div>
        <div className="carousel-card__before">
          <span className="carousel-card__before-label">Before:</span> {vid.sub.replace('Before: ', '')}
        </div>
      </div>
      <div className="carousel-card__video">
        <VideoFacade videoId={vid.videoId} platform={vid.platform} title={vid.label} small />
      </div>
      {vid.bio && (
        <div className="carousel-card__bio-wrap">
          <button
            className="carousel-card__readmore"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            {open ? 'Read less ▲' : 'Read more ▼'}
          </button>
          {open && (
            <p className="carousel-card__bio">{vid.bio}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function VideoCarousel({ data, carouselIndex }) {
  const carousel = data.testimonialCarousels[carouselIndex];
  const trackRef = useRef(null);

  if (!carousel) return null;

  return (
    <section className="carousel-section">
      <div className="col">
        <div className="carousel-header reveal">
          <span className="eyebrow eyebrow--light">Member Interviews</span>
          <h2 className="headline headline--white">{carousel.headline}</h2>
        </div>
      </div>

      <div className="carousel-track-wrap reveal reveal--delay-1">
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ paddingLeft: 'max(20px, calc((100vw - var(--col)) / 2))' }}
        >
          {carousel.videos.map((vid) => (
            <CarouselCard key={vid.id} vid={vid} />
          ))}
          <div style={{ flexShrink: 0, width: '20px' }} />
        </div>
      </div>

      <div className="col">
        <div className="carousel-hint reveal reveal--delay-2">
          <span>Swipe to see more</span>
        </div>
      </div>
    </section>
  );
}
