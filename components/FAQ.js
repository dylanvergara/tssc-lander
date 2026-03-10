'use client';
import { useState } from 'react';

// All FAQ panels — 5 questions each, repeating content across panels
const ALL_FAQS = [
  { q: 'Do I need prior sales experience?',          a: "No. We take beginners and experienced reps alike. Our process works regardless of background. The most important thing is coachability and drive." },
  { q: 'What kind of roles do you help me get?',     a: "We focus exclusively on 1099 remote closing and setting roles for online businesses. High-ticket, inbound, work-from-anywhere positions." },
  { q: 'How quickly can I get placed?',              a: "Most members ideally land a role within 3-5 weeks. Some faster, some longer. It depends on how quickly you execute the process we give you." },
  { q: 'Is this a pyramid scheme or MLM?',           a: "Absolutely not. No licensing required, no buying inventory, no recruiting your family. Legitimate 1099 remote sales jobs with real companies." },
  { q: 'What does the daily community look like?',   a: "Active channels, weekly group calls, 1-1 touchpoints, job board access, deal reviews, and people all in the same pursuit. All in one place." },
  { q: 'What is the investment?',                    a: "Pricing is discussed on a call after your application is reviewed. We want to make sure TSSC is the right fit before talking numbers." },
  { q: 'What is your guarantee?',                    a: "If you meet all 5 criteria in our agreement, we guarantee an offer within 60 days. Of our last 100 high-ticket clients: zero refunds, zero chargebacks." },
  { q: 'Can I do this part-time?',                   a: "Yes. You only need about 3-4 hours per week to run our process and get results. Many members have juggled a W2 alongside a 1099 role." },
  { q: 'Can I do this from anywhere?',               a: "Yes, for the most part. Many members are in Europe, Australia, South America and beyond. Some companies prefer US time zones, most don't require it." },
  { q: 'What does realistic income look like?',      a: "With sales experience closing: $4k-$10k/mo early on. Starting in setting without experience: $3k-$6k/mo is conservative. Top performers do $40k/mo." },
  { q: 'Do you offer payment plans?',                a: "Yes. Multiple options available, some credit-checked, some not. Many members land a role that pays it back before the plan is even due." },
  { q: 'Why work with you vs. someone else?',        a: "Most others focus on sales training. Sales training doesn't get you jobs. We focus on the full pipeline and give 1-1 time with Dylan directly." },
  { q: 'What if I am in another program?',           a: "Many members came from other programs. Our job board access and placement strategy is complementary to any training you may already have." },
  { q: 'Do you do job placement?',                   a: "We don't place you directly, but our process reliably gets you into roles. We have a guarantee tied to your effort following our process." },
  { q: 'What if the market slows down?',             a: "When the economy slows, demand for alternative income paths surges. We were active throughout COVID and it was one of our best periods." },
];

// Split into panels of 5
const PANELS = [];
for (let i = 0; i < ALL_FAQS.length; i += 5) {
  PANELS.push(ALL_FAQS.slice(i, i + 5));
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(o => !o)}
      >
        <span>{item.q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ data }) {
  return (
    <section className="section">
      <div className="col">
        <span className="eyebrow eyebrow--light reveal">FAQ</span>
        <h2 className="headline headline--white reveal">Common Questions</h2>
      </div>

      {/* Fix 11: Horizontal scroll of FAQ panels */}
      <div className="faq-outer reveal reveal--delay-1">
        <div className="faq-track" style={{ paddingLeft: 'max(20px, calc((100vw - var(--col)) / 2))' }}>
          {PANELS.map((panel, pi) => (
            <div key={pi} className="faq-panel">
              {panel.map((item, qi) => (
                <FaqItem key={qi} item={item} />
              ))}
            </div>
          ))}
          <div style={{ flexShrink: 0, width: '20px' }} />
        </div>
      </div>

      <div className="col">
        <div className="carousel-hint reveal reveal--delay-2">
          <span>Swipe for more questions</span>
        </div>
      </div>
    </section>
  );
}
