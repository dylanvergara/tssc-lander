import Script from 'next/script';

export const metadata = {
  title: 'Book a Call — The Serial Sales Community',
  description: 'Schedule your Community Application Call with The Serial Sales Community.',
};

export default function BookingPage() {
  return (
    <>
      <Script
        src="https://links.serialagency.co/js/form_embed.js"
        strategy="afterInteractive"
      />

      <div className="booking-page">
        <nav className="booking-nav">
          <img src="/images/logo-white-bg.png" alt="TSSC" className="booking-nav__logo" />
        </nav>

        <main className="booking-main">
          <iframe
            src="https://links.serialagency.co/widget/booking/8fdW73ns1TshoUa0dUVR"
            id="8fdW73ns1TshoUa0dUVR_1779487157835"
            className="booking-iframe"
            scrolling="no"
            style={{ border: 'none' }}
          />
        </main>
      </div>
    </>
  );
}
