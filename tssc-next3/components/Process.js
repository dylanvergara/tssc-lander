export default function Process({ data }) {
  const { process } = data;
  return (
    <section className="process-section">
      {/* Full-screen image that fades into the process content below */}
      <div className="process__hero">
        <img
          src={process.image}
          alt="6-Month TSSC Student Timeline"
          className="process__hero-img"
          loading="lazy"
        />
        <div className="process__hero-fade" />
      </div>

      {/* Process content below fades in from the image */}
      <div className="process__content">
        <div className="col">
          <div className="reveal">
            <span className="eyebrow eyebrow--light">{process.eyebrow}</span>
            <h2 className="headline headline--white">{process.headline}</h2>
            <p className="subhead subhead--light">{process.subhead}</p>
          </div>
          <div className="process__steps reveal reveal--delay-1">
            {process.steps.map((step) => (
              <div key={step.number} className="process__step">
                <div className="process__step-num">{step.number}</div>
                <div className="process__step-title">{step.title}</div>
                <div className="process__step-body">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
