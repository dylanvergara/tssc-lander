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

function readPassed() {
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
  return { name, href };
}

// Reads the thank-you query string once. Nothing is stored or sent anywhere.
export default function RegistrationDetails({ line, when }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(readPassed().name);
  }, []);

  const text = name ? `You're in, ${name} · ${when}` : line;

  return <p className="wb-confirm__when">{text}</p>;
}

export function JoinLink() {
  const [href, setHref] = useState('');

  useEffect(() => {
    setHref(readPassed().href);
  }, []);

  if (!href) return null;

  return (
    <a className="wb-join" href={href} target="_blank" rel="noopener noreferrer">
      Your join link
    </a>
  );
}
