'use client';

import { useEffect, useRef } from 'react';
import { srotdBeehiiv } from '../../lib/srotd/config';

const LOADER = 'https://subscribe-forms.beehiiv.com/v3/loader.js';

/**
 * Dylan's Beehiiv embed, mounted in this slot.
 * next/script hoists external scripts to the document, which would place the
 * form outside this column. The loader is inserted here instead, matching
 * the repo's BeehiivForm and this snippet:
 * <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js"
 *   data-beehiiv-form="6b38291b-5067-4614-89f1-320b7c504d8b"></script>
 * The page URL is left alone. Beehiiv reads /srotd/<keyword> itself.
 */
export default function SrotdSignup() {
  const slot = useRef(null);

  useEffect(() => {
    const root = slot.current;
    if (!root || root.querySelector('script[data-beehiiv-form]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = LOADER;
    script.setAttribute('data-beehiiv-form', srotdBeehiiv.formId);
    root.appendChild(script);
  }, []);

  return <div ref={slot} className="srotd__embed" />;
}
