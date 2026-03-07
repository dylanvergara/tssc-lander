'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Nav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="/" className="nav__logo">
          <Image
            src="/images/logo-white-bg.png"
            alt="The Serial Sales Community"
            width={160}
            height={40}
            className="nav__logo-img"
            priority
          />
        </a>

        <button
          className={`nav__hamburger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav__links${open ? ' is-open' : ''}`}>
          {data.nav.links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav__cta btn btn--primary"
              onClick={() => setOpen(false)}
            >
              {data.ctaText}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
