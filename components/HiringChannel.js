'use client';

import { useEffect, useRef, useState } from 'react';

const PX_PER_SEC = 36;
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
  const viewportRef = useRef(null);
  const copyRef = useRef(null);
  const innerRef = useRef(null);
  const resumeTimer = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const copy = copyRef.current;
    const inner = innerRef.current;
    if (!copy || !inner) return;
    const height = copy.offsetHeight;
    if (!height) return;
    inner.style.setProperty('--short-jobs-duration', `${Math.max(80, height / PX_PER_SEC)}s`);
  }, [jobs]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const pause = () => {
      setPaused(true);
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = 0;
      }
    };

    const resumeSoon = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        setPaused(false);
        resumeTimer.current = 0;
      }, RESUME_MS);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const isolate = (e) => {
      e.stopPropagation();
      if (!reduceMotion.matches && e.cancelable) e.preventDefault();
    };

    const onWheel = (e) => {
      isolate(e);
      if (!reduceMotion.matches) {
        pause();
        resumeSoon();
      }
    };

    const onTouchStart = () => pause();
    const onTouchMove = isolate;
    const onTouchEnd = () => resumeSoon();

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', onTouchEnd, { passive: true });
    viewport.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('touchcancel', onTouchEnd);
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
        <div
          ref={viewportRef}
          className={`short-jobs-viewport${paused ? ' is-paused' : ''}`}
        >
          <div
            ref={innerRef}
            className="short-jobs-marquee"
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
