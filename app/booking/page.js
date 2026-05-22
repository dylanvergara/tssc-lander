'use client';
import { useEffect } from 'react';

export default function BookingPage() {
  // Load GHL's resize script after mount
  useEffect(() => {
    if (!document.querySelector('script[src="https://links.serialagency.co/js/form_embed.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://links.serialagency.co/js/form_embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="booking-page">
      <nav className="booking-nav">
        <img src="/images/logo-white-bg.png" alt="TSSC" className="booking-nav__logo" />
      </nav>

      <main className="booking-main">
        <iframe
          src="https://links.serialagency.co/widget/bookings/book-application"
          id="8fdW73ns1TshoUa0dUVR_1779487157835"
          className="booking-iframe"
          scrolling="no"
          style={{ border: 'none', width: '100%' }}
        />
      </main>
    </div>
  );
}
