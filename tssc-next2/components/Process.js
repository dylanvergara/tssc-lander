export default function Process({ data }) {
  const { process } = data;
  return (
    <section className="process-section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">{process.eyebrow}</span>
          <h2 className="headline headline--white">{process.headline}</h2>
          <p className="subhead subhead--light">{process.subhead}</p>
        </div>

        {/* 6-month timeline graphic */}
        <div className="process__timeline-wrap reveal reveal--delay-1">
          <img
            src={process.image}
            alt="6-Month TSSC Student Timeline"
            className="process__timeline-img"
            loading="lazy"
          />
        </div>

        {/* Step breakdown */}
        <div className="process__steps reveal reveal--delay-2">
          {process.steps.map((step, i) => (
            <div key={step.number} className="process__step">
              <div className="process__step-num">{step.number}</div>
              <div className="process__step-title">{step.title}</div>
              <div className="process__step-body">{step.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
