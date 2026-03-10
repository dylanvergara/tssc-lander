export default function About({ data }) {
  const { about, ctaUrl } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
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
          {/* Fix 4: button is inside the white card */}
          <div className="about__text">
            <div className="about__headline-wrap">
              <div className="about__line1">Sales training doesn't get you hired.</div>
              <div className="about__line2">We do.</div>
            </div>
            <div className="body-copy">
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div style={{ marginTop: '24px' }}>
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-brand">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
