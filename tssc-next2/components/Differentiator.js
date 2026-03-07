export default function Differentiator({ data }) {
  const { differentiator } = data;
  return (
    <section className="section">
      <div className="page-col">
        <div className="card reveal">
          <div className="diff__headline-wrap">
            <div className="diff__headline">{differentiator.headline}</div>
            <div className="diff__accent">{differentiator.accentWord}</div>
          </div>
          <div className="card-body">
            {differentiator.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
