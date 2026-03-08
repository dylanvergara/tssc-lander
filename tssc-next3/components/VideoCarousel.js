'use client';
import VideoFacade from './VideoFacade';

export default function VideoCarousel({ data, carouselIndex }) {
  const carousel = data.testimonialCarousels[carouselIndex];
  if (!carousel) return null;

  return (
    <section className="carousel-section">
      <div className="col">
        <div className="carousel-header reveal">
          <span className="eyebrow eyebrow--light">Member Interviews</span>
          <h2 className="headline headline--white">{carousel.headline}</h2>
        </div>
      </div>

      {/* Full-bleed swipe track */}
      <div className="carousel-track-wrap reveal reveal--delay-1">
        <div className="carousel-track" style={{ paddingLeft: 'max(20px, calc((100vw - var(--col)) / 2))' }}>
          {carousel.videos.map(vid => (
            <div key={vid.id} className="carousel-card">
              <VideoFacade videoId={vid.videoId} platform={vid.platform} title={vid.label} small />
              <div className="carousel-card__meta">
                <div className="carousel-card__label">{vid.label}</div>
                <div className="carousel-card__sub">{vid.sub}</div>
              </div>
            </div>
          ))}
          {/* Spacer at end so last card has breathing room */}
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
