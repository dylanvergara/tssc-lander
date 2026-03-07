// About.js
export default function About({ data }) {
  const { about, ctaUrl, ctaText } = data;
  return (
    <section className="section section--gray" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__image-wrap reveal">
            <img src={about.image} alt="The Serial Sales Community" className="about__image" loading="lazy" />
            <div className="about__image-border" />
          </div>
          <div className="about__text">
            <span className="section-label reveal">{about.eyebrow}</span>
            <h2 className="h-display about__headline reveal">{about.headline}</h2>
            {about.body.map((para, i) => (
              <p key={i} className={`body-text reveal reveal--delay-${i + 1}`}>{para}</p>
            ))}
            <div className="reveal reveal--delay-2">
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                {ctaText} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
