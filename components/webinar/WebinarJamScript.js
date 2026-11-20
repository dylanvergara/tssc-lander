'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { SAVE_SEAT_LABEL } from '../../lib/webinar';

// The embed script binds once, to buttons already in the DOM. It does not
// delegate. A button rendered later forwards its click to one that is bound.
// next/script loads the file once. Inline styles and a replaced label are
// stripped so the TSSC button is what people see.
export default function WebinarJamScript({ hash, src }) {
  useEffect(() => {
    const jquery = () => window.wj?.[hash]?.jQuery || null;

    const clicks = (button) => {
      const jQ = jquery();
      if (!jQ || typeof jQ._data !== 'function') return 0;
      return jQ._data(button, 'events')?.click?.length || 0;
    };

    const protect = () => {
      document.querySelectorAll('.wb button.wj-embed-button').forEach((button) => {
        const visible = (button.textContent || '').replace(/\s+/g, ' ').trim();
        if (visible !== SAVE_SEAT_LABEL) button.textContent = SAVE_SEAT_LABEL;
        if (button.getAttribute('style')) button.removeAttribute('style');
        if (button.getAttribute('data-webinarhash') !== hash) {
          button.setAttribute('data-webinarHash', hash);
        }
      });
    };

    const onClick = (event) => {
      const button = event.target.closest?.('.wb button.wj-embed-button');
      if (!button || clicks(button)) return;
      const bound = [...document.querySelectorAll('.wb button.wj-embed-button')].find((el) => clicks(el));
      if (!bound) return;
      event.preventDefault();
      event.stopPropagation();
      bound.click();
    };

    protect();
    document.addEventListener('click', onClick, true);
    const observer = new MutationObserver(protect);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      document.removeEventListener('click', onClick, true);
      observer.disconnect();
    };
  }, [hash]);

  return <Script id={`wj-embed-${hash}`} src={src} strategy="afterInteractive" />;
}
