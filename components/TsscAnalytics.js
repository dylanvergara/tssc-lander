'use client';

import { Analytics } from '@vercel/analytics/react';

const PROD_HOSTS = ['serialsalescommunity.co', 'www.serialsalescommunity.co'];
const KEY = 'tssc_internal';

function isInternal(url) {
  try {
    if (typeof window === 'undefined') return false;
    const u = new URL(url || window.location.href);
    if (!PROD_HOSTS.includes(window.location.hostname)) return true;
    const flag = new URLSearchParams(window.location.search).get('internal') || u.searchParams.get('internal');
    if (flag === '1') {
      try { window.localStorage.setItem(KEY, '1'); } catch (e) {}
      return true;
    }
    if (flag === '0') {
      try { window.localStorage.removeItem(KEY); } catch (e) {}
      return false;
    }
    try { return window.localStorage.getItem(KEY) !== null; } catch (e) { return false; }
  } catch (e) {
    return false;
  }
}

export default function TsscAnalytics() {
  return <Analytics beforeSend={(event) => (isInternal(event.url) ? null : event)} />;
}
