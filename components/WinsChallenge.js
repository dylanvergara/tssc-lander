'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  activeTally,
  canSpin,
  drawingLine,
  expandEntries,
  fallbackColor,
  formatShare,
  initials,
  landingRotation,
  layoutEqualSlices,
  memberStory,
  pointWord,
  withRanks,
} from '../lib/wins-format';

const ADMIN_STORAGE = 'tssc-wins-admin-key';
const MUTE_STORAGE = 'tssc-wins-mute';

const WHEEL_COLORS = [
  { fill: '#1F7FBF', text: '#ffffff' },
  { fill: '#F4C95D', text: '#1A1408' },
  { fill: '#2EC4B6', text: '#08211E' },
  { fill: '#F7FBFE', text: '#10202c' },
  { fill: '#0E4C73', text: '#ffffff' },
  { fill: '#F08A5D', text: '#2A1208' },
  { fill: '#8FD3F4', text: '#10202c' },
  { fill: '#2F6F4E', text: '#ffffff' },
  { fill: '#FFE8A3', text: '#2A2208' },
  { fill: '#3D4F9F', text: '#ffffff' },
];

function colorFor(id) {
  const text = String(id || '');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) hash = (hash * 33 + text.charCodeAt(index)) >>> 0;
  return WHEEL_COLORS[hash % WHEEL_COLORS.length];
}

