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
            The Most Successful Minds of TSSC, In Your Pocket
          </h1>
          <p className="lm15__sub">
            The SQDB is an AI trained on 69 real interviews with paying members who broke into
            remote appointment setting and closing. Ask it anything about landing a 1099 WFH sales
            job and get straight answers with real names and real numbers.
          </p>
          <p className="lm15__meta">69 member interviews, 20+ hours of stories, 1 chatbot</p>
        </header>

        {/* Middle image slot: swap /public/images/get-sqdb-cover.png with your graphic (same filename, no code change needed) */}
        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/get-sqdb-cover.png" alt="The SQDB, Success Query Database" className="lm15__img" />
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
