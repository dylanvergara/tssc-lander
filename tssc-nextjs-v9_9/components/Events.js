export default function Events({ data }) {
  const { events } = data;
  const img = (i) => (
    <img
      src={events.images[i].src}
      alt={events.images[i].caption}
      loading="lazy"
      style={{ objectPosition: events.images[i].position || 'center center' }}
    />
  );
  const cap = (i) => <span className="ec-caption">{events.images[i].caption}</span>;

  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">The Community</span>
          <h2 className="headline headline--white">Here&apos;s what our community-first approach looks like</h2>
          <p className="subhead subhead--light">{events.subhead}</p>
        </div>

        <div className="events-collage reveal reveal--delay-1">

          {/* Row 1: wide + 2 stacked */}
          <div className="ec-row ec-row--1">
            <div className="ec-cell ec-cell--wide">{img(0)}{cap(0)}</div>
            <div className="ec-col">
              <div className="ec-cell">{img(1)}{cap(1)}</div>
              <div className="ec-cell">{img(2)}{cap(2)}</div>
            </div>
          </div>

          {/* Row 2: 3 equal */}
          <div className="ec-row ec-row--3">
            {[3,4,5].map(i => (
              <div key={i} className="ec-cell">{img(i)}{cap(i)}</div>
            ))}
          </div>

          {/* Row 3: 2 stacked + wide */}
          <div className="ec-row ec-row--1">
            <div className="ec-col">
              <div className="ec-cell">{img(6)}{cap(6)}</div>
              <div className="ec-cell">{img(7)}{cap(7)}</div>
            </div>
            <div className="ec-cell ec-cell--wide">{img(8)}{cap(8)}</div>
          </div>

          {/* Row 4: full width */}
          <div className="ec-row ec-row--full">
            <div className="ec-cell ec-cell--full">{img(9)}{cap(9)}</div>
          </div>

        </div>
      </div>
    </section>
  );
}
