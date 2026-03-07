export default function FinalCTA({ data }) {
  const { ctaUrl, ctaText } = data;
  return (
    <section className="section section--gap">
      <div className="col">
        <div className="final-cta-card reveal">
          <h2 className="final-cta__headline">Ready to take the next step?</h2>
          <p className="final-cta__sub">Application takes 5 minutes. We respond within 48 hours.</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--blue"
            style={{ maxWidth: '360px', margin: '0 auto' }}>
            {ctaText}
          </a>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '16px', letterSpacing: '0.04em' }}>
            No commitment required until you've spoken with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
