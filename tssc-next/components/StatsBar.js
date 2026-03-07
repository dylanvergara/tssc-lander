// StatsBar.js
export default function StatsBar({ data }) {
  const { stat1, stat2, stat3 } = data.mission;
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar__grid">
          {[stat1, stat2, stat3].map((stat, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className="stats-bar__divider" />}
              <div key={stat.number} className="stats-bar__item reveal">
                <span className="stats-bar__number h-display">{stat.number}</span>
                <span className="stats-bar__label">{stat.label}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
