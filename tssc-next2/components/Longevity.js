export default function Longevity({ data }) {
  const { longevity } = data;
  return (
    <section className="section">
      <div className="page-col">
        <div className="card reveal">
          <h2 className="card-headline">{longevity.headline}</h2>
          <div className="card-body">
            {longevity.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
