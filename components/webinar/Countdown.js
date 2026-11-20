'use client';

import { useEffect, useState } from 'react';

function formatRemaining(ms) {
  if (ms <= 0) return 'We are live';
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n) => String(n).padStart(2, '0');
  if (days > 0) return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

export default function Countdown({ startIso, fallback }) {
  const [label, setLabel] = useState(fallback);

  useEffect(() => {
    const start = Date.parse(startIso);
    const tick = () => setLabel(formatRemaining(start - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startIso]);

  return <p className="wb-count">{label}</p>;
}
