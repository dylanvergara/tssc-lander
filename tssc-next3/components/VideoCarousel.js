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

      <div className="carousel-track-wrap reveal reveal--delay-1">
        <div className="carousel-track" style={{ paddingLeft: 'max(20px, calc((100vw - var(--col)) / 2))' }}>
          {carousel.videos.map(vid => (
            <div key={vid.id} className="carousel-card">
              {/* Milestone — top */}
              <div className="carousel-card__milestone">{vid.label}</div>
              {/* Before — below milestone */}
              <div className="carousel-card__before">
                <span className="carousel-card__before-label">Before:</span> {vid.sub.replace('Before: ', '')}
              </div>
              {/* Video — bottom */}
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
