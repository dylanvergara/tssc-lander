'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Fix 9: Sections fade in AND fade out as scrolled past
    const sections = document.querySelectorAll('section');
    const sectionObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        } else {
          e.target.style.opacity = '0.15';
          e.target.style.transform = 'translateY(8px)';
        }
      }),
      { threshold: 0.08 }
    );
    sections.forEach(s => {
      s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      sectionObs.observe(s);
    });

    // Reveal elements (existing behaviour — one-time fade in)
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

    // Fix 10: Buttons scale up when they enter the viewport
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
