export default function Differentiator({ data }) {
  const { differentiator, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="card card--accent-top reveal">
          <div className="diff__headline-wrap">
            <div className="diff__line1">{differentiator.headline}</div>
            <div className="diff__line2">{differentiator.accentWord}</div>
          </div>
          <div className="body-copy">
            {differentiator.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div style={{ marginTop: '28px' }}>
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
              Start Your Application →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
