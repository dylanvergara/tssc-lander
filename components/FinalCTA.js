export default function FinalCTA({ data }) {
  const { ctaUrl } = data;
  return (
    <section className="section section--gap">
      <div className="col">
        <div className="final-cta-card reveal">
          <h2 className="final-cta__headline">Ready to take the next step?</h2>
          {/* Fix 12: Updated subtext, removed extra copy */}
          <p className="final-cta__sub">Our application takes less than five minutes.</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand"
            style={{ maxWidth: '360px', margin: '0 auto' }}>
            Apply to TSSC
          </a>
        </div>
      </div>
    </section>
  );
}
