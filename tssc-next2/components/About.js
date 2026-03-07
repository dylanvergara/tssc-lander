// About.js
export default function About({ data }) {
  const { about } = data;
  return (
    <section className="about section">
      <div className="page-col">
        <div className="reveal">
          <div className="about__photo-wrap">
            <img src={about.teamPhoto} alt="The TSSC Team" className="about__photo" loading="lazy" />
          </div>
          <div className="card" style={{ borderRadius: '0 0 12px 12px', paddingTop: '24px' }}>
            <h2 className="card-headline">{about.headline}</h2>
            <div className="card-body">
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
