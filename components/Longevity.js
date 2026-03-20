export default function Longevity({ data }) {
  const { longevity, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="card card--slate reveal">
          <h2 className="headline">{longevity.headline}</h2>
          <div className="body-copy">
            {longevity.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {ctaUrl && (
            <div style={{ marginTop: '28px' }}>
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
                Apply Now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
