export default function Process({ data }) {
  const { process, ctaUrl, ctaText } = data;
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <div className="process__header">
          <span className="section-label reveal">{process.eyebrow}</span>
          <h2 className="h-display process__headline reveal">{process.headline}</h2>
        </div>
        <div className="process__steps">
          {process.steps.map((step, i) => (
            <div key={step.number} className={`process__step reveal reveal--delay-${i}`}>
              <div className="process__step-number h-display">{step.number}</div>
              <div className="process__step-content">
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="process__cta reveal">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            Start Your Application →
          </a>
        </div>
      </div>
    </section>
  );
}
