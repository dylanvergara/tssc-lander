export default function Events({ data }) {
  const { events } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">The Community</span>
          <h2 className="headline headline--white">{events.headline}</h2>
          <p className="subhead subhead--light">{events.subhead}</p>
        </div>
        <div className="events-grid reveal reveal--delay-1">
          {events.images.map((img, i) => (
            <div key={i} className="event-item">
              <img src={img.src} alt={img.caption} className="event-item__img" loading="lazy" />
              <span className="event-item__caption">{img.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
