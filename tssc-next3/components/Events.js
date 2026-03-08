export default function Events({ data }) {
  const { events } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">The Community</span>
          {/* Fix 9: Updated headline */}
          <h2 className="headline headline--white">Here&apos;s what our community-first approach looks like</h2>
          {/* Fix 9: Updated subtext */}
          <p className="subhead subhead--light">Local chapters, in-person events, workshops and meetups. TSSC members show up for each other.</p>
        </div>
        {/* Fix 13: All square aspect ratio */}
        <div className="events-grid reveal reveal--delay-1">
          {events.images.map((img, i) => (
            <div key={i} className="event-item" style={{ aspectRatio: '1/1' }}>
              <img src={img.src} alt={img.caption} className="event-item__img" loading="lazy" />
              <span className="event-item__caption">{img.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
