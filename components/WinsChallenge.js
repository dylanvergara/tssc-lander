'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  activeTally,
  buildSlices,
  canSpin,
  drawingLine,
  fallbackColor,
  formatShare,
  initials,
  landingRotation,
  memberStory,
  memberWord,
  pickWeighted,
  pointWord,
  withRanks,
} from '../lib/wins-format';

const ADMIN_STORAGE = 'tssc-wins-admin-key';

const SLICE_COLORS = [
  '#18445f',
  '#c5dcea',
  '#0f2c3d',
  '#8fb4c9',
  '#245773',
  '#e7f2f8',
  '#326888',
  '#d5e5ef',
  '#16384c',
  '#a9c9da',
];

function restRotation(slices) {
  if (!slices.length) return 0;
  const two = Math.PI * 2;
  return ((-slices[0].sweep / 2) % two + two) % two;
}

function cryptoRandom() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  }
  return Math.random();
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150;
}

function sliceColor(index, count) {
  let colorIndex = index % SLICE_COLORS.length;
  if (index === count - 1 && count > 1) {
    const firstLight = isLight(SLICE_COLORS[0]);
    if (isLight(SLICE_COLORS[colorIndex]) === firstLight) {
      colorIndex = (colorIndex + 1) % SLICE_COLORS.length;
    }
  }
  return SLICE_COLORS[colorIndex];
}

