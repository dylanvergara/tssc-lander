export default function Results({ data }) {
  const { results } = data;
  return (
    <section className="section" id="results">
      <div className="container">
        <span className="section-label reveal">{results.eyebrow}</span>
        <h2 className="h-display results__headline reveal">{results.headline}</h2>
        <p className="results__body body-text reveal reveal--delay-1">{results.body}</p>
        <div className="results__grid">
          {results.stats.map((stat, i) => (
            <div key={i} className={`results__card reveal reveal--delay-${i}`}>
              <span className="results__number h-display">{stat.number}</span>
              <span className="results__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
