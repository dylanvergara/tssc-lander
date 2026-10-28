'use client';
import { useEffect, useState } from 'react';
import { bookingIframeSrc } from '../../lib/booking-widget-src';

const EMBED_SCRIPT = 'https://links.serialagency.co/js/form_embed.js';

export default function BookingPage() {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    setSrc(bookingIframeSrc(window.location.search));
  }, []);

  // Load GHL's resize script after the iframe is in the document.
  useEffect(() => {
    if (!src) return;
    if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.src = EMBED_SCRIPT;
      s.async = true;
      document.body.appendChild(s);
    }
  }, [src]);

  return (
    <div className="booking-page">
      <nav className="booking-nav">
        <img src="/images/logo-white-bg.png" alt="TSSC" className="booking-nav__logo" />
      </nav>

      <main className="booking-main">
        {src ? (
          <iframe
            src={src}
            id="8fdW73ns1TshoUa0dUVR_1779487157835"
            className="booking-iframe"
            scrolling="no"
            style={{ border: 'none', width: '100%' }}
          />
        ) : null}
      </main>
    </div>
  );
}
