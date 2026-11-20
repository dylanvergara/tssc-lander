'use client';

import { useEffect, useState } from 'react';

const NAME_KEYS = ['first_name', 'firstname', 'fname', 'name'];
const LINK_KEYS = ['join', 'join_link', 'join_url', 'webinar_link', 'live_room_url', 'room_url'];

function cleanName(value) {
  const text = String(value || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > 40) return '';
  if (!/^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]{0,39}$/u.test(text)) return '';
  return text;
}

function cleanLink(value) {
  try {
    const url = new URL(String(value || ''));
    if (url.protocol !== 'https:') return '';
    return url.toString();
  } catch {
    return '';
  }
}

// Reads the thank-you query string once. Nothing is stored or sent anywhere.
export default function RegistrationDetails() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let name = '';
    for (const key of NAME_KEYS) {
      name = cleanName(params.get(key));
      if (name) break;
    }
    let href = '';
    for (const key of LINK_KEYS) {
      href = cleanLink(params.get(key));
      if (href) break;
    }
    if (name || href) setDetails({ name, href });
  }, []);

  if (!details) return null;

  return (
    <div className="wb-passed">
      {details.name ? <p className="wb-passed__name">You&apos;re in, {details.name}.</p> : null}
      {details.href ? (
        <a className="wb-btn wb-btn--ghost" href={details.href} target="_blank" rel="noopener noreferrer">
          Your join link
        </a>
      ) : null}
    </div>
  );
}
