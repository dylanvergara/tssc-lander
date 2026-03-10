'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // One-time smooth fade-in on scroll — no dimming, no flicker
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );

    els.forEach(el => obs.observe(el));

    // Buttons bounce when they enter viewport
    const btns = document.querySelectorAll('.btn-brand');
    const btnObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transform = 'scale(1.05)';
          setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 400);
          btnObs.unobserve(e.target);
        }
      }),
      { threshold: 0.5 }
    );
    btns.forEach(btn => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s';
      btnObs.observe(btn);
    });

    return () => { obs.disconnect(); btnObs.disconnect(); };
  }, []);

  return null;
}
