export default function Disclaimer({ data }) {
  const { disclaimer } = data;
  return (
    <section className="disclaimer section">
      <div className="page-col">
        <div className="card reveal">
          <h2 className="card-headline">{disclaimer.headline}</h2>
          <div className="card-body">
            {disclaimer.paragraphs.map((p, i) => (
              <p key={i} style={i === 0 ? { fontWeight: 700 } : {}}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
