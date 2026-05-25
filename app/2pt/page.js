'use client';
import { useEffect } from 'react';

export default function TwoPieceTuesdayPage() {
  useEffect(() => {
    // Always load fresh Kit script (busts CDN cache)
    const src = `https://serialsales.kit.com/aecfb85dd8/index.js?v=${Date.now()}`;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-uid', 'aecfb85dd8');
    document.body.appendChild(s);
  }, []);

  return (
    <div className="tpt-page">
      <img
        src="/images/2PT (1).png"
        alt="Two-Piece Tuesday"
        className="tpt-image"
      />
      <img
        src="/images/2PT.png"
        alt="Two-Piece Tuesday Newsletter Preview"
        className="tpt-image"
      />

      {/* Gradient bridge: black â†’ form background */}
      <div className="tpt-gradient-top" />

      <div className="tpt-form-wrap">
        <div data-uid="aecfb85dd8" />
      </div>

      {/* Gradient bridge: form background â†’ black */}
      <div className="tpt-gradient-bottom" />
    </div>
  );
}
