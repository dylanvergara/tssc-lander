'use client';

import { useEffect, useRef } from 'react';

const PX_PER_SEC = 28;
const RESUME_MS = 1400;

function JobRows({ jobs, copy, hidden }) {
  return jobs.map((job, i) => (
    <li key={`${copy}-${i}`} className="short-jobs-row" aria-hidden={hidden || undefined}>
      <span className="short-jobs-role">{job.role}</span>
      <span className="short-jobs-ote">{job.ote}</span>
      <span className="short-jobs-niche">{job.niche}</span>
    </li>
  ));
}

export default function HiringChannel({ jobs, jobsPerDay }) {
  const trackRef = useRef(null);
  const copyRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let last = performance.now();
    let raf = 0;
    let startY = 0;

    const loopHeight = () => copyRef.current?.offsetHeight || 0;

    const wrap = () => {
      const height = loopHeight();
      if (!height) return;
      if (track.scrollTop >= height) {
        track.scrollTop -= height;
      }
    };

    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = 0;
      }
    };

    const resumeSoon = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        pausedRef.current = false;
        resumeTimer.current = 0;
      }, RESUME_MS);
    };

    const tick = (now) => {
      if (!reduceMotion.matches && !pausedRef.current) {
        const dt = Math.min(48, now - last);
        track.scrollTop += (PX_PER_SEC * dt) / 1000;
        wrap();
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onWheel = (e) => {
      pause();
      e.stopPropagation();
      const max = track.scrollHeight - track.clientHeight;
      const next = track.scrollTop + e.deltaY;
      if (max <= 0 || next <= 0 || next >= max) {
        e.preventDefault();
      }
      requestAnimationFrame(wrap);
      resumeSoon();
    };

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      pause();
    };

    const onTouchMove = (e) => {
      e.stopPropagation();
      const dy = e.touches[0].clientY - startY;
      const atTop = track.scrollTop <= 0;
      const atBottom = track.scrollTop + track.clientHeight >= track.scrollHeight - 1;
      if ((atTop && dy > 0) || (atBottom && dy < 0)) {
        e.preventDefault();
      }
    };

    const onTouchEnd = () => resumeSoon();

    const onPointerEnter = (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === '') pause();
    };

    const onPointerLeave = (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === '') resumeSoon();
    };

    const onFocusIn = () => pause();
    const onFocusOut = (e) => {
      if (!track.contains(e.relatedTarget)) resumeSoon();
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd, { passive: true });
    track.addEventListener('touchcancel', onTouchEnd, { passive: true });
    track.addEventListener('pointerenter', onPointerEnter);
    track.addEventListener('pointerleave', onPointerLeave);
    track.addEventListener('focusin', onFocusIn);
    track.addEventListener('focusout', onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      track.removeEventListener('wheel', onWheel);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
      track.removeEventListener('touchcancel', onTouchEnd);
      track.removeEventListener('pointerenter', onPointerEnter);
      track.removeEventListener('pointerleave', onPointerLeave);
      track.removeEventListener('focusin', onFocusIn);
      track.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <section className="short-jobs-section" aria-labelledby="short-jobs-title">
      <div className="short-section-divider" />
      <div className="short-main__header">
        <p className="short-main__eyebrow">Hiring channel</p>
        <h2 id="short-jobs-title" className="short-main__title">
          {jobsPerDay} jobs per day average over the last 12 months. Here&apos;s a peek inside our hiring channel
        </h2>
        <p className="short-main__sub">Role, OTE, and niche from the live channel.</p>
      </div>
      <div className="short-jobs-frame">
        <div className="short-jobs-cols" aria-hidden="true">
          <span>Role</span>
          <span>OTE</span>
          <span>Niche</span>
        </div>
        <div className="short-jobs-viewport">
          <div
            ref={trackRef}
            className="short-jobs-track"
            tabIndex={0}
            role="region"
            aria-label="Scrolling hiring channel roles"
          >
            <ul className="short-jobs-list" ref={copyRef}>
              <JobRows jobs={jobs} copy="a" />
            </ul>
            <ul className="short-jobs-list" aria-hidden="true">
              <JobRows jobs={jobs} copy="b" hidden />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
