'use client';
import { useEffect } from 'react';

export default function TwoPieceTuesdayPage() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://serialsales.kit.com/aecfb85dd8/index.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://serialsales.kit.com/aecfb85dd8/index.js';
      s.async = true;
      s.setAttribute('data-uid', 'aecfb85dd8');
      document.body.appendChild(s);
    }
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
      <div className="tpt-form-wrap">
        <div data-uid="aecfb85dd8" />
      </div>
    </div>
  );
}
