export default function About({ data }) {
  const { about, ctaUrl, ctaText } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          <div className="about__img-wrap">
            <img src={about.image} alt="Dylan presenting to TSSC members" className="about__img" loading="lazy" />
          </div>
          <div className="about__text">
            <h2 className="headline">{about.headline}</h2>
            <div className="body-copy">
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
        <div className="reveal reveal--delay-1">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--dark">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
