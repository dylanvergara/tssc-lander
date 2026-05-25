'use client';
import { useEffect } from 'react';

export default function TwoPieceTuesdayPage() {
  useEffect(() => {
    const src = `https://serialsales.kit.com/aecfb85dd8/index.js?v=${Date.now()}`;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-uid', 'aecfb85dd8');
    document.body.appendChild(s);

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const form = document.querySelector('body > .formkit-form');
      if (form) {
        clearInterval(interval);
        form.style.border = 'none';
        form.style.borderRadius = '16px';
        form.style.overflow = 'hidden';
        form.style.maxWidth = '600px';
        form.style.margin = '0 auto';
      }
      if (attempts > 60) clearInterval(interval);
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
      <div className="tpt-form-wrap">
        <div data-uid="aecfb85dd8" />
      </div>
    </div>
  );
}
