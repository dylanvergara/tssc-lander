'use client';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Member Interviews',   href: '#carousel-1' },
  { label: 'About Dylan',         href: '#about' },
  { label: 'The Process',         href: '#process' },
  { label: 'More Interviews',     href: '#carousel-2' },
  { label: 'The Difference',      href: '#differentiator' },
  { label: 'Social Proof',        href: '#proof' },
  { label: 'Our Mission',         href: '#mission' },
  { label: 'Even More Interviews',href: '#carousel-3' },
  { label: 'We Win When You Win', href: '#wins' },
  { label: 'The Community',       href: '#events' },
  { label: 'Our Team',            href: '#team' },
  { label: "We're Here to Stay",  href: '#longevity' },
  { label: 'More Member Wins',    href: '#carousel-4' },
  { label: 'FAQ',                 href: '#faq' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="header">
        <img src="/images/logo-white-bg.png" alt="The Serial Sales Community" className="header__logo" />
        <button
          className={`hamburger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Dropdown overlay */}
      {open && (
        <div className="nav-overlay" onClick={() => setOpen(false)}>
          <nav className="nav-menu" onClick={e => e.stopPropagation()}>
            {NAV_LINKS.map(link => (
              <button key={link.href} className="nav-item" onClick={() => handleNav(link.href)}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
