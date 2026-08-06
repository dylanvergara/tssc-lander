'use client';
import { useEffect, useRef } from 'react';

// Beehiiv subscribe form + attribution tracking for the 15 Hour Free Training lead magnet.
const BEEHIIV_FORM_ID = '9f4af13c-bc5a-43cc-aa63-2cb81d30a6ba';

export default function FifteenHourTrainingPage() {
  const formRef = useRef(null);

  useEffect(() => {
    // Attribution tracking (load once, globally)
    if (!document.querySelector('script[src="https://subscribe-forms.beehiiv.com/attribution.js"]')) {
      const attr = document.createElement('script');
      attr.type = 'text/javascript';
      attr.async = true;
      attr.src = 'https://subscribe-forms.beehiiv.com/attribution.js';
      document.body.appendChild(attr);
    }

    // Beehiiv subscribe form — mount the loader inside our container so the
    // form iframe renders exactly where we want it (bottom of the page).
    const container = formRef.current;
    if (container && !container.querySelector('script[data-beehiiv-form]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
      s.setAttribute('data-beehiiv-form', BEEHIIV_FORM_ID);
      container.appendChild(s);
    }
  }, []);

  return (
    <div className="lm15">
      <div className="lm15__inner">
        <header className="lm15__head">
          <img src="/images/dylan-headshot.jpg" alt="Dylan Vergara" className="lm15__avatar" />
          <span className="lm15__eyebrow">Free Training</span>
          <h1 className="lm15__headline">
            15 Hour Free Training: How to Land a 1099 Inbound WFH Sales Job
          </h1>
          <p className="lm15__sub">
            Based on thousands of datapoints across hundreds of paying clients, stuffed into 43 sections.
            The definitive training on how you can land a quality remote appointment setting or closing job.
          </p>
          <p className="lm15__meta">7 modules &middot; 43 sections &middot; ~15 hours</p>
        </header>

        {/* Middle image slot — swap /public/images/15-hr-training.png with your graphic (same filename, no code change needed) */}
        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/15-hr-training.png" alt="Inside the 15 Hour Free Training" className="lm15__img" />
          </div>
        </div>

        <div className="lm15__cta">
          <p className="lm15__cta-label">Get the training now</p>
          <div ref={formRef} className="lm15__form" />
          <p className="lm15__microcopy">100% free, unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
