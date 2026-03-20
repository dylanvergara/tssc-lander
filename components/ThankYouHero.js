'use client';
import { useEffect } from 'react';

export default function ThankYouHero() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://fast.wistia.com/player.js';
      s1.async = true;
      document.head.appendChild(s1);
    }
    const embedSrc = 'https://fast.wistia.com/embed/kqduhxl8du.js';
    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const s2 = document.createElement('script');
      s2.src = embedSrc;
      s2.async = true;
      s2.type = 'module';
      document.head.appendChild(s2);
    }
  }, []);

  return (
    <section className="hero section">
      <div className="col">
        <span className="hero__eyebrow">Your call is confirmed</span>
        <h1 className="hero__headline">Here's what you need to know now.</h1>
        <div className="reveal">
          <div className="vsl-glow">
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <wistia-player
                media-id="kqduhxl8du"
                aspect="1.7777777777777777"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
