'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Section fade only — NO transform (transform breaks sticky header z-index)
    const sections = document.querySelectorAll('main section, main > div');
    const sectionObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
        } else {
          e.target.style.opacity = '0.6';
        }
      }),
      { threshold: 0.05, rootMargin: '-5% 0px -5% 0px' }
    );
    sections.forEach(s => {
      s.style.transition = 'opacity 0.8s ease';
      sectionObs.observe(s);
    });

    // Reveal elements (one-time fade-in on scroll)
    const els = document.querySelectorAll('.reveal');
    if (els.length) {
      const revealObs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      );
      els.forEach(el => revealObs.observe(el));
    }

    // Buttons scale up when they enter viewport
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

    return () => {
      sectionObs.disconnect();
      btnObs.disconnect();
    };
  }, []);

  return null;
}
