export default function Mission({ data }) {
  const { mission, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="card reveal">
          <div className="mission__headline-wrap">
            <span className="mission__line1">{mission.headline}</span>
            <span className="mission__line2">{mission.accentLine}</span>
          </div>
          <div className="body-copy">
            {mission.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div style={{ marginTop: '28px' }}>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
              Join TSSC
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
