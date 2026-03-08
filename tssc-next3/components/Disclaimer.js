export default function Disclaimer({ data }) {
  const { disclaimer } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="disclaimer-card reveal">
          <h2 className="headline headline--center">{disclaimer.headline}</h2>
          {disclaimer.paragraphs.map((p, i) => (
            <p key={i} className={p.bold ? 'bold' : ''}>{p.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
