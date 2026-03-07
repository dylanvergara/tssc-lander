export default function About({ data }) {
  const { about, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          {/* Fix 4+13: Square crop positioned to show the crowd */}
          <div style={{
            borderRadius: 'var(--radius) var(--radius) 0 0',
            overflow: 'hidden',
            aspectRatio: '1/1',
            position: 'relative',
          }}>
            <img
              src={about.image}
              alt="Dylan presenting to TSSC members"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 65%',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.92))',
            }} />
          </div>
          <div className="about__text">
            <h2 className="headline">{about.headline}</h2>
            <div className="body-copy">
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
        <div className="reveal reveal--delay-1">
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
            See If You Qualify — Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
