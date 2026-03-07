// Longevity.js
export default function Longevity({ data }) {
  const { longevity } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="card reveal">
          <h2 className="headline">{longevity.headline}</h2>
          <div className="body-copy">
            {longevity.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
