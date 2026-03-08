export default function Process({ data }) {
  const { process } = data;
  return (
    <section className="process-section">
      {/* Fix 5: Hiring channel photo at top, full-screen, fades into section */}
      <div className="process__hero">
        <img
          src="/images/hiring-channel.png"
          alt="TSSC Hiring Channel"
          className="process__hero-img"
          loading="lazy"
        />
        <div className="process__hero-fade" />
      </div>

      <div className="process__content">
        <div className="col">
          <div className="reveal">
            <span className="eyebrow eyebrow--light">{process.eyebrow}</span>
            <h2 className="headline headline--white">{process.headline}</h2>
            <p className="subhead subhead--light">{process.subhead}</p>
          </div>

          {/* Fix 5: 6-step grid first */}
          <div className="process__steps reveal reveal--delay-1">
            {process.steps.map((step) => (
              <div key={step.number} className="process__step">
                <div className="process__step-num">{step.number}</div>
                <div className="process__step-title">{step.title}</div>
                <div className="process__step-body">{step.body}</div>
              </div>
            ))}
          </div>

          {/* Fix 5: Timeline graphic below steps, contained (not stretched) */}
          <div className="reveal reveal--delay-2" style={{ marginTop: '20px', textAlign: 'center' }}>
            <img
              src={process.image}
              alt="6-Month TSSC Student Timeline"
              loading="lazy"
              style={{
                maxWidth: '100%',
                width: 'auto',
                borderRadius: 'var(--radius-sm)',
                background: 'white',
                padding: '12px',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
