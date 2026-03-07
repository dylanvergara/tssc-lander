// FinalCTA.js
export default function FinalCTA({ data }) {
  const { ctaUrl, ctaText } = data;
  return (
    <section className="final-cta section">
      <div className="page-col">
        <div className="card reveal" style={{ textAlign: 'center', padding: '40px 28px' }}>
          <h2 className="final-cta__headline">Ready to take the next step?</h2>
          <p className="final-cta__sub">Application takes 5 minutes. We respond within 48 hours.</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
            {ctaText}
          </a>
          <p style={{ fontSize: '11px', color: '#aaa', marginTop: '14px' }}>
            No commitment required until you've spoken with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
