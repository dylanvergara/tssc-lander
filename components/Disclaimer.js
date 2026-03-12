export default function Disclaimer({ data }) {
  const { disclaimer } = data;
  const lines = disclaimer.headline.split('\n');
  return (
    <section className="section">
      <div className="col">
        <div className="disclaimer-card reveal">
          <h2 className="disclaimer-card__headline">
            {lines.map((line, i) => (
              <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
            ))}
          </h2>
          {disclaimer.paragraphs.map((p, i) => (
            <p key={i} className={p.bold ? 'bold' : ''}>{p.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
