'use client';
import { useState } from 'react';

const ALL_VIDEOS = [
  { id: 1,  label: '$54k commission month at 24',              sub: 'Before: Door-to-Door Food Sales',      videoId: 'cIKgkBmLNeg' },
  { id: 2,  label: '$38k month, $20-30k sustained',            sub: 'Before: Real Estate Sales',            videoId: '0qkQzPdb40s' },
  { id: 3,  label: 'Quit corporate, commissions > salary',     sub: 'Before: Corporate Tech SDR',           videoId: 'mEhWcYqac-U' },
  { id: 4,  label: '$30-40k/mo, zero prior experience',        sub: 'Before: Missionary',                   videoId: 'ej2TCqn-FbA' },
  { id: 5,  label: '$30k/mo before turning 21',                sub: 'Before: Corporate Insurance SDR',      videoId: '07r72x6zNz0' },
  { id: 6,  label: '$10k month from Portugal in month 3',      sub: 'Before: Engineering Student',          videoId: 'IgIlHG82HRc' },
  { id: 7,  label: '$30k in first 90 days',                    sub: 'Before: Agency and Business Owner',    videoId: 'l5A5vnW7n_o' },
  { id: 8,  label: '$14,800 month from home',                  sub: 'Before: Solar Door-to-Door',           videoId: 'u5Jt-M2BYmo' },
  { id: 9,  label: '$12k month, 5x ROI in 6 months',           sub: 'Before: Corporate Finance',            videoId: '0EJvocphe1E' },
  { id: 10, label: '$25k/mo closing, kept his W2',             sub: 'Before: Tech SDR (Cybersecurity)',     videoId: '8bJ2Jq-n1k4' },
  { id: 11, label: '$15k/mo remote closing',                   sub: 'Before: Roofing and Construction',     videoId: 'UA3N3ulXwzQ' },
  { id: 12, label: '$11.5k month + $50k base role',            sub: 'Before: Pipe Fitter',                  videoId: 'EnAfMcCT-gg' },
  { id: 13, label: '10x ROI setting remotely',                 sub: 'Before: Public Speaker / Agency',      videoId: '8ZSGY5P14j8' },
  { id: 14, label: 'Consistent 5-figure months at 22',         sub: 'Before: Day Trading and Reselling',    videoId: 'M7SDqaGnCuk' },
  { id: 15, label: '$18k month from NYC',                      sub: 'Before: Corporate SDR Team Lead',      videoId: 'XfmfnANJ8vc' },
  { id: 16, label: '$10k/mo setting from his phone',           sub: 'Before: Warehouse Worker',             videoId: 'w3DoRxHNzBs' },
  { id: 17, label: '$270k/mo in revenue from Spain',           sub: 'Before: SaaS Account Executive',       videoId: '6Eu62BkCI7U' },
  { id: 18, label: '$10k/mo DM closing, runs passively',       sub: 'Before: Solar Door-to-Door',           videoId: '8y1L6JnZu5k' },
  { id: 19, label: '$10k/mo setting, $1.3M+ booked',           sub: 'Before: D1 Football / Manual Labor',   videoId: 'VcIFitTDRLE' },
  { id: 20, label: '6 figures, doubled co. to $1M/mo',         sub: 'Before: Corporate Healthcare',         videoId: 'LRhqJEXoOZ4' },
  { id: 21, label: '$8-14k/mo for an offer he loves',          sub: 'Before: Solar Sales',                  videoId: 'o_-dztM0OLA' },
  { id: 22, label: '$13.3k/mo at 19, still in college',        sub: 'Before: Marketing Agency',             videoId: 'tBJTAuwHkFw' },
  { id: 23, label: '$15k/mo on 3-4 calls a day',               sub: 'Before: Bank Teller / Gym Trainer',    videoId: 'H-1BVXB-vtQ' },
  { id: 24, label: '$10k/mo within 60 days',                   sub: 'Before: Corporate Home Security',      videoId: 'CZ3ZZ_i_vmo' },
  { id: 25, label: '$10k first month after quitting job',      sub: 'Before: Bank Teller / Failed Ecom',    videoId: 'tn-kzQohbhU' },
  { id: 26, label: '$10k/mo as a setter',                      sub: 'Before: Pizza Delivery Driver',        videoId: 'WlA8HHM9_Zs' },
  { id: 27, label: '$13k/mo by month two',                     sub: 'Before: Hospitality Management',       videoId: 'vHqWjtq4CVE' },
  { id: 28, label: '$10k/mo in 90 days, role in 3 weeks',      sub: 'Before: Biomedical Engineer',          videoId: 'N_i2wRgC5EU' },
  { id: 29, label: '$200k first year, $17k by month 3',        sub: 'Before: Tax Resolution Sales',         videoId: '1Wq1FSPYm5Q' },
  { id: 30, label: '$10k part-time, 10x ROI in 4 months',      sub: 'Before: Software Sales SDR',           videoId: 'n74DuGv-dSg' },
  { id: 31, label: 'Top setter to closer, launched own brand', sub: 'Before: Email Marketer / Agency',      videoId: 'RH1tLrZeXqE' },
  { id: 32, label: '$5-7k/mo from Maldives, $1M+ in sets',     sub: 'Before: High School Student',          videoId: 'LS2UzFdwTJE' },
  { id: 33, label: '$1k+ commission days traveling US & Canada',sub: 'Before: Remote Entertainment Sales',  videoId: 'pqkm1Pau9LY' },
  { id: 34, label: '$5k/mo working just 7 hours a week',       sub: 'Before: Active Duty Military',         videoId: 'Lcwj3WlIQO8' },
  { id: 35, label: 'Doubled income through remote closing',    sub: 'Before: Corporate Account Management', videoId: 'iDchGIpIH24' },
  { id: 36, label: 'Consistent $10k/mo as a triage setter',   sub: 'Before: Watch Reseller',               videoId: '3bCy4fuABSs' },
  { id: 37, label: '$6-10k/mo setting with a $3k base',        sub: 'Before: Real Estate Marketing',        videoId: 'ncLVggg5N_c' },
  { id: 38, label: 'Landed closing role within 5 days',        sub: 'Before: SDR / Closer Abroad',          videoId: 'TXjOXmzzj6o' },
  { id: 39, label: '$18k/mo closing remotely from Turkey',     sub: 'Before: Basketball / Freelance Mktg',  videoId: 'ignIURf-G-k' },
  { id: 40, label: '6-figure remote role within one week',     sub: 'Before: Personal Trainer / Retail',    videoId: 'Zohndt8yRTI' },
];

