'use client';
import { useRef, useEffect, useState } from 'react';
import VideoFacade from './VideoFacade';

export default function VideoCarousel({ data, carouselIndex }) {
  const carousel = data.testimonialCarousels[carouselIndex];
  const trackRef = useRef(null);
  const [opacities, setOpacities] = useState({});

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateOpacities = () => {
      const cards = track.querySelectorAll('.carousel-card');
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      const newOpacities = {};

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        const maxDistance = trackRect.width * 0.6;
        const opacity = Math.max(0.25, 1 - (distance / maxDistance) * 0.75);
        newOpacities[i] = opacity;
      });

      setOpacities(newOpacities);
    };

    updateOpacities();
    track.addEventListener('scroll', updateOpacities, { passive: true });
    return () => track.removeEventListener('scroll', updateOpacities);
  }, []);

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
          {carousel.videos.map((vid, i) => (
            <div
              key={vid.id}
              className="carousel-card"
              style={{
                opacity: opacities[i] !== undefined ? opacities[i] : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {/* Text top */}
              <div className="carousel-card__text">
                <div className="carousel-card__milestone">{vid.label}</div>
                <div className="carousel-card__before">
                  <span className="carousel-card__before-label">Before:</span> {vid.sub.replace('Before: ', '')}
                </div>
              </div>
              {/* Video centered */}
              <div className="carousel-card__video">
                <VideoFacade videoId={vid.videoId} platform={vid.platform} title={vid.label} small />
              </div>
            </div>
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
