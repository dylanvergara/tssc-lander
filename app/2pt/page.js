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

        // Remove hard edges
        form.style.border = 'none';
        form.style.borderRadius = '0';
        form.style.position = 'relative';
        form.style.overflow = 'visible';

        // TOP gradient — same width and position as the form,
        // but tall enough to cover the gap above AND add white breathing room
        // Uses negative margin-top to pull it up over the gap
        if (!document.querySelector('.tpt-fade-top')) {
          const fadeTop = document.createElement('div');
          fadeTop.className = 'tpt-fade-top';

          const formRect = form.getBoundingClientRect();
          const scrollY = window.scrollY;
          const formTop = formRect.top + scrollY;
          const formLeft = formRect.left;
          const formWidth = formRect.width;
          const bridgeHeight = 120; // covers gap + adds white breathing room

          fadeTop.style.cssText = `
            position: absolute;
            top: -${bridgeHeight}px;
            left: 0;
            right: 0;
            width: 100%;
            height: ${bridgeHeight}px;
            background: linear-gradient(to bottom,
              #0f0f0f 0%,
              #0f0f0f 30%,
              rgba(249,250,251,0.0) 65%,
              rgb(249,250,251) 100%
            );
            pointer-events: none;
            z-index: 10;
          `;
          form.insertBefore(fadeTop, form.firstChild);

          // Also paint left and right sides black on desktop
          // so there's no white peeking on either side of the 700px form
          const paintSides = () => {
            const r = form.getBoundingClientRect();
            if (r.left > 0) {
              // Left side
              if (!document.querySelector('.tpt-side-left')) {
                const left = document.createElement('div');
                left.className = 'tpt-side-left';
                left.style.cssText = `
                  position: fixed;
                  top: 0; left: 0;
                  width: ${r.left}px;
                  height: 100vh;
                  background: #0f0f0f;
                  z-index: 9;
                  pointer-events: none;
                `;
                document.body.appendChild(left);

                const right = document.createElement('div');
                right.className = 'tpt-side-right';
                right.style.cssText = `
                  position: fixed;
                  top: 0; right: 0;
                  width: ${r.left}px;
                  height: 100vh;
                  background: #0f0f0f;
                  z-index: 9;
                  pointer-events: none;
                `;
                document.body.appendChild(right);
              }
            }
          };
          paintSides();
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
