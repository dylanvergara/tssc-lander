export default function Wins({ data }) {
  const { wins, ctaUrl, ctaText } = data;
  return (
    <section className="section">
      <div className="page-col">

        {/* Main wins card */}
        <div className="card reveal">
          <h2 className="card-headline">{wins.headline}</h2>
          <div className="card-body">
            {wins.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p style={{ fontWeight: 700, fontSize: '14px', marginTop: '20px', marginBottom: '4px' }}>
            {wins.prizeListHeadline}
          </p>
          <ul className="prizes-list">
            {wins.prizes.map((prize, i) => (
              <li key={i}>{prize}</li>
            ))}
          </ul>
        </div>

        {/* Trophies card */}
        <div className="card reveal">
          <img src={wins.trophyPromoImage} alt="TSSC Trophies" className="trophy-image" loading="lazy" style={{ marginTop: 0, marginBottom: '20px', borderRadius: '8px' }} />
          <div className="card-body">
            {wins.trophyCaption.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <img src={wins.trophyRealImage} alt="Real TSSC Trophies" className="trophy-image" loading="lazy" />
        </div>

        {/* CTA after wins */}
        <div className="reveal">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
