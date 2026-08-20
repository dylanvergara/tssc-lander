'use client';
import { useEffect, useRef } from 'react';

// Beehiiv subscribe form + attribution tracking for the SQDB access lead magnet.
const BEEHIIV_FORM_ID = '19518e8b-bc7f-4d3e-a21a-469832811553';

export default function GetSqdbPage() {
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

    // Beehiiv subscribe form: mount the loader inside our container so the
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
          <span className="lm15__eyebrow">Free Access</span>
          <h1 className="lm15__headline">
            24/7 Access to 69x $10,000+/mo earners, in your pocket.
          </h1>
          <p className="lm15__sub">
            The SQDB is an AI trained on 69 real interviews with TSSC members who broke into remote
            appointment setting and closing, and scaled past $10,000/mo in earnings. Ask it anything
            and get real answers around what it takes.
          </p>
          <p className="lm15__meta">69 member interviews, 25+ hours of stories, 1 chatbot</p>
        </header>

        {/* Middle media slot: animated demo of the SQDB. Swap /public/images/get-sqdb-demo.gif to change it. */}
        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/get-sqdb-demo.gif" alt="The SQDB in action" className="lm15__img" />
          </div>
        </div>

        <div className="lm15__cta">
          <div ref={formRef} className="lm15__form" />
          <p className="lm15__microcopy">100% free, unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
