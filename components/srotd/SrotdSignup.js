'use client';

import { useEffect, useRef } from 'react';
import { srotdBeehiiv } from '../../lib/srotd/config';

const LOADER = 'https://subscribe-forms.beehiiv.com/v3/loader.js';

// isSubscribed() in loader.js hides every form for the publication when this
// cookie is set. The loader writes it host-only, path=/, for 365 days, and
// does not read localStorage. SROTD still drops a same-named storage key.
const SUBSCRIBED_COOKIE = `bhv_${srotdBeehiiv.publicationId.replace(/^pub_/, '')}_subscribed`;

function allowRepeatSignup() {
  const expired = `${SUBSCRIBED_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/`;
  document.cookie = expired;
  document.cookie = `${expired}; domain=.serialsalescommunity.co`;
  document.cookie = `${expired}; domain=www.serialsalescommunity.co`;
  try {
    window.localStorage.removeItem(SUBSCRIBED_COOKIE);
    window.sessionStorage.removeItem(SUBSCRIBED_COOKIE);
  } catch (e) {
    // Storage can be blocked. The loader only consults the cookie.
  }
}

/**
 * Dylan's Beehiiv embed, mounted in this slot.
 * next/script hoists external scripts to the document, which would place the
 * form outside this column. The loader is inserted here instead, matching
 * the repo's BeehiivForm and this snippet:
 * <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js"
 *   data-beehiiv-form="6b38291b-5067-4614-89f1-320b7c504d8b"></script>
 * The page URL is left alone. Beehiiv reads utm_* and /srotd/<keyword> itself.
 */
export default function SrotdSignup() {
  const slot = useRef(null);

  useEffect(() => {
    const root = slot.current;
    if (!root || root.querySelector('script[data-beehiiv-form]')) return;
    allowRepeatSignup();
    const script = document.createElement('script');
    script.async = true;
    script.src = LOADER;
    script.setAttribute('data-beehiiv-form', srotdBeehiiv.formId);
    root.appendChild(script);
  }, []);

  return <div ref={slot} className="srotd__embed" />;
}
