'use client';
import { useEffect, useRef } from 'react';

// Embeds a Beehiiv subscribe form. Mounts the loader inside its own container
// so the form renders exactly where this component is placed.
export default function BeehiivForm({ formId, className }) {
  const ref = useRef(null);

  useEffect(() => {
    // Attribution tracking (load once)
    if (!document.querySelector('script[src="https://subscribe-forms.beehiiv.com/attribution.js"]')) {
      const a = document.createElement('script');
      a.type = 'text/javascript';
      a.async = true;
      a.src = 'https://subscribe-forms.beehiiv.com/attribution.js';
      document.body.appendChild(a);
    }
    const c = ref.current;
    if (c && !c.querySelector('script[data-beehiiv-form]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
      s.setAttribute('data-beehiiv-form', formId);
      c.appendChild(s);
    }
  }, [formId]);

  return <div ref={ref} className={className} />;
}
