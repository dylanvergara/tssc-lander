export default function Wins({ data }) {
  const { wins, ctaUrl, ctaText } = data;
  return (
    <section className="section">
      <div className="col">

        {/* Wins card */}
        <div className="card reveal">
          <h2 className="headline">{wins.headline}</h2>
          <div className="body-copy">
            {wins.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p style={{ fontWeight: 700, fontSize: '13px', marginTop: '20px', marginBottom: '2px', color: '#333' }}>
            {wins.prizeHeadline}
          </p>
          <ul className="prizes-list">
            {wins.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
          </ul>
        </div>

        {/* TSSC Trophies promo graphic (IMG_2141) */}
        <div className="card card--flush reveal">
          <img src={wins.trophyPromoImage} alt="TSSC Trophies" className="trophy-img trophy-img--promo" loading="lazy" />
          <div style={{ padding: '24px 28px 28px' }}>
            <div className="body-copy">
              {wins.trophyCaptions.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          {/* Real trophies photo (IMG_7294) */}
          <img src={wins.trophyRealImage} alt="TSSC trophies lined up" className="trophy-img" loading="lazy"
            style={{ borderRadius: '0 0 var(--radius) var(--radius)' }} />
        </div>

        {/* 3rd Annual meetup group shot (3__CongressVenue-96) */}
        <div className="card card--flush reveal" style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
          <img src={wins.meetupImage} alt="3rd Annual High-Ticket Sales Meet Up" className="trophy-img" loading="lazy" />
          <div style={{ padding: '20px 28px 24px', background: 'var(--card)' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
              3rd Annual High-Ticket Sales Meet Up — 2025
            </p>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
              We sell out in-person events. People fly in from all over the world. This is what the community actually looks like.
            </p>
          </div>
        </div>

        <div className="reveal">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--dark">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
