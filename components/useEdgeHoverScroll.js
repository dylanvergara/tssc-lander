'use client';
import { useEffect } from 'react';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export default function useEdgeHoverScroll(wrapRef, trackRef) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const fine = window.matchMedia(FINE_POINTER);
    let dir = 0;
    let intensity = 0;
    let raf = 0;
    let pressed = false;

    const stop = () => {
      dir = 0;
      intensity = 0;
      track.style.scrollSnapType = '';
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const tick = () => {
      if (!dir || pressed || !fine.matches) {
        raf = 0;
        track.style.scrollSnapType = '';
        return;
      }
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) {
        stop();
        return;
      }
      const speed = 2.4 + 16 * Math.min(1, Math.max(0, intensity));
      const next = track.scrollLeft + dir * speed;
      track.scrollLeft = Math.max(0, Math.min(max, next));
      if ((dir < 0 && track.scrollLeft <= 0) || (dir > 0 && track.scrollLeft >= max - 1)) {
        stop();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const updateFromX = (clientX) => {
      if (!fine.matches || pressed) {
        stop();
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const zone = Math.min(140, Math.max(72, rect.width * 0.14));
      const x = clientX - rect.left;
      if (x >= 0 && x < zone) {
        dir = -1;
        intensity = 1 - x / zone;
        track.style.scrollSnapType = 'none';
        if (!raf) raf = requestAnimationFrame(tick);
      } else if (x > rect.width - zone && x <= rect.width) {
        dir = 1;
        intensity = (x - (rect.width - zone)) / zone;
        track.style.scrollSnapType = 'none';
        if (!raf) raf = requestAnimationFrame(tick);
      } else {
        stop();
      }
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      updateFromX(e.clientX);
    };
    const onLeave = () => stop();
    const onDown = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      pressed = true;
      stop();
    };
    const onUp = () => { pressed = false; };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      stop();
    };
  }, [wrapRef, trackRef]);
}
