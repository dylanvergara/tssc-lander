'use client';

import { useEffect, useRef } from 'react';

const PX_PER_SEC = 96;
const SLOW_RATE = 0.28;
const RESUME_MS = 900;

function JobRows({ jobs, copy, hidden }) {
  return jobs.map((job, i) => (
    <li key={`${copy}-${i}`} className="short-jobs-row" aria-hidden={hidden || undefined}>
      <span className="short-jobs-role">{job.role}</span>
      <span className="short-jobs-ote">{job.ote}</span>
      <span className="short-jobs-niche">{job.niche}</span>
    </li>
  ));
}

export default function HiringChannel({ jobs, onApply, formOpen }) {
  const viewportRef = useRef(null);
  const copyRef = useRef(null);
  const innerRef = useRef(null);
  const resumeTimer = useRef(0);
  const rateRef = useRef(1);

  const applyRate = (rate) => {
    rateRef.current = rate;
    const inner = innerRef.current;
    if (!inner) return;
    inner.getAnimations().forEach((anim) => {
      anim.playbackRate = rate;
    });
  };

  useEffect(() => {
    const copy = copyRef.current;
    const inner = innerRef.current;
    if (!copy || !inner) return;
    const height = copy.offsetHeight;
    if (!height) return;
    inner.style.setProperty('--short-jobs-duration', `${Math.max(40, height / PX_PER_SEC)}s`);
    requestAnimationFrame(() => applyRate(rateRef.current));
  }, [jobs]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return undefined;

    const slow = () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = 0;
      }
      applyRate(SLOW_RATE);
    };

    const resumeSoon = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        applyRate(1);
        resumeTimer.current = 0;
      }, RESUME_MS);
    };

    const isolate = (e) => {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    };

    const onWheel = (e) => {
      isolate(e);
      slow();
      resumeSoon();
    };

    const onEnter = () => slow();
    const onLeave = () => resumeSoon();
    const onTouchStart = () => slow();
    const onTouchMove = isolate;
    const onTouchEnd = () => resumeSoon();
    const onFocusIn = () => slow();
    const onFocusOut = (e) => {
      if (!viewport.contains(e.relatedTarget)) resumeSoon();
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', onTouchEnd, { passive: true });
    viewport.addEventListener('touchcancel', onTouchEnd, { passive: true });
    viewport.addEventListener('focusin', onFocusIn);
    viewport.addEventListener('focusout', onFocusOut);

    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('touchcancel', onTouchEnd);
      viewport.removeEventListener('focusin', onFocusIn);
      viewport.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <section className="short-jobs-section" aria-labelledby="short-jobs-title">
      <div className="short-section-divider" />
      <div className="short-main__header">
        <p className="short-main__eyebrow">Our Hiring Channel</p>
        <h2 id="short-jobs-title" className="short-main__title">
          8,081 1099 WFH sales gigs sourced<br />
          over the last 12mos.&nbsp;23/day on avg.
        </h2>
        <p className="short-main__sub">
          Here&apos;s a peek inside at real roles from our hiring channel. You&apos;ll find the role, type, OTE, and niche below.
        </p>
      </div>
      <div className="short-jobs-frame">
        <div className="short-jobs-cols" aria-hidden="true">
          <span>Type</span>
          <span>OTE</span>
          <span>Niche</span>
        </div>
        <div ref={viewportRef} className="short-jobs-viewport">
          <div
            ref={innerRef}
            className="short-jobs-marquee"
            tabIndex={0}
            role="region"
            aria-label="Scrolling hiring channel roles by type, OTE, and niche"
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
      <p className="short-main__sub short-jobs-note">
        These roles are sourced through a combination of recruiters and sales agencies, Dylan&apos;s personal network, inbound requests through social media, public posts, members inside who are managing or selling directly for these teams, and more.
      </p>
      {!formOpen && (
        <div className="short-jobs-cta">
          <button type="button" className="short-hero__cta" onClick={onApply}>
            Get Access to Daily Job Flow
          </button>
        </div>
      )}
    </section>
  );
}
