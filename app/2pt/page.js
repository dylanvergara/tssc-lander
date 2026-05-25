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
        form.style.borderRadius = '0';
        form.style.position = 'relative';
        form.style.overflow = 'visible';

        // TOP gradient — sits at the very top of the form
        // transparent → form white, so it fades FROM the black page background
        // into the form color. Does NOT paint black over anything above it.
        if (!document.querySelector('.tpt-fade-top')) {
          const fadeTop = document.createElement('div');
          fadeTop.className = 'tpt-fade-top';
          fadeTop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 80px;
            background: linear-gradient(to bottom,
              rgba(249,250,251,0) 0%,
              rgb(249,250,251) 100%
            );
            pointer-events: none;
            z-index: 10;
          `;
          form.insertBefore(fadeTop, form.firstChild);
        }

        // BOTTOM gradient
        if (!document.querySelector('.tpt-fade-bottom')) {
          const fadeBottom = document.createElement('div');
          fadeBottom.className = 'tpt-fade-bottom';
          fadeBottom.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 80px;
            background: linear-gradient(to top, #0f0f0f 0%, transparent 100%);
            pointer-events: none;
            z-index: 10;
          `;
          form.appendChild(fadeBottom);
        }

        // On desktop: black side panels to hide white form edges
        const r = form.getBoundingClientRect();
        if (r.left > 10 && !document.querySelector('.tpt-side-left')) {
          const left = document.createElement('div');
          left.className = 'tpt-side-left';
          left.style.cssText = `position:fixed;top:0;left:0;width:${r.left}px;height:100vh;background:#0f0f0f;z-index:9;pointer-events:none;`;
          document.body.appendChild(left);

          const right = document.createElement('div');
          right.className = 'tpt-side-right';
          right.style.cssText = `position:fixed;top:0;right:0;width:${r.left}px;height:100vh;background:#0f0f0f;z-index:9;pointer-events:none;`;
          document.body.appendChild(right);
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
