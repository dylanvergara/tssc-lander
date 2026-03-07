// Hero.js
import VideoFacade from './VideoFacade';
export default function Hero({ data }) {
  const { hero, ctaUrl, ctaText } = data;
  return (
    <section className="hero section">
      <div className="col">
        <span className="hero__eyebrow">{hero.eyebrow}</span>
        <h1 className="hero__headline">{hero.headline}</h1>
        <div className="reveal">
          <VideoFacade videoId={hero.vslVideoId} platform={hero.platform} title="Watch this first" />
        </div>
        <div className="hero__cta-wrap reveal reveal--delay-1">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--blue">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