const FAQS = [
  { q: 'Do I need a sales background?',                     a: 'No, just manageable expectations. We\'ve helped people with zero experience and people with 20 years. Both have gotten results they were satisfied with.' },
  { q: 'Can I do this part-time?',                          a: 'Yes. Part-time roles are harder to find than full-time, but they exist. We have many members currently doing this part-time.' },
  { q: 'Can I do this from anywhere?',                      a: 'Yes. Some companies prefer US-based reps, but that\'s typically a preference, not a hard requirement.' },
  { q: 'What do realistic results look like?',              a: 'A realistic result is landing a quality role with earning potential that matches where you\'re starting from. Setter experience gets setter income. Closer experience gets closer income.' },
  { q: 'What\'s your guarantee?',                           a: 'We don\'t offer income guarantees. If you do what\'s required and don\'t get a legitimate offer, Dylan works with you one-on-one daily until you do.' },
  { q: 'How much does the community cost?',                 a: 'It\'s not free and not cheap. We have several packages based on your goals. If approved, we can split membership into sub-$200 monthly installments. Book a call to go over the options.' },
  { q: 'Do you offer payment plans?',                       a: 'Yes, both internally managed and through third parties, with some options under $200 per month.' },
  { q: 'How long does it take to get started?',             a: 'Our intake call is 45 minutes and onboarding takes about 15. You\'ll be on a one-on-one with your client success manager within 24 to 48 business hours.' },
  { q: 'Why should I work with you versus somebody else?',  a: 'Better results, more consistency, and a truly custom-fit process. We are a white glove service. Your success is our success.' },
  { q: 'What if it doesn\'t work?',                         a: 'Sales jobs on the internet do work. If it doesn\'t work, you didn\'t make it work. Our job isn\'t to convince you the opportunity exists. It\'s to help people who already know it does.' },
  { q: 'How do I get started?',                             a: 'Book a call on this page. Show up on time, from a quiet space, with good Wi-Fi and something to take notes with. If it\'s a fit, we\'ll discuss onboarding and next steps on the call.' },
];

function VideoCard({ vid }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${vid.videoId}/maxresdefault.jpg`;
  return (
    <div className="short-card">
      <div className="short-card__text">
        <p className="short-card__label">{vid.label}</p>
        <p className="short-card__sub">{vid.sub}</p>
      </div>
      <div className="short-card__video" onClick={() => !playing && setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${vid.videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <img src={thumb} alt={vid.label} />
            <div className="short-card__play">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`short-faq-item${open ? ' is-open' : ''}`}>
      <button className="short-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{item.q}</span>
        <span className="short-faq-icon">+</span>
      </button>
      <div className="short-faq-a">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function ShortMain({ data }) {
  const { ctaUrl } = data;
  return (
    <section className="short-main">
      <div className="short-section-divider" />

      {/* Section title */}
      <div className="short-main__header">
        <p className="short-main__eyebrow">Don't take our word for it</p>
        <h2 className="short-main__title">Results & FAQs</h2>
        <p className="short-main__sub">Swipe through 40 member interviews, then get your questions answered below.</p>
      </div>

      {/* Single carousel — all 40 videos */}
      <div className="short-carousel-outer">
        <div className="short-carousel-track">
          {ALL_VIDEOS.map(vid => (
            <VideoCard key={vid.id} vid={vid} />
          ))}
          <div style={{ flexShrink: 0, width: '16px' }} />
        </div>
      </div>

      <div className="short-swipe-hint">
        <span>SWIPE TO SEE MORE</span>
      </div>

      {/* Divider */}
      <div className="short-divider" />

      {/* FAQ */}
      <div className="short-faq-wrap">
        <div className="short-faq-list">
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="short-final-cta">
        <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="short-hero__cta">
          Apply to Join TSSC
        </a>
      </div>
    </section>
  );
}