function drawWheel(canvas, slices) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = canvas.clientWidth;
  if (!size) return;
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 3;

  if (!slices.length) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#141414';
    ctx.fill();
    ctx.strokeStyle = 'rgba(182,205,222,0.28)';
    ctx.lineWidth = 2;
    ctx.stroke();
    return;
  }

  slices.forEach((slice, index) => {
    const color = sliceColor(index, slices.length);
    ctx.beginPath();
    if (slice.sweep >= Math.PI * 1.999) {
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    } else {
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, slice.start, slice.end);
      ctx.closePath();
    }
    ctx.fillStyle = color;
    ctx.fill();
    // Stroke only the outer arc. A miter join on a thin wedge throws a spike
    // from the center through the slice.
    if (slice.sweep < Math.PI * 1.999) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, slice.start, slice.end);
      ctx.strokeStyle = '#080808';
      ctx.lineWidth = 2;
      ctx.stroke();
      const hub = radius * 0.3;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(slice.start) * hub, cy + Math.sin(slice.start) * hub);
      ctx.lineTo(cx + Math.cos(slice.start) * radius, cy + Math.sin(slice.start) * radius);
      ctx.stroke();
    }

    if (slice.sweep < 0.22) return;

    const text = slice.member.name;
    const light = isLight(color);
    ctx.fillStyle = light ? '#10202c' : '#f7f7f5';
    ctx.textBaseline = 'middle';

    if (slice.sweep > Math.PI * 1.8) {
      ctx.font = '700 18px Montserrat, "DM Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, cx, cy - radius * 0.42);
      return;
    }

    const fontPx = Math.max(10, Math.min(14, Math.round(slice.sweep * radius * 0.11)));
    ctx.font = `700 ${fontPx}px Montserrat, "DM Sans", sans-serif`;
    const mid = slice.start + slice.sweep / 2;
    const norm = ((mid % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const onLeft = norm > Math.PI / 2 && norm < (Math.PI * 3) / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(onLeft ? mid + Math.PI : mid);
    ctx.textAlign = onLeft ? 'left' : 'right';
    const outer = radius - 46;
    const maxWidth = Math.max(36, outer - radius * 0.34);
    let label = text;
    while (label.length > 1 && ctx.measureText(label).width > maxWidth) {
      label = `${label.slice(0, -2)}…`;
    }
    ctx.fillText(label, onLeft ? -outer : outer, 0);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(182,205,222,0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#163044';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(182,205,222,0.55)';
  ctx.stroke();
}

function Avatar({ name, url, size = 44 }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [url]);

  const letters = initials(name);
  const fontSize = Math.max(11, Math.round(size * 0.34));
  const showPhoto = Boolean(url) && !failed;

  return (
    <span className="wc-avatar-slot" style={{ width: size, height: size }}>
      <span
        className="wc-avatar wc-avatar--fallback"
        style={{ background: fallbackColor(name), fontSize }}
        aria-hidden={showPhoto}
      >
        {letters}
      </span>
      {showPhoto && (
        <img
          src={url}
          alt=""
          className="wc-avatar wc-avatar--photo"
          onError={() => setFailed(true)}
          decoding="async"
        />
      )}
    </span>
  );
}

function Chips({ items }) {
  if (!items?.length) return null;
  return (
    <div className="wc-chips">
      {items.map((item) => (
        <span className="wc-chip" key={item.topic}>
          <span>{item.topic} ×{item.count}</span>
          <span className="wc-chip__pts">{item.points}</span>
        </span>
      ))}
    </div>
  );
}

function TallyList({ tally, total, absentIds }) {
  const rows = withRanks(tally);
  if (!rows.length) {
    return <p className="wc-empty">No wins posted for this month yet.</p>;
  }
  return (
    <ol className="wc-board">
      {rows.map((member) => {
        const out = absentIds?.has(member.memberId);
        return (
        <li
          className={`wc-row${member.rank === 1 ? ' wc-row--lead' : ''}${out ? ' wc-row--out' : ''}`}
          key={`${member.memberId}-${member.name}`}
        >
          <span className="wc-rank">{member.rank}</span>
          <Avatar name={member.name} url={member.avatarUrl} size={44} />
          <div className="wc-row__main">
            <div className="wc-row__name">
              {member.name}
              {out && <span className="wc-absent-tag">Not present</span>}
            </div>
            <Chips items={member.breakdown} />
          </div>
          <div className="wc-points">
            <span className="wc-points__num">{member.points}</span>
            <span className="wc-points__label">{pointWord(member.points)}</span>
            {total > 0 && (
              <span className="wc-points__share">{formatShare(member.points, total)}</span>
            )}
          </div>
        </li>
        );
      })}
    </ol>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function MoneyRain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const greens = ['#146b45', '#0e5a3a', '#1c7a50', '#0c4a32'];
    const bills = Array.from({ length: 54 }, (_, index) => {
      const burst = index < 20;
      const w = 26 + Math.random() * 16;
      return {
        x: burst ? width * (0.15 + Math.random() * 0.7) : Math.random() * width,
        y: burst ? height * (0.28 + Math.random() * 0.35) : Math.random() * height * 0.3 - 30,
        vx: burst ? (Math.random() - 0.5) * 14 : (Math.random() - 0.5) * 1.6,
        vy: burst ? -(2 + Math.random() * 8) : 1.4 + Math.random() * 2.4,
        g: burst ? 0.18 + Math.random() * 0.08 : 0.03 + Math.random() * 0.03,
        w,
        h: w * 0.46,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.16,
        color: greens[index % greens.length],
      };
    });

    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      let alive = false;
      const fade = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 2.5) / 0.9);
      for (const bill of bills) {
        bill.vy += bill.g;
        bill.x += bill.vx;
        bill.y += bill.vy;
        bill.vx *= 0.992;
        bill.rot += bill.vr;
        if (fade <= 0 || bill.y > height + 60) continue;
        alive = true;
        ctx.save();
        ctx.translate(bill.x, bill.y);
        ctx.rotate(bill.rot);
        ctx.globalAlpha = fade;
        ctx.fillStyle = bill.color;
        roundRect(ctx, -bill.w / 2, -bill.h / 2, bill.w, bill.h, 3);
        ctx.fill();
        ctx.strokeStyle = 'rgba(232, 246, 236, 0.85)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#f4fbf6';
        ctx.font = `700 ${Math.max(10, Math.round(bill.h * 0.62))}px Montserrat, "DM Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 1);
        ctx.restore();
      }
      if (alive && t < 3.5) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="wc-bills" aria-hidden="true" />;
}

function WinnerModal({
  winner, selected, months, total, billsOn, saving, saveError, storageReady, dialogRef, onAbsent, onFinal,
}) {
  const story = memberStory(months, winner.memberId);
  const maxPoints = story.played.reduce((max, row) => Math.max(max, row.points), 0) || 1;

  return (
    <div className="wc-modal">
      {billsOn && <MoneyRain />}
      <div
        className="wc-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wc-winner-name"
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="wc-modal__scroll">
          <p className="wc-eyebrow">On the wheel</p>
          <div className="wc-modal__avatar">
            <Avatar name={winner.name} url={winner.avatarUrl} size={96} />
          </div>
          <h2 className="wc-modal__name" id="wc-winner-name">{winner.name}</h2>
          <p className="wc-modal__month">{selected.label}</p>
          <p className="wc-modal__points">
            {winner.points} {pointWord(winner.points)}, {formatShare(winner.points, total)} of this wheel.
          </p>
          {winner.circleProfileUrl && (
            <a className="wc-profile" href={winner.circleProfileUrl} target="_blank" rel="noopener noreferrer">
              Circle profile
            </a>
          )}

          <h3 className="wc-modal__h">Challenge history</h3>
          {story.played.length === 0 ? (
            <p className="wc-modal__empty">No months on the board yet.</p>
          ) : (
            <ul className="wc-bars">
              {story.played.map((row) => (
                <li className="wc-bar" key={row.month}>
                  <span className="wc-bar__label">{row.label}</span>
                  <span className="wc-bar__track" aria-hidden="true">
                    <span className="wc-bar__fill" style={{ width: `${Math.max(6, (row.points / maxPoints) * 100)}%` }} />
                  </span>
                  <span className="wc-bar__pts">{row.points} pts · {row.entries} {row.entries === 1 ? 'entry' : 'entries'}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="wc-modal__h">Called before</h3>
          {story.won.length === 0 && story.missed.length === 0 ? (
            <p className="wc-modal__empty">No called wins yet.</p>
          ) : (
            <ul className="wc-called">
              {story.won.map((row) => (
                <li key={`won-${row.month}`}><span>Won</span> {row.label}</li>
              ))}
              {story.missed.map((row) => (
                <li key={`miss-${row.month}`}><span>Not present</span> {row.label}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="wc-modal__actions">
          {saveError && <p className="wc-save-error">{saveError}</p>}
          {storageReady ? (
            <>
              <button type="button" className="wc-btn-ghost" onClick={onAbsent} disabled={saving}>
                {saving ? 'Saving' : 'Not present - spin again'}
              </button>
              <button type="button" className="btn-brand" onClick={onFinal} disabled={saving}>
                {saving ? 'Saving' : 'Final winner'}
              </button>
            </>
          ) : (
            <p className="wc-modal__empty">Drawing storage is not configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WinsChallenge({ data }) {
  const selectId = useId();
  const noteId = useId();
  const [months, setMonths] = useState(data.months);
  const spinMonths = useMemo(
    () => months.filter((month) => canSpin(month)),
    [months],
  );
  const initialMonth = spinMonths.some((month) => month.month === data.nowMonth)
    ? data.nowMonth
    : (spinMonths[0]?.month || data.nowMonth);

  const [monthKey, setMonthKey] = useState(initialMonth);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [announce, setAnnounce] = useState('');
  const [billsOn, setBillsOn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminReady, setAdminReady] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [respin, setRespin] = useState(false);

  const spinningRef = useRef(false);
  const rotRef = useRef(0);
  const tokenRef = useRef(0);
  const rotorRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const dialogRef = useRef(null);
  const spinBtnRef = useRef(null);
  const adminRef = useRef(false);
  const spinRef = useRef(() => {});
  adminRef.current = admin;

  const selected = months.find((month) => month.month === monthKey) || null;
  const current = months.find((month) => month.month === data.nowMonth) || null;
  const pool = useMemo(() => activeTally(selected), [selected]);
  const slices = useMemo(() => buildSlices(pool), [pool]);
  const total = pool.reduce((sum, member) => sum + member.points, 0);
  const selectedTotal = (selected?.tally || []).reduce((sum, member) => sum + member.points, 0);
  const currentTotal = (current?.tally || []).reduce((sum, member) => sum + member.points, 0);
  const history = useMemo(() => [...months].reverse(), [months]);
  const absentIds = useMemo(
    () => new Set((selected?.absent || []).map((person) => person.memberId)),
    [selected],
  );
  const currentAbsentIds = useMemo(
    () => new Set((current?.absent || []).map((person) => person.memberId)),
    [current],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return undefined;
    const draw = () => drawWheel(canvas, slices);
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    let cancel = false;
    document.fonts?.ready?.then(() => {
      if (!cancel) draw();
    });
    return () => {
      cancel = true;
      observer.disconnect();
    };
  }, [slices]);

  useLayoutEffect(() => {
    const rest = restRotation(slices);
    rotRef.current = rest;
    const el = rotorRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform = `rotate(${rest}rad)`;
  }, [monthKey, slices]);

  useEffect(() => {
    let cancel = false;
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('admin');
    const stored = window.localStorage.getItem(ADMIN_STORAGE);
    const key = fromQuery || stored;
    const stripKey = () => {
      const current = new URLSearchParams(window.location.search);
      if (!current.has('admin')) return;
      current.delete('admin');
      const next = current.toString();
      window.history.replaceState(null, '', `${window.location.pathname}${next ? `?${next}` : ''}`);
    };
    if (!key) {
      setAdmin(false);
      setAdminReady(true);
      return undefined;
    }
    fetch('/api/wins-challenge/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ key }),
    }).then((res) => {
      if (cancel) return;
      stripKey();
      if (res.ok) {
        window.localStorage.setItem(ADMIN_STORAGE, key);
        setAdmin(true);
        setAdminError('');
      } else {
        window.localStorage.removeItem(ADMIN_STORAGE);
        setAdmin(false);
        if (fromQuery) setAdminError('That key did not work.');
      }
      setAdminReady(true);
    }).catch(() => {
      if (cancel) return;
      stripKey();
      setAdmin(false);
      setAdminReady(true);
    });
    return () => { cancel = true; };
  }, []);

  useEffect(() => {
    if (!respin) return undefined;
    setRespin(false);
    spinRef.current();
    return undefined;
  }, [respin]);

  useEffect(() => {
    if (spinningRef.current || winner) return undefined;
    if (spinMonths.some((month) => month.month === monthKey)) return undefined;
    if (spinMonths[0]) setMonthKey(spinMonths[0].month);
    return undefined;
  }, [spinMonths, monthKey, winner]);

  useEffect(() => {
    if (!winner) {
      setBillsOn(false);
      return undefined;
    }
    setBillsOn(!prefersReducedMotion());
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = dialogRef.current;
    root?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        return;
      }
      if (event.key !== 'Tab' || !root) return;
      const nodes = [...root.querySelectorAll('button, a[href]')];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      spinBtnRef.current?.focus();
    };
  }, [winner]);

  function selectMonth(key) {
    if (spinningRef.current) return;
    setWinner(null);
    setMonthKey(key);
  }

  function spin() {
    if (!adminRef.current || spinningRef.current || !slices.length || !selected || selected.winner) return;
    const random = cryptoRandom;
    const member = pickWeighted(slices.map((slice) => slice.member), random);
    const slice = slices.find((item) => item.member.memberId === member.memberId) || slices[0];
    const reduced = prefersReducedMotion();
    const duration = reduced ? 0 : 5600 + Math.floor(random() * 1400);
    const { next } = landingRotation({
      currentRotation: rotRef.current,
      slice,
      random,
      minTurns: reduced ? 0 : 6,
      maxExtraTurns: reduced ? 0 : 2,
    });
    rotRef.current = next;
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    spinningRef.current = true;
    setSpinning(true);
    setWinner(null);

    const finish = () => {
      if (tokenRef.current !== token) return;
      spinningRef.current = false;
      setSpinning(false);
      setWinner(member);
      setSaveError('');
      setAnnounce(`${member.name}, ${selected.label}. ${member.points} ${pointWord(member.points)}.`);
    };

    const el = rotorRef.current;
    if (!el || duration === 0) {
      if (el) {
        el.style.transition = 'none';
        el.style.transform = `rotate(${next}rad)`;
      }
      finish();
      return;
    }

    const onEnd = (event) => {
      if (event.propertyName !== 'transform') return;
      el.removeEventListener('transitionend', onEnd);
      finish();
    };
    el.addEventListener('transitionend', onEnd);
    el.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.68, 0.04, 1)`;
    // Restart the transition if the rotor was previously un-transitioned.
    void el.offsetWidth;
    el.style.transform = `rotate(${next}rad)`;
  }
  spinRef.current = spin;

  async function record(action) {
    if (!winner || saving || !selected) return;
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/wins-challenge/draw', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-wins-admin-key': window.localStorage.getItem(ADMIN_STORAGE) || '',
        },
        body: JSON.stringify({
          month: selected.month,
          action,
          memberId: winner.memberId,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveError(payload.error || 'Could not save that.');
        setSaving(false);
        return;
      }
      const drawing = payload.drawing || { absent: [], finalWinner: null };
      setMonths((prev) => prev.map((month) => {
        if (month.month !== selected.month) return month;
        const next = { ...month, absent: drawing.absent || [] };
        if (drawing.finalWinner) {
          next.winner = {
            name: drawing.finalWinner.name,
            avatarUrl: drawing.finalWinner.avatarUrl,
            sourceUrl: null,
          };
          next.winnerSource = 'drawing';
        }
        return next;
      }));
      setSaving(false);
      setWinner(null);
      if (action === 'absent') setRespin(true);
    } catch {
      setSaveError('Could not save that.');
      setSaving(false);
    }
  }

  const wheelLabel = selected
    ? `Prize wheel for ${selected.label}, slice size follows points`
    : 'Prize wheel';
  const showPastBoard = selected && current && selected.month !== current.month;
  let historyYear = '';

  return (
    <>
      <header className="wc-nav">
        <a href="/" aria-label="The Serial Sales Community, home">
          <img src="/images/logo-white-bg.png" alt="" className="wc-nav__logo" />
        </a>
      </header>

      <main className="wc-wrap">
        <p className="wc-sr" aria-live="polite">{announce}</p>

        <section className="wc-hero" id="wheel">
          <div className="wc-hero__copy">
            <span className="wc-eyebrow">Every month</span>
            <h1 className="wc-h1">Wins <span className="wc-accent">Challenge</span></h1>
            <p className="wc-lead">
              Post a qualifying win in the Wins channel. Points decide how big your slice is. End of the month, one name gets pulled.
            </p>
            <p className="wc-note" id={noteId}>
              {admin
                ? 'Drawing mode. A name is not final until you lock it.'
                : 'The drawing gets called from this page. The winner shows up in the history once it is locked.'}
            </p>
            <nav className="wc-jumps" aria-label="On this page">
              <a href="#wheel">Spin</a>
              <a href="#tally">Tally</a>
              <a href="#history">Winners</a>
            </nav>
            {data.spaceUrl && (
              <a className="wc-textlink" href={data.spaceUrl} target="_blank" rel="noopener noreferrer">
                Open the Wins channel
              </a>
            )}
          </div>

          <div className="wc-hero__wheel">
            <span className="wc-eyebrow">{admin ? 'Drawing mode' : 'The wheel'}</span>
            <h2 className="wc-h2">{admin ? 'Spin the wheel' : 'The odds'}</h2>
            <p className="wc-help">Months with a locked winner are not on this list.</p>
            {adminError && <p className="wc-save-error">{adminError}</p>}

            <label className="wc-select-label" htmlFor={selectId}>Month</label>
            <select
              id={selectId}
              className="wc-select"
              value={spinMonths.some((month) => month.month === selected?.month) ? selected.month : ''}
              disabled={spinning || spinMonths.length === 0}
              onChange={(event) => selectMonth(event.target.value)}
            >
              {spinMonths.length === 0 && <option value="">No open month</option>}
              {spinMonths.map((month) => (
                <option key={month.month} value={month.month}>{month.label}</option>
              ))}
            </select>

            <div className="wc-stage" ref={stageRef}>
              <svg className="wc-pointer" viewBox="0 0 36 32" aria-hidden="true">
                <path d="M18 30 L2.5 6.5 Q18 0 33.5 6.5 Z" fill="#f7f7f5" stroke="#0c2230" strokeWidth="2.4" />
              </svg>
              <div className="wc-rotor" ref={rotorRef}>
                <canvas ref={canvasRef} role="img" aria-label={wheelLabel} />
              </div>
              {admin && (
                <button
                  type="button"
                  className="wc-hub"
                  onClick={spin}
                  disabled={spinning || slices.length === 0}
                  aria-describedby={noteId}
                >
                  {spinning ? <span className="wc-hub__spinner" /> : 'Spin'}
                </button>
              )}
            </div>

            <p className="wc-wheel__meta">
              {slices.length} {memberWord(slices.length)} · {total} {pointWord(total)}
            </p>
            {!!selected?.absent?.length && (
              <p className="wc-offwheel">Off this spin: {selected.absent.map((person) => person.name).join(', ')}</p>
            )}

            {admin && (
              <button
                type="button"
                className="btn-brand wc-spin"
                onClick={spin}
                disabled={!adminReady || spinning || slices.length === 0 || !data.storageReady}
                ref={spinBtnRef}
                aria-describedby={noteId}
              >
                {spinning ? 'Spinning' : slices.length && selected ? `Spin ${selected.label}` : 'Nothing to spin'}
              </button>
            )}
            {admin && !data.storageReady && (
              <p className="wc-save-error">Drawing storage is not configured.</p>
            )}
          </div>
        </section>

        {showPastBoard && (
          <section className="wc-block" aria-label={`${selected.label} field`}>
            <h3 className="wc-h3">{selected.label} field</h3>
            <p className="wc-sub">
              No recorded winner. This is the board the wheel is using.
            </p>
            <TallyList tally={selected.tally} total={selectedTotal} absentIds={absentIds} />
          </section>
        )}

        <section className="wc-block" id="tally">
          <span className="wc-eyebrow">This month</span>
          <h2 className="wc-h2">Running tally</h2>
          <p className="wc-sub">
            {current ? current.label : 'This month'}, sorted by points. Ties keep the same rank.
            {showPastBoard ? ' This stays on the live month, even if the wheel is on another one.' : ''}
          </p>
          {data.updatedLabel && (
            <p className="wc-updated">Updated {data.updatedLabel}.</p>
          )}

          <h3 className="wc-h3">Point values</h3>
          <ul className="wc-legend">
            {data.tiers.map((tier) => (
              <li className="wc-legend__item" key={tier.topic}>
                <span>{tier.topic}</span>
                <span className="wc-legend__pts">{tier.points}</span>
              </li>
            ))}
          </ul>

          <TallyList tally={current?.tally || []} total={currentTotal} absentIds={currentAbsentIds} />
        </section>

        <section className="wc-block" id="history">
          <span className="wc-eyebrow">On the books</span>
          <h2 className="wc-h2">Winner history</h2>
          <p className="wc-sub">
            January 2025 through now. If we never called a winner, it says Unknown.
          </p>
          <ol className="wc-hist">
            {history.map((month) => {
              const year = month.month.slice(0, 4);
              const showYear = year !== historyYear;
              historyYear = year;
              return (
                <li key={month.month} className="wc-hist__item">
                  {showYear && <div className="wc-year">{year}</div>}
                  <div className="wc-hist__row">
                    <span className="wc-hist__month">{month.label}</span>
                    {month.winner ? (
                      <span className="wc-hist__who">
                        <Avatar name={month.winner.name} url={month.winner.avatarUrl} size={36} />
                        {month.winner.sourceUrl ? (
                          <a
                            href={month.winner.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Winner announcement"
                          >
                            {month.winner.name}
                          </a>
                        ) : (
                          <span>{month.winner.name}</span>
                        )}
                      </span>
                    ) : (
                      <span className="wc-hist__unknown">Unknown</span>
                    )}
                  </div>
                  {drawingLine(month) && <p className="wc-drawlog">{drawingLine(month)}</p>}
                </li>
              );
            })}
          </ol>
        </section>
      </main>

      {winner && selected && (
        <WinnerModal
          winner={winner}
          selected={selected}
          months={months}
          total={total}
          billsOn={billsOn}
          saving={saving}
          saveError={saveError}
          storageReady={data.storageReady}
          dialogRef={dialogRef}
          onAbsent={() => record('absent')}
          onFinal={() => record('final')}
        />
      )}
    </>
  );
}
