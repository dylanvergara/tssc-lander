import Image from 'next/image';

export default function Mission({ data }) {
  const { mission, ctaUrl, ctaText } = data;
  return (
    <section className="section" id="mission">
      <div className="container">
        <div className="mission__inner">
          <div className="mission__text">
            <span className="section-label reveal">{mission.eyebrow}</span>
            <h2 className="h-display mission__headline reveal">{mission.headline}</h2>
            {mission.body.map((para, i) => (
              <p key={i} className={`body-text reveal reveal--delay-${i + 1}`}>{para}</p>
            ))}
          </div>
          <div className="mission__accent reveal reveal--delay-2">
            <div className="accent-card">
              <Image
                src="/images/logo-transparent.png"
                alt="TSSC"
                width={120}
                height={60}
                className="accent-card__logo"
              />
              <p className="accent-card__quote h-display">"The environment that forges the 1%."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