function easeOutQuart(amount) {
  return 1 - ((1 - amount) ** 4);
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

  const hubRadius = radius * 0.2;
  slices.forEach((slice) => {
    const color = colorFor(slice.member.memberId);
    ctx.beginPath();
    if (slice.sweep >= Math.PI * 1.999) {
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    } else {
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, slice.start, slice.end);
      ctx.closePath();
    }
    ctx.fillStyle = color.fill;
    ctx.fill();
    if (slice.sweep < Math.PI * 1.999) {
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(slice.start) * hubRadius, cy + Math.sin(slice.start) * hubRadius);
      ctx.lineTo(cx + Math.cos(slice.start) * radius, cy + Math.sin(slice.start) * radius);
      ctx.strokeStyle = 'rgba(8, 16, 24, 0.45)';
      ctx.lineWidth = slices.length > 40 ? 1 : 1.6;
      ctx.stroke();
    }

    const arcWidth = slice.sweep * radius * 0.72;
    if (arcWidth < 13) return;
    const text = slice.member.name;
    const fontPx = Math.max(10, Math.min(20, Math.floor(arcWidth * 0.7)));
    ctx.font = `700 ${fontPx}px Montserrat, "DM Sans", sans-serif`;
    ctx.fillStyle = color.text;
    ctx.textBaseline = 'middle';
    const mid = slice.start + slice.sweep / 2;
    const norm = ((mid % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const onLeft = norm > Math.PI / 2 && norm < (Math.PI * 3) / 2;
    const outer = radius - 16;
    const maxWidth = outer - hubRadius - 10;
    if (ctx.measureText(text).width > maxWidth) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(onLeft ? mid + Math.PI : mid);
    ctx.textAlign = onLeft ? 'left' : 'right';
    ctx.fillText(text, onLeft ? -(outer - 8) : outer - 8, 0);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(182,205,222,0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, hubRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(16, 32, 44, 0.08)';
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
            <span className="wc-points__odds">
              {out
                ? 'Not present'
                : `${member.points} ${member.points === 1 ? 'entry' : 'entries'}, ${total > 0 ? formatShare(member.points, total) : '0%'} chance`}
            </span>
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
  winner, selected, months, total, billsOn, saving, saveError, canRecord, dialogRef, onAbsent, onFinal, onSpinAgain, onClose,
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
          {canRecord ? (
            <>
              <p className="wc-modal__save">Save the official result</p>
              <button type="button" className="wc-btn-ghost" onClick={onAbsent} disabled={saving}>
                {saving ? 'Saving' : 'Not present - spin again'}
              </button>
              <button type="button" className="btn-brand" onClick={onFinal} disabled={saving}>
                {saving ? 'Saving' : 'Final winner'}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn-brand" onClick={onSpinAgain}>Spin again</button>
              <button type="button" className="wc-btn-ghost" onClick={onClose}>Close</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WinsChallenge({ data }) {
  const selectId = useId();
  const [months, setMonths] = useState(data.months);
  const monthOptions = useMemo(() => {
    return [...months]
      .filter((month) => (month.tally || []).length > 0 || month.month === data.nowMonth)
      .sort((a, b) => b.month.localeCompare(a.month));
  }, [months, data.nowMonth]);
  const openMonths = useMemo(
    () => monthOptions.filter((month) => canSpin(month)),
    [monthOptions],
  );
  const initialMonth = openMonths.some((month) => month.month === data.nowMonth)
    ? data.nowMonth
    : (openMonths[0]?.month || data.nowMonth);

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
  const audioRef = useRef(null);
  const mutedRef = useRef(false);
  const rafRef = useRef(0);
  const tickIndexRef = useRef(-1);
  adminRef.current = admin;
  mutedRef.current = muted;

  const selected = months.find((month) => month.month === monthKey) || null;
  const pool = useMemo(() => activeTally(selected), [selected]);
  const sortedEntries = useMemo(() => expandEntries(pool), [pool]);
  const [entryOrder, setEntryOrder] = useState(null);
  const [muted, setMuted] = useState(false);
  const entries = entryOrder || sortedEntries;
  const slices = useMemo(() => layoutEqualSlices(entries), [entries]);
  const total = pool.reduce((sum, member) => sum + member.points, 0);
  const history = useMemo(() => [...months].reverse(), [months]);
  const absentIds = useMemo(
    () => new Set((selected?.absent || []).map((person) => person.memberId)),
    [selected],
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

  useEffect(() => {
    setEntryOrder(null);
  }, [sortedEntries]);

  useLayoutEffect(() => {
    rotRef.current = 0;
    tickIndexRef.current = -1;
    const el = rotorRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform = 'rotate(0rad)';
  }, [monthKey]);

  useEffect(() => {
    const saved = window.localStorage.getItem(MUTE_STORAGE) === '1';
    setMuted(saved);
    mutedRef.current = saved;
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (!(event.metaKey || event.ctrlKey) || event.key !== 'Enter') return;
      const tag = event.target && event.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      event.preventDefault();
      spinRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

  function playTick() {
    if (mutedRef.current) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    if (!audioRef.current) audioRef.current = new Context();
    const ctx = audioRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 740;
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.028);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }

  function sliceUnderPointer(list, rotation) {
    if (!list.length) return -1;
    const twoPi = Math.PI * 2;
    const angle = ((0 - rotation) % twoPi + twoPi) % twoPi;
    for (let index = 0; index < list.length; index += 1) {
      const slice = list[index];
      const start = ((slice.start % twoPi) + twoPi) % twoPi;
      let delta = angle - start;
      if (delta < 0) delta += twoPi;
      if (delta < slice.sweep - 1e-8) return index;
    }
    return 0;
  }

  function nudgeWheel() {
    const el = rotorRef.current;
    if (!el || prefersReducedMotion()) return;
    const from = rotRef.current;
    const to = from + 0.85;
    const start = performance.now();
    const tick = (now) => {
      if (spinningRef.current) return;
      const amount = Math.min(1, (now - start) / 420);
      const angle = from + (to - from) * easeOutQuart(amount);
      el.style.transform = `rotate(${angle}rad)`;
      if (amount < 1) requestAnimationFrame(tick);
      else rotRef.current = to;
    };
    rotRef.current = to;
    requestAnimationFrame(tick);
  }

  function shuffleEntries() {
    if (spinningRef.current || entries.length < 2) return;
    const next = entries.slice();
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(cryptoRandom() * (index + 1));
      [next[index], next[swap]] = [next[swap], next[index]];
    }
    setEntryOrder(next);
    nudgeWheel();
  }

  function sortEntries() {
    if (spinningRef.current || !entryOrder) return;
    setEntryOrder(null);
    nudgeWheel();
  }

  function toggleMute() {
    setMuted((value) => {
      const next = !value;
      mutedRef.current = next;
      window.localStorage.setItem(MUTE_STORAGE, next ? '1' : '0');
      return next;
    });
  }

  function spin() {
    if (spinningRef.current || !slices.length || !selected) return;
    const random = cryptoRandom;
    const slice = slices[Math.floor(random() * slices.length)];
    const member = slice.member;
    const reduced = prefersReducedMotion();
    const duration = reduced ? 0 : 7000 + Math.floor(random() * 2500);
    const { next } = landingRotation({
      currentRotation: rotRef.current,
      slice,
      random,
      minTurns: reduced ? 0 : 5,
      maxExtraTurns: reduced ? 0 : 3,
    });
    const from = rotRef.current;
    rotRef.current = next;
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    spinningRef.current = true;
    setSpinning(true);
    setWinner(null);
    cancelAnimationFrame(rafRef.current);

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
      if (el) el.style.transform = `rotate(${next}rad)`;
      finish();
      return;
    }

    const started = performance.now();
    const frame = (now) => {
      if (tokenRef.current !== token) return;
      const amount = Math.min(1, (now - started) / duration);
      const angle = from + (next - from) * easeOutQuart(amount);
      el.style.transform = `rotate(${angle}rad)`;
      const under = sliceUnderPointer(slices, angle);
      if (under !== tickIndexRef.current) {
        tickIndexRef.current = under;
        playTick();
      }
      if (amount < 1) rafRef.current = requestAnimationFrame(frame);
      else finish();
    };
    rafRef.current = requestAnimationFrame(frame);
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
    ? `Prize wheel for ${selected.label}`
    : 'Prize wheel';
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
          <div className="wc-hero__wheel">
            <span className="wc-eyebrow">Wins Challenge</span>
            <h1 className="wc-h1">Spin the wheel</h1>
            <p className="wc-lead">Bigger slice, better odds.</p>
            {admin && <p className="wc-admin">Recording the official drawing</p>}
            {adminError && <p className="wc-save-error">{adminError}</p>}

            <label className="wc-select-label" htmlFor={selectId}>Month</label>
            <select
              id={selectId}
              className="wc-select"
              value={selected?.month || ''}
              disabled={spinning || monthOptions.length === 0}
              onChange={(event) => selectMonth(event.target.value)}
            >
              {monthOptions.map((month) => (
                <option key={month.month} value={month.month}>{month.label}</option>
              ))}
            </select>

            <div className="wc-stage" ref={stageRef} onClick={spin} role="presentation">
              <svg className="wc-pointer" viewBox="0 0 36 32" aria-hidden="true">
                <path d="M18 30 L2.5 6.5 Q18 0 33.5 6.5 Z" fill="#2BB3E0" stroke="#ffffff" strokeWidth="2.2" />
              </svg>
              <p className="wc-entries">{slices.length} {slices.length === 1 ? 'entry' : 'entries'}</p>
              <div className="wc-rotor" ref={rotorRef}>
                <canvas ref={canvasRef} role="img" aria-label={wheelLabel} />
              </div>
              <button
                type="button"
                className="wc-hub"
                onClick={spin}
                disabled={spinning || slices.length === 0}
                aria-label={spinning ? 'Spinning' : 'Spin'}
              >
                {spinning ? <span className="wc-hub__spinner" /> : 'Spin'}
              </button>
            </div>

            <div className="wc-tools">
              <button type="button" className="wc-tool" onClick={shuffleEntries} disabled={spinning || entries.length < 2}>Shuffle</button>
              <button type="button" className="wc-tool" onClick={sortEntries} disabled={spinning || !entryOrder}>Sort</button>
              <button type="button" className="wc-tool" onClick={toggleMute} aria-pressed={muted}>
                {muted ? 'Sound off' : 'Sound on'}
              </button>
            </div>

            <button
              type="button"
              className="btn-brand wc-spin"
              onClick={spin}
              disabled={spinning || slices.length === 0}
              ref={spinBtnRef}
            >
              {spinning ? 'Spinning' : 'Spin'}
            </button>
          </div>
        </section>

        <section className="wc-block" id="tally">
          <h2 className="wc-h2">This month&apos;s leaderboard</h2>
          <p className="wc-sub">{selected ? selected.label : 'This month'}. Sorted by entries.</p>
          <TallyList tally={selected?.tally || []} total={total} absentIds={absentIds} />

          <h3 className="wc-h3 wc-h3--legend">How points work</h3>
          <ul className="wc-legend">
            {data.tiers.map((tier) => (
              <li className="wc-legend__item" key={tier.topic}>
                <span>{tier.topic}</span>
                <span className="wc-legend__pts">{tier.points}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="wc-block" id="history">
          <h2 className="wc-h2">Past winners</h2>
          <p className="wc-sub">If we never called a winner, it says Unknown.</p>
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
          canRecord={admin && data.storageReady && selected && !selected.winner}
          dialogRef={dialogRef}
          onAbsent={() => record('absent')}
          onFinal={() => record('final')}
          onSpinAgain={() => { setWinner(null); setTimeout(spin, 40); }}
          onClose={() => setWinner(null)}
        />
      )}
    </>
  );
}
