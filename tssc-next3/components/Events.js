export default function Events({ data }) {
  const { events } = data;
  return (
    <section className="section">
      <div className="col">
        <div className="reveal">
          <span className="eyebrow eyebrow--light">The Community</span>
          <h2 className="headline headline--white">Here&apos;s what our community-first approach looks like</h2>
          <p className="subhead subhead--light">{events.subhead}</p>
        </div>

        {/* Collage grid — mosaic layout */}
        <div className="events-collage reveal reveal--delay-1">

          {/* Row 1: 1 wide + 2 tall stacked */}
          <div className="ec-row ec-row--1">
            <div className="ec-cell ec-cell--wide">
              <img src={events.images[0].src} alt={events.images[0].caption} loading="lazy" />
              <span className="ec-caption">{events.images[0].caption}</span>
            </div>
            <div className="ec-col">
              <div className="ec-cell">
                <img src={events.images[1].src} alt={events.images[1].caption} loading="lazy" />
                <span className="ec-caption">{events.images[1].caption}</span>
              </div>
              <div className="ec-cell">
                <img src={events.images[2].src} alt={events.images[2].caption} loading="lazy" />
                <span className="ec-caption">{events.images[2].caption}</span>
              </div>
            </div>
          </div>

          {/* Row 2: 3 equal */}
          <div className="ec-row ec-row--3">
            {[3, 4, 5].map(i => (
              <div key={i} className="ec-cell">
                <img src={events.images[i].src} alt={events.images[i].caption} loading="lazy" />
                <span className="ec-caption">{events.images[i].caption}</span>
              </div>
            ))}
          </div>

          {/* Row 3: 2 tall stacked + 1 wide */}
          <div className="ec-row ec-row--1 ec-row--reverse">
            <div className="ec-col">
              <div className="ec-cell">
                <img src={events.images[6].src} alt={events.images[6].caption} loading="lazy" />
                <span className="ec-caption">{events.images[6].caption}</span>
              </div>
              <div className="ec-cell">
                <img src={events.images[7].src} alt={events.images[7].caption} loading="lazy" />
                <span className="ec-caption">{events.images[7].caption}</span>
              </div>
            </div>
            <div className="ec-cell ec-cell--wide">
              <img src={events.images[8].src} alt={events.images[8].caption} loading="lazy" />
              <span className="ec-caption">{events.images[8].caption}</span>
            </div>
          </div>

          {/* Row 4: last one full width */}
          <div className="ec-row ec-row--full">
            <div className="ec-cell ec-cell--full">
              <img src={events.images[9].src} alt={events.images[9].caption} loading="lazy" />
              <span className="ec-caption">{events.images[9].caption}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
