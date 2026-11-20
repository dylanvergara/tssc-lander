'use client';

import { useEffect, useState } from 'react';

const PLACEHOLDER = { days: '--', hours: '--', minutes: '--', seconds: '--', live: false };

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

function partsFrom(ms) {
  if (ms <= 0) return { ...PLACEHOLDER, live: true };
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    live: false,
  };
}

export default function Countdown({ startIso }) {
  const [parts, setParts] = useState(PLACEHOLDER);

  useEffect(() => {
    const start = Date.parse(startIso);
    const tick = () => setParts(partsFrom(start - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startIso]);

  const label = parts.live
    ? 'We are live'
    : `Starts in ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`;

  return (
    <div className="wb-count" role="timer" aria-label={label}>
      <p className="wb-count__label">{parts.live ? 'We are live' : 'Starts in'}</p>
      {parts.live ? null : (
        <div className="wb-count__row">
          {UNITS.map(([key, name]) => (
            <div key={key} className={`wb-count__unit${key === 'seconds' ? ' wb-count__unit--sec' : ''}`}>
              <span className="wb-count__num" aria-hidden="true">{parts[key]}</span>
              <span className="wb-count__name" aria-hidden="true">{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
