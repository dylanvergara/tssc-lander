export default function Mission({ data }) {
  const { mission, ctaUrl, ctaText } = data;
  return (
    <section className="mission section">
      <div className="page-col">
        <div className="card reveal">
          <h2 className="card-headline" style={{ textAlign: 'center' }}>
            {mission.headline}<br />
            <span className="accent-word">{mission.accentLine}</span>
          </h2>
          <div className="card-body">
            {mission.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ marginTop: '24px' }}>
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
