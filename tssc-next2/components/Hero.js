import VideoFacade from './VideoFacade';

export default function Hero({ data }) {
  const { hero, ctaUrl, ctaText } = data;
  return (
    <section className="hero section">
      <div className="page-col">
        <h1 className="hero__headline reveal">{hero.headline}</h1>
        <div className="reveal reveal--delay-1">
          <VideoFacade videoId={hero.vslVideoId} platform={hero.platform} title="Watch this first" />
        </div>
        <div className="hero__cta-wrap reveal reveal--delay-2">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
