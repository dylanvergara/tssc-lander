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

        // Remove hard edges from form
        form.style.border = 'none';
        form.style.borderRadius = '0';
        form.style.position = 'relative';

        // TOP gradient — full viewport width, centered over form
        // Solid white strip at bottom so headline has breathing room,
        // then fades to transparent (revealing black page bg above)
        if (!document.querySelector('.tpt-fade-top')) {
          const fadeTop = document.createElement('div');
          fadeTop.className = 'tpt-fade-top';
          fadeTop.style.cssText = `
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 120px;
            background: linear-gradient(to bottom,
              #0f0f0f 0%,
              #0f0f0f 15%,
              rgba(249,250,251,0) 60%,
              rgb(249,250,251) 100%
            );
            pointer-events: none;
            z-index: 10;
          `;
          form.insertBefore(fadeTop, form.firstChild);
        }

        // BOTTOM gradient — full viewport width
        if (!document.querySelector('.tpt-fade-bottom')) {
          const fadeBottom = document.createElement('div');
          fadeBottom.className = 'tpt-fade-bottom';
          fadeBottom.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 80px;
            background: linear-gradient(to top, #0f0f0f 0%, transparent 100%);
            pointer-events: none;
            z-index: 10;
          `;
          form.appendChild(fadeBottom);
        }
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
