'use client';
import { useState, useRef, useEffect } from 'react';
import { siteData } from '../data/content.js';
import useEdgeHoverScroll from './useEdgeHoverScroll';

function flattenInterviewVideos(data) {
  const carousels = data?.testimonialCarousels || siteData.testimonialCarousels || [];
  return carousels.flatMap((carousel) => carousel.videos || []);
}

const FAQS = [
  { q: 'Do I need a sales background?',                     a: "No, just manageable expectations. We've helped people with zero experience and people with 20 years. Both have gotten results they were satisfied with." },
  { q: 'Can I do this part-time?',                          a: 'Yes. Part-time roles are harder to find than full-time, but they exist. We have many members currently doing this part-time.' },
  { q: 'Can I do this from anywhere?',                      a: "Yes. Some companies prefer US-based reps, but that's typically a preference, not a hard requirement." },
  { q: 'What do realistic results look like?',              a: "A realistic result is landing a quality role with earning potential that matches where you're starting from. Setter experience gets setter income. Closer experience gets closer income." },
  { q: "What's your guarantee?",                            a: "We don't offer income guarantees. If you do what's required and don't get a legitimate offer, Dylan works with you one-on-one daily until you do." },
  { q: 'How much does the community cost?',                 a: "It's not free and not cheap. We have several packages based on your goals. If approved, we can split the membership across manageable installments (sometimes as low as $250/mo if in the US and 18+). Book a call to go over the options." },
  { q: 'Do you offer payment plans?',                       a: "Yes, when needed. Both internally managed and via third party financing, some options around ~250/mo if you're in the US and 18+" },
  { q: 'How long does it take to get started?',             a: "Our intake call is 45 minutes and onboarding takes about 15. You'll be on a one-on-one with your client success manager within 24 to 48 business hours." },
  { q: 'Why should I work with you versus somebody else?',  a: 'Better results, more consistency, and a truly custom-fit process. We are a white glove service. Your success is our success.' },
  { q: "What if it doesn't work?",                          a: "Sales jobs on the internet do work. If it doesn't work, you didn't make it work. Our job isn't to convince you the opportunity exists. It's to help people who already know it does." },
  { q: 'How do I get started?',                             a: "Book a call on this page. Show up on time, from a quiet space, with good Wi-Fi and something to take notes with. If it's a fit, we'll discuss onboarding and next steps on the call." },
];

function VideoCard({ vid }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${vid.videoId}/maxresdefault.jpg`);
  return (
    <div className="short-card">
      <div className="short-card__text">
        <p className="short-card__label">{vid.label}</p>
        <p className="short-card__sub">{vid.sub}</p>
      </div>
      <div className="short-card__video" onClick={() => !playing && setPlaying(true)}>
        {playing ? (
          <iframe src={`https://www.youtube.com/embed/${vid.videoId}?autoplay=1&rel=0&modestbranding=1`} allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          <>
            <img
                src={thumb}
                alt={vid.label}
                onError={() => {
                  const hq = `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`;
                  if (thumb !== hq) setThumb(hq);
                }}
                onLoad={(e) => {
                  const hq = `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`;
                  if (e.currentTarget.naturalWidth <= 120 && thumb !== hq) setThumb(hq);
                }}
              />
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
      <div className="short-faq-a"><p>{item.a}</p></div>
    </div>
  );
}

export default function ShortMain({ data }) {
  const formRef = useRef(null);
  const carouselWrapRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const videos = flattenInterviewVideos(data);
  useEdgeHoverScroll(carouselWrapRef, carouselTrackRef);

  const [formOpen, setFormOpen] = useState(false);

  const handleApply = () => {
    setFormOpen(true);
  };

  // Once formOpen flips to true, the div mounts — then trigger tf.load()
  // so Typeform scans the newly-mounted div even if the script already ran
  useEffect(() => {
    if (!formOpen) return;
    const timer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // Load Typeform script if not yet present
      if (!document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')) {
        const s = document.createElement('script');
        s.src = '//embed.typeform.com/next/embed.js';
        s.async = true;
        document.body.appendChild(s);
      } else if (window.tf && typeof window.tf.load === 'function') {
        // Script already loaded — re-scan DOM for new data-tf-live divs
        window.tf.load();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [formOpen]);

  return (
    <>
      <section className="short-main">
        <div className="short-section-divider" />
        <div className="short-main__header">
          <p className="short-main__eyebrow">Don't take our word for it</p>
          <h2 className="short-main__title">Here's over 45x $10k/mo+ interviews with TSSC Members</h2>
          <p className="short-main__sub">Swipe through full-length 1-1 interviews from members.</p>
        </div>
        <div className="short-carousel-outer" ref={carouselWrapRef}>
          <div className="short-carousel-track" ref={carouselTrackRef}>
            {videos.map(vid => <VideoCard key={vid.id} vid={vid} />)}
            <div style={{ flexShrink: 0, width: '16px' }} />
          </div>
        </div>
        <div className="short-swipe-hint"><span>SWIPE TO SEE MORE</span></div>
      </section>

      <section className="short-faq-section">
        <div className="short-section-divider" />
        <div className="short-main__header">
          <h2 className="short-main__title">Frequently Asked Questions</h2>
          <p className="short-main__sub">You might have some questions, we've got answers. Here are some that we get pretty often.</p>
        </div>
        <div className="short-faq-wrap">
          <div className="short-faq-list">
            {FAQS.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
        </div>
        <div className="short-final-cta">
          {!formOpen && (
            <button className="short-hero__cta" onClick={handleApply}>
              Learn More About TSSC
            </button>
          )}
          <div ref={formRef} className={`short-inline-form${formOpen ? ' is-open' : ''}`}>
            {formOpen && (
              <div className="short-inline-form__inner">
                <div data-tf-live="01KS3F4MKYJNQVE001P2WDFX49" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
