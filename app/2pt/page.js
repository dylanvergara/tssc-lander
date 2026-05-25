'use client';
import { useEffect } from 'react';

export default function TwoPieceTuesdayPage() {
  useEffect(() => {
    // Load Kit script
    if (!document.querySelector('script[src="https://serialsales.kit.com/aecfb85dd8/index.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://serialsales.kit.com/aecfb85dd8/index.js';
      s.async = true;
      s.setAttribute('data-uid', 'aecfb85dd8');
      document.body.appendChild(s);
    }

    // Poll until Kit renders the form, then center it via inline style
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const form = document.querySelector('.tpt-form-wrap .formkit-form');
      if (form) {
        form.style.marginLeft = 'auto';
        form.style.marginRight = 'auto';
        form.style.display = 'block';
        clearInterval(interval);
      }
      if (attempts > 60) clearInterval(interval); // stop after 6 seconds
    }, 100);

    return () => clearInterval(interval);
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
      {/* Wrapper sized to match Kit's 700px form exactly */}
      <div className="tpt-form-wrap">
        <div data-uid="aecfb85dd8" />
      </div>
    </div>
  );
}
