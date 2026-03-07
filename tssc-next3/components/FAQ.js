'use client';
import { useState } from 'react';

// All FAQ panels — 5 questions each, repeating content across panels
const ALL_FAQS = [
  { q: 'Do I need prior sales experience?', a: "No. We take beginners and experienced reps alike. Our process works regardless of background. The most important thing is coachability and drive. If you have sales experience, you'll likely start a few steps ahead. If you don't, you just need manageable expectations around timeline and earning potential." },
  { q: 'What kind of roles do you help me get?', a: "We focus exclusively on 1099 remote closing and setting roles for online businesses — high-ticket, inbound, work-from-anywhere positions. These are businesses selling digital products or services, usually high-margin, where you earn on commission. No pyramid schemes, no MLM, no licensing required." },
  { q: 'How quickly can I get placed?', a: "Most members ideally land a role within 3-5 weeks. Some as fast as 2.5 weeks, some a bit longer. It depends on how much time you have to allocate each week. With about 3-4 hours per week, you can run through our process and have things lined up quickly." },
  { q: 'Is this a pyramid scheme or MLM?', a: "Absolutely not. No licensing required, no buying inventory, no recruiting your family. These are legitimate 1099 remote sales positions with real online businesses that need closers and setters. We post nearly daily job opportunities from real companies hiring right now." },
  { q: "What does the community look like day-to-day?", a: "Active community channels, weekly group calls, 1-1 touchpoints with our team, daily job board postings, deal reviews, call reviews, and a group of people all in the same pursuit as you. Everything is hosted in one place — no scattered kajabi/Facebook group/Zoom combo." },
  { q: 'What is the investment?', a: "The community is not free and it's not cheap. Pricing is shown in the booking form and discussed on the call. The goal is that with the results we provide in the timeline we provide them, you'll make it back many times over within your 6 months. Payment plans are also available." },
  { q: 'What is your guarantee?', a: "If you check all 5 criteria in our agreement, we guarantee that within 60 days you'll have an offer extended to you with a validated OTE that matches or exceeds what you paid to join. Of the last 100 high-ticket paying clients, we've had zero refunds and zero chargebacks." },
  { q: 'Can I do this part-time?', a: "Yes. You only need about 3-4 hours per week to run through our process and get results. We've had members juggle a tech sales W2 job alongside a 1099 role for over 2 years. Long-term it may be hard to sustain both, but short-term it's very doable." },
  { q: 'Can I do this from anywhere?', a: "Yes, for the most part. Some companies prefer US time zones, but many members are in Europe, Australia, South America, and beyond. As a 1099 contractor you have far more flexibility than a W2 employee would. We have members who travel full-time once they land their first role." },
  { q: 'What does realistic income look like?', a: "With sales experience going straight into closing: $4k-$10k/mo is very achievable early on. Without sales experience starting in setting: $3k-$6k/mo is conservative. We've had a former bank teller make $10k in their first month setting. We've had members do $40k months after 2 years." },
  { q: 'Do you offer payment plans?', a: "Yes. We have multiple options — some check your credit, some don't. If you don't have the full amount but have something significant, still book a call. We've gotten members down to as low as $147/month, and many land a job that pays it back before it's even due." },
  { q: "Why should I work with you vs. someone else?", a: "Most others focus almost entirely on sales training. Sales training doesn't get you jobs. We focus on the full pipeline — resume, loom videos, application strategy, access to hundreds of jobs per month, and 1-1 time with Dylan directly. Our results speak for themselves." },
  { q: 'What if I am in another program?', a: "A lot of our members came from other programs. What they found is that those programs focused on sales training but not job access or placement strategy. Even if you're already in something, having our network and job board access is complementary." },
  { q: 'Do you do job placement?', a: "Short answer: no. Anyone guaranteeing job placement is almost certainly not delivering on it — we have a full YouTube video breaking down why. What we offer instead is a process that reliably gets you into roles, and a guarantee tied to your effort following that process." },
  { q: 'What if the market slows down?', a: "Historically, when the economy slows down, demand for alternative income paths like this surges. We were in this space throughout COVID and it was one of the best times. The online coaching and digital services industry is also multiplying year over year regardless of the broader economy." },
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
