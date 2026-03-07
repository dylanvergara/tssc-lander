export default function Wins({ data }) {
  const { wins, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline">{wins.headline}</h2>
          <div className="body-copy">
            {wins.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p style={{ fontWeight: 700, fontSize: '13px', marginTop: '20px', marginBottom: '4px', color: '#333' }}>
            {wins.prizeHeadline}
          </p>
          <ul className="prizes-list">
            {wins.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
          </ul>

          <p style={{ fontWeight: 700, fontSize: '13px', marginTop: '24px', marginBottom: '12px', color: '#333' }}>
            And not to mention, our TSSC trophies. Hit a $10k, $20k, or $30k/mo milestone — a custom engraved trophy ships to your door within the week.
          </p>

          <div className="trophy-scroll-wrap">
            <div className="trophy-scroll-track">
              <div className="trophy-scroll-item">
                <img src={wins.trophyPromoImage} alt="TSSC Trophies graphic" loading="lazy" />
              </div>
              <div className="trophy-scroll-item">
                <img src={wins.trophyRealImage} alt="TSSC trophies lined up" loading="lazy" />
              </div>
              <div className="trophy-scroll-item">
                <img src={wins.meetupImage} alt="3rd Annual Meet Up trophy winners" loading="lazy" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
              Join the Community →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
