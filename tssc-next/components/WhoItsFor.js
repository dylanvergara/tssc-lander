export default function WhoItsFor({ data }) {
  const { whoItsFor } = data;
  return (
    <section className="section" id="who">
      <div className="container">
        <div className="who__header">
          <span className="section-label reveal">{whoItsFor.eyebrow}</span>
          <h2 className="h-display who__headline reveal">{whoItsFor.headline}</h2>
          <p className="who__intro body-text reveal reveal--delay-1">{whoItsFor.intro}</p>
        </div>
        <div className="who__grid">
          <div className="who__col who__col--yes reveal">
            <div className="who__col-header">
              <span className="who__icon who__icon--yes">✓</span>
              <h3 className="who__col-title">This IS for you if you are a…</h3>
            </div>
            <ul className="who__list">
              {whoItsFor.included.map((item, i) => (
                <li key={i} className="who__list-item">{item}</li>
              ))}
            </ul>
          </div>
          <div className="who__col who__col--no reveal reveal--delay-1">
            <div className="who__col-header">
              <span className="who__icon who__icon--no">✗</span>
              <h3 className="who__col-title">This is NOT for you if…</h3>
            </div>
            <ul className="who__list">
              {whoItsFor.excluded.map((item, i) => (
                <li key={i} className="who__list-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
