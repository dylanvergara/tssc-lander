'use client';
import { useEffect, useState, useRef } from 'react';
import Footer from '../../components/Footer';

const TYPEFORM_ID = 'c9ZgGYnk';
const CHRIS_VIDEO_ID = 'ej2TCqn-FbA';

/* ---------- Shared inline Typeform CTA (each instance owns its state) ---------- */
function ApplyCTA({ label = 'Apply Now' }) {
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (!formOpen) return;
    const timer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (!document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')) {
        const s = document.createElement('script');
        s.src = '//embed.typeform.com/next/embed.js';
        s.async = true;
        document.body.appendChild(s);
      } else if (window.tf && typeof window.tf.load === 'function') {
        window.tf.load();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [formOpen]);

  return (
    <div className="sa-apply">
      {!formOpen && (
        <button className="short-hero__cta" onClick={() => setFormOpen(true)}>
          {label}
        </button>
      )}
      <div ref={formRef} className={`short-inline-form${formOpen ? ' is-open' : ''}`}>
        {formOpen && (
          <div className="short-inline-form__inner">
            <div data-tf-widget={TYPEFORM_ID} data-tf-medium="snippet" className="sa-tf-mount" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Data ---------- */
const HERO_STATS = [
  { value: '3', label: 'Months of Live Coaching' },
  { value: '1:1', label: 'Fully Private Format' },
  { value: '7', label: 'Private 1:1 Sessions' },
  { value: '1x', label: 'Weekly Group Calls' },
];

const STRIP_STATS = [
  { value: '12 Weeks', label: 'Program Duration' },
  { value: '7', label: 'Private 1:1 Sessions' },
  { value: 'Lifetime', label: 'Curriculum Access' },
  { value: '1-on-1', label: 'Program Format' },
  { value: 'Rolling', label: 'Enrollment by Application' },
];

const SCREEN_CHECKS = [
  { icon: '✓', ok: true, title: 'Already on an offer', sub: 'Actively closing and earning commissions' },
  { icon: '✓', ok: true, title: 'Leaving money on the table', sub: 'You know the gap exists. We help you close it' },
  { icon: '✗', ok: false, title: 'Not beginner-friendly', sub: 'We do not teach the fundamentals of sales from scratch' },
];

const STANDARDS_CARDS = [
  { icon: '📊', title: 'Every Metric Tracked', body: 'Close rate, show rate, cash collected. Logged weekly.' },
  { icon: '📈', title: 'Weekly Performance Reviews', body: 'Your numbers are reviewed with your coach every single week.' },
  { icon: '📋', title: 'Mandatory Homework', body: 'Skip it and your next 1:1 covers it instead of advancing.' },
  { icon: '🔒', title: 'Full Commitment Required', body: 'Three months. No exceptions. No partial credit.' },
];

const CANDIDATE_CARDS = [
  { icon: '🎯', title: 'Already Closing on an Active Offer', body: "You're on calls, generating commissions, and have real data to work with. Without live calls, the training stays theoretical and you won't extract full value." },
  { icon: '📈', title: 'Earning, and Leaving Money on the Table', body: "You know the gap exists. Maybe another rep on your offer is doing double what you're doing. That gap is a skill gap, a systems gap, or both. We identify which." },
  { icon: '⚙️', title: 'Setters Ready to Build Closer-Level Skills', body: "If you're setting on a quality offer and want to sharpen your game at the closer level, this program applies. Better closing instincts make you a more effective setter." },
  { icon: '💡', title: 'Performing, But Plateaued', body: "You don't need to be struggling to qualify. If you're at a ceiling and the 1:1 attention and accountability to break through it is what's missing, this is for you." },
  { icon: '🏢', title: 'On an Offer With Lead Flow and Proof', body: 'Your offer has inbound leads and other reps who are earning. This gives us real data to distinguish between a skill issue, an offer issue, and a systems issue.' },
  { icon: '🔥', title: 'Prepared to Commit Fully for Three Months', body: 'For twelve weeks, you build your schedule around the program. Homework is required. Attendance is not optional. We expect the same standard from you that we hold ourselves to.' },
];

const INCLUDED_CARDS = [
  { icon: '🔍', title: 'Initial Call Evaluation', body: '2-3 of your calls reviewed via AI-assisted grading before the program starts. We identify exactly where deals are breaking down before building anything.' },
  { icon: '⚙️', title: 'Custom Operations Audit & Report', body: 'A personalized report on your CRM, automations, pipeline stages, and pre-call setup, so we know whether you have a skill issue, an offer issue, or a systems issue.' },
  { icon: '📚', title: 'Full Curriculum, Lifetime Access', body: 'Lifetime access to the complete Circle-hosted curriculum covering every stage of the sales process, with pre-recorded training videos and annotated call examples.' },
  { icon: '📞', title: 'Weekly Group Call', body: '12 hours of live group coaching over 12 weeks. Call reviews, live role plays, and real-time feedback. Homework assigned after every session.' },
  { icon: '🎯', title: '7 Private 1:1 Sessions', body: 'Front-loaded, structured one-on-one sessions customized to your offer, your gaps, and your goals. One with Dylan, six with Chris. From call evaluation and ops audit to objection mastery.' },
  { icon: '📱', title: 'AI Sales Coach', body: 'Access to an AI-powered sales coach trained on our process for pre- and post-call preparation, script refinement, and practice between sessions.' },
  { icon: '📊', title: 'Personal Stats Tracker', body: 'Weekly stats submitted and reviewed together: calls, show rate, close rate, cash collected. Your tracker is built for you and reviewed every week of the program.' },
  { icon: '📝', title: 'Custom Scripts Built for Your Offer', body: 'Scripts written specifically around your offer, your ICP, and your voice. Not generic templates you have to adapt yourself.' },
];

const MODULES = [
  {
    num: '01',
    title: 'Introduction & Orientation',
    sub: 'Welcome, program overview, and how to maximize your results',
    body: 'Before anything else, we establish exactly where you are. Your initial call evaluation gives us the data we need to customize every session that follows. This module sets the tone for what this program demands: full presence, complete follow-through, and zero tolerance for half-measures.',
    bullets: [
      'Welcome to Sales Ascension: philosophy and expectations',
      'How to navigate the curriculum and use all resources',
      'Understanding the call structure: group calls vs. 1:1 sessions',
      'How to use the AI Sales Coach for pre- and post-call work',
      'Setting your performance targets and tracking your numbers',
      'Homework and accountability expectations between sessions',
    ],
  },
  {
    num: '02',
    title: 'Sales Principles & Mindset',
    sub: 'The foundational beliefs that separate average closers from elite ones',
    body: "The beliefs and standards underneath every elite closer's performance: conviction, ownership, and how you frame the sale to yourself before you ever frame it to a prospect.",
  },
  {
    num: '03',
    title: 'The Sales Framework',
    sub: 'A complete, end-to-end framework for every stage of the call',
    body: 'Discovery, alignment, and future pacing. A complete structure for the call itself, so nothing is improvised and every stage has a purpose.',
  },
  {
    num: '04',
    title: 'Sales Process & Pipeline',
    sub: 'What happens before and after the call matters just as much',
    body: 'Show rate systems, follow-up, CRM discipline, and pipeline management. The work around the call that quietly decides your monthly number.',
  },
  {
    num: '05',
    title: 'Live Call Breakdowns',
    sub: 'Real calls, real feedback, real improvement',
    body: 'Your recorded calls, broken down line by line. We identify exactly where deals are won and lost and turn every recording into a training asset.',
  },
  {
    num: '06',
    title: 'Offer Optimization & Operations Audit',
    sub: 'Zoom out from the call. Sometimes the system is the issue',
    body: "Sometimes the constraint isn't your skill set. We audit your offer, your lead flow, and your operations to make sure the system around you supports the number you're chasing.",
  },
];

const SESSIONS = [
  {
    num: 'Session 1',
    title: 'Initial Call Evaluation + Operations Report',
    coach: 'With Dylan',
    body: 'Before we build anything, we assess where you actually are. Dylan reviews 2-3 of your recent call recordings using an AI-assisted grading framework to identify exactly where deals are breaking down. You also receive a custom Operations Report covering your CRM, automations, pipeline stages, and pre-call setup. This ensures every session that follows is built around your actual situation, not a generic template.',
  },
  {
    num: 'Session 2',
    title: 'How, What, Why / Conviction / Avatar',
    coach: 'With Chris',
    body: 'We establish your foundation. Why are you in sales? What do you actually believe about your offer? Who is your ideal buyer and what do they really need? We also reverse-engineer your income goals: close rate required, show rate required, slots available, so you know exactly what hitting your number actually looks like in practice.',
  },
  {
    num: 'Session 3',
    title: 'Script Building & Roleplay: Current Situation',
    coach: 'With Chris',
    body: "We rebuild your script from the ground up, tailored to your offer and your voice. Then we put it to work immediately through roleplay based on your current call scenarios. This session is entirely customized: if you already have a strong script foundation, we sharpen it. If you're starting from scratch, we build it together.",
  },
  {
    num: 'Session 4',
    title: 'Discovery: Current Situation & Challenge',
    coach: 'With Chris',
    body: "Deep dive into the discovery phase. We work through how you're currently uncovering your prospect's situation and challenges, identify where the gaps are, and sharpen your questioning framework to surface real buying motivation. Adapted to your specific offer and the objections you face most.",
  },
  {
    num: 'Session 5',
    title: 'Alignment & Challenge',
    coach: 'With Chris',
    body: 'This session focuses on the alignment phase: getting the prospect to acknowledge the gap between where they are and where they want to be. We work through how to create genuine urgency without pressure tactics, customized to the language and tonality that works for your specific ICP.',
  },
  {
    num: 'Session 6',
    title: 'Roleplay: Heaven & Consequence',
    coach: 'With Chris',
    body: 'Future pacing is one of the most powerful and most underused tools in sales. This session is dedicated to mastering the heaven and consequence framework through intensive roleplay until it feels natural and conversational, not rehearsed.',
  },
  {
    num: 'Session 7',
    title: 'Roleplay: Objection Handling',
    coach: 'With Chris',
    body: 'The final 1:1 session is all about objections. We run through every major objection you face on your specific offer: money, time, partner, doubt, until your responses are sharp, confident, and genuinely helpful to the prospect. This session is built entirely around the objections you actually hear.',
  },
];

const SCHEDULE = [
  { week: 'Week 1',  group: 'Orientation + Principles',              session: 'Session 1: Call Eval + Ops Report (Dylan)',           focus: 'Baseline assessment, call grading, operations audit' },
  { week: 'Week 2',  group: 'Sales Framework: Discovery',            session: 'Session 2: How/What/Why + Goals Reverse-Engineering', focus: 'Conviction building, avatar clarity, income goal math' },
  { week: 'Week 3',  group: 'Sales Framework: Alignment',            session: 'Session 3: Script Build + Roleplay',                  focus: 'Custom script construction, first live roleplay' },
  { week: 'Week 4',  group: 'Sales Framework: Future Pacing',        session: 'Session 4: Discovery Deep Dive',                      focus: 'Discovery mastery, questioning frameworks, call analysis' },
  { week: 'Week 5',  group: 'Sales Process: Show Rate + Follow-Up',  session: 'Session 5: Alignment + Challenge',                    focus: 'Creating urgency, alignment frameworks, gap analysis' },
  { week: 'Week 6',  group: 'Live Call Breakdowns',                  session: 'Session 6: Heaven & Consequence Roleplay',            focus: 'Future pacing mastery, emotional connection, consequence framing' },
  { week: 'Week 7',  group: 'Live Call Breakdowns',                  session: 'Session 7: Objection Handling Roleplay',              focus: 'Full objection library, money/time/partner/doubt frameworks' },
  { week: 'Week 8',  group: 'Sales Process: Pipeline + CRM',         session: null,                                                  focus: 'Pipeline discipline, follow-up systems, operations cleanup' },
  { week: 'Week 9',  group: 'Live Call Breakdowns',                  session: null,                                                  focus: 'Real calls, real feedback, applied refinement' },
  { week: 'Week 10', group: 'Advanced Roleplay Workshop',            session: null,                                                  focus: 'Pressure-testing your full call under live scenarios' },
  { week: 'Week 11', group: 'Live Call Breakdowns',                  session: null,                                                  focus: 'Consistency, metric review, closing the remaining gaps' },
  { week: 'Week 12', group: 'Capstone: Full Call Simulations',       session: null,                                                  focus: 'End-to-end performance review, next steps, continued support options' },
];

const FAQS = [
  { q: 'Do I need to already be in The Serial Sales Community to apply?', a: "Sales Ascension is primarily designed for existing TSSC members, where there's already a foundation of trust and context. That said, if you meet the criteria (actively closing on an offer, earning commissions, and you know you're leaving money on the table) reach out. External applicants are evaluated on a case-by-case basis." },
  { q: "What if I don't know exactly where I need help?", a: "That's exactly what Session 1 is for. Before we build anything, Dylan reviews 2-3 of your recent call recordings using an AI-assisted grading framework and delivers a custom Operations Report. We identify precisely where deals are breaking down, whether that's a skill issue, an offer issue, or a systems issue, before we touch a single session. You don't need to come in with the answers. We find them together." },
  { q: 'How personalized is this, really?', a: 'Completely. Every 1:1 session is built around your offer, your ICP, and your current gaps. Your scripts are written for your voice. Your roleplay scenarios are pulled from your actual calls. Your homework is assigned based on where you are in the process. The weekly group call provides the framework. The 1:1 sessions make it yours. This is not a course you watch at 1.5x speed.' },
  { q: "I'm a setter, not a closer. Is this for me?", a: "Yes, with context. If you're setting on a good offer and making real money, and you want to build the muscles of a closer to sharpen your own game, this program is applicable. Getting better at closing will only make you a more effective setter. We'll be upfront about what's closer-specific vs. universally applicable." },
  { q: 'What does the accountability structure actually look like?', a: "You submit weekly stats (calls, show rate, close rate, cash collected) into a personal tracker we build for you and review together. Homework is assigned between every session. If you don't complete it, that's what your next 1:1 covers instead of moving forward. Attendance is not optional. We do not accommodate people who are not fully committed to seeing the process through." },
  { q: "What happens if I miss calls or don't do the work?", a: "We screen applicants specifically to avoid this situation, but if it happens, we address it directly. This program is built on a high-integrity standard. We hold every participant to the same expectations we hold ourselves to. If you're not showing up, we will have a direct conversation. This program only works with full commitment." },
  { q: 'Is this a group program?', a: 'No. This is a 1-on-1 program. Your seven private sessions, your tracker, your scripts, and your homework are built entirely around you. The only group element is the weekly group call, where you get live call reviews and role plays alongside other committed reps. Everything else is private.' },
  { q: 'What does the application process look like?', a: "You'll fill out a short application covering your current role, offer, comp structure, close rate, and a recent call recording. We review every application personally and reach out directly. We're not looking to fill seats. We're looking for the right people. If this isn't the right fit right now, we'll tell you that honestly." },
  { q: 'Is there continued support after the 12 weeks?', a: 'Yes. After completing the program, you can continue with 2 private 1:1 sessions per month and ongoing access to the weekly group call. You also retain lifetime access to the full curriculum regardless of whether you continue with monthly support.' },
];

/* ---------- Small components ---------- */
function ModuleItem({ mod, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`sa-module${open ? ' is-open' : ''}`}>
      <button className="sa-module__head" onClick={() => setOpen(o => !o)}>
        <span className="sa-module__num">{mod.num}</span>
        <span className="sa-module__titles">
          <span className="sa-module__title">{mod.title}</span>
          <span className="sa-module__sub">{mod.sub}</span>
        </span>
        <span className="sa-module__icon">{open ? '×' : '+'}</span>
      </button>
      <div className="sa-module__body">
        <div className="sa-module__body-inner">
          <p>{mod.body}</p>
          {mod.bullets && (
            <ul className="sa-module__list">
              {mod.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
        </div>
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

function ChrisVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="sa-coach__video vsl-glow" onClick={() => !playing && setPlaying(true)}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${CHRIS_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <img src={`https://img.youtube.com/vi/${CHRIS_VIDEO_ID}/maxresdefault.jpg`} alt="Chris's first $30K month, the full interview" />
          <div className="sa-coach__video-overlay">
            <div className="sa-coach__play">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span>Watch: Chris's First $30K Month. The Full Interview</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Past clients (headshot -> text-message screenshot modal) ---------- */
/* To add a client: drop a headshot + a text screenshot into /public/images/clients/
   and add an entry below. `texts` accepts one or more screenshots. */
const CLIENTS = [
  { name: 'Jose R.', result: '', headshot: '/images/clients/jose.jpg', texts: ['/images/clients/jose-text.jpg'] },
  { name: 'Daniel J.', result: '', headshot: '/images/clients/daniel.jpg', texts: ['/images/clients/daniel-text.jpg'] },
];

function PastClients() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [active]);

  const c = active !== null ? CLIENTS[active] : null;

  return (
    <section className="sa-section" id="clients">
      <span className="sa-pill">Past Clients</span>
      <h2 className="sa-h2">What Every Client Said</h2>
      <p className="sa-lead">We don&apos;t cherry-pick the wins. These are reviews from every client who&apos;s worked with us &mdash; not just the success stories. Tap any client to read the exact message they sent us.</p>

      <div className="sa-clients">
        {CLIENTS.map((cl, i) => (
          <button key={i} type="button" className="sa-client" onClick={() => setActive(i)}>
            <img src={cl.headshot} alt={cl.name} className="sa-client__photo" />
            <span className="sa-client__name">{cl.name}</span>
            {cl.result ? <span className="sa-client__result">{cl.result}</span> : null}
            <span className="sa-client__cue">View message</span>
          </button>
        ))}
      </div>

      {c && (
        <div className="sa-modal" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="sa-modal__box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="sa-modal__close" onClick={() => setActive(null)} aria-label="Close">&times;</button>
            <div className="sa-modal__head">
              <img src={c.headshot} alt={c.name} className="sa-modal__photo" />
              <div>
                <h3 className="sa-modal__name">{c.name}</h3>
                {c.result ? <span className="sa-modal__result">{c.result}</span> : null}
              </div>
            </div>
            <div className="sa-modal__texts">
              {c.texts.map((t, j) => (
                <img key={j} src={t} alt={`Message from ${c.name}`} className="sa-modal__text" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Page ---------- */
export default function SalesAscensionPage() {
  return (
    <div className="sa-page">
      {/* Fixed nav */}
      <nav className="sa-nav">
        <img src="/images/logo-white-bg.png" alt="TSSC" className="sa-nav__logo" />
        <div className="sa-nav__links">
          <a href="#curriculum">Curriculum</a>
          <a href="#sessions">1:1 Sessions</a>
          <a href="#schedule">Schedule</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#apply" className="sa-nav__cta">Apply Now</a>
      </nav>

      {/* HERO */}
      <header className="sa-hero">
        <div className="sa-hero__inner">
          <div className="sa-hero__copy">
            <span className="sa-pill">TSSC Sales Ascension</span>
            <h1 className="sa-hero__headline">
              Built for Closers <span className="sa-accent">Who Know They're Capable of More.</span>
            </h1>
            <p className="sa-hero__sub">
              A fully 1-on-1 ascension program for closers and setters inside The Serial Sales
              Community who are already earning, and know they're leaving money on the table.
            </p>
            <p className="sa-hero__bold">
              This is not a beginner program. We screen every applicant. Every seat is 1-on-1. No exceptions.
            </p>
            <div className="sa-hero__stats">
              {HERO_STATS.map((s, i) => (
                <div className="sa-stat-card" key={i}>
                  <span className="sa-stat-card__value">{s.value}</span>
                  <span className="sa-stat-card__label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="sa-hero__ctas">
              <ApplyCTA label="Apply Now" />
              <a href="#curriculum" className="sa-btn-ghost">See the Curriculum</a>
            </div>
          </div>
        </div>
      </header>

      {/* STAT STRIP */}
      <div className="sa-strip">
        {STRIP_STATS.map((s, i) => (
          <div className="sa-strip__item" key={i}>
            <span className="sa-strip__value">{s.value}</span>
            <span className="sa-strip__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SCREENING */}
      <section className="sa-section">
        <div className="sa-card-dark">
          <span className="sa-pill">This Is Not for Everyone</span>
          <h2 className="sa-h2">We Screen Every Single Applicant.</h2>
          <p>
            The TSSC Sales Ascension program is explicitly designed for sales professionals who are
            already on an offer, already earning commissions, and already know they are leaving money
            on the table. If you are new to high-ticket sales, this is not your starting point.
          </p>
          <p>
            Every seat is fully 1-on-1. Not as a marketing tactic, but because the level of
            personalization this program delivers is impossible at scale. Every applicant is reviewed
            personally. If this isn't the right fit right now, we'll tell you that directly.
          </p>
          <div className="sa-checks">
            {SCREEN_CHECKS.map((c, i) => (
              <div className="sa-check" key={i}>
                <span className={`sa-check__icon${c.ok ? '' : ' sa-check__icon--no'}`}>{c.icon}</span>
                <span className="sa-check__title">{c.title}</span>
                <span className="sa-check__sub">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="sa-section">
        <span className="sa-pill">Why This Exists</span>
        <h2 className="sa-h2">
          Getting the Job Is One Thing.{' '}
          <span className="sa-accent">What You Do With It Is Another.</span>
        </h2>
        <div className="sa-prose">
          <p>
            The Serial Sales Community was built to help people break into remote, high-ticket sales:
            land the right offer, get the rep seat, and start earning. That process works. For a lot
            of people, it's the first time they've made real money doing something they're good at.
          </p>
          <p>
            But getting the job and maximizing the job are two completely different problems. Once
            you're on an offer with lead flow and a proven product, the ceiling isn't the opportunity.
            It's the rep. Close rate, tonality, objection handling, pipeline discipline: these are the
            variables that separate someone earning $6K a month from someone earning $14K on the exact
            same offer.
          </p>
          <p>
            The standard TSSC process doesn't pretend to solve that. It's not designed to. Sales
            Ascension exists specifically for the rep who is already in the seat, already generating
            revenue, and knows there's more on the table, but hasn't had the focused, personalized
            attention to go get it.
          </p>
          <p>
            There's a meaningful difference between consuming content about sales and having someone
            who knows your offer, your call recordings, and your specific gaps working with you
            directly on a recurring basis. That's what this is.
          </p>
        </div>
        <div className="sa-compare">
          <div className="sa-compare__card">
            <span className="sa-compare__eyebrow">The Serial Sales Community</span>
            <h3>Breaking In</h3>
            <p>Finding the right offer, landing the rep seat, and building the foundation to earn consistently in remote, high-ticket sales.</p>
            <ul>
              <li>Offer vetting and placement</li>
              <li>Community and peer accountability</li>
              <li>Standard sales training and frameworks</li>
              <li>Access to hiring opportunities</li>
            </ul>
          </div>
          <div className="sa-compare__card sa-compare__card--accent">
            <span className="sa-compare__eyebrow">TSSC Sales Ascension</span>
            <h3>Maximizing What You Have</h3>
            <p>Closing the gap between what you're currently earning and what's available to you on the offer you're already on.</p>
            <ul>
              <li>Personalized 1:1 coaching on your specific offer</li>
              <li>Call evaluation and operations audit</li>
              <li>Custom scripts built for your voice and ICP</li>
              <li>Weekly accountability with tracked metrics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="sa-section">
        <span className="sa-pill">Our Approach</span>
        <h2 className="sa-h2">
          We Meet You Where You Are. <span className="sa-accent">Then We Push You Past It.</span>
        </h2>
        <div className="sa-approach">
          <div className="sa-prose">
            <p>
              Every rep enters this program at a different level. Some know exactly where they're
              losing deals. Others feel the gap but can't name it. That's why Session 1 is a full
              diagnostic: a call evaluation and an operations audit, before we build a single session
              plan. We don't assume. We assess.
            </p>
            <p>
              The group call provides the framework. The 1:1 sessions make it yours. Your scripts are
              written for your voice. Your roleplay scenarios are pulled from your actual calls. Your
              homework is assigned based on where you are in the process. The goal is not to make you
              a generic closer. It's to make you a better version of the closer you already are.
            </p>
            <p>
              Our standard is simple: tangible ROI. By the time you complete this program, your close
              rate, show rate, and monthly commission should reflect the work you put in. We track
              every metric to make sure that's true.
            </p>
          </div>
          <blockquote className="sa-quote">
            <p>
              "Think of it like bootcamp. If you're joining the army, the first two weeks are basics
              intensive. You need to get in shape before you can do anything else. We raise the floor
              across everything, simultaneously."
            </p>
            <cite>Chris Cha, Head of Client Success, The Serial Sales Community</cite>
          </blockquote>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="sa-section">
        <div className="sa-card-dark">
          <span className="sa-pill">Standards &amp; Integrity</span>
          <h2 className="sa-h2 sa-h2--sm">
            High Standards. No Exceptions. <span className="sa-accent">For Your Own Good.</span>
          </h2>
          <p>
            This is a high-integrity environment. We hold every participant to the same standard we
            hold ourselves to, because anything less is a disservice to everyone involved. We will
            not tolerate leniency for people who do not see the entire process through.
          </p>
          <p>
            If you miss calls, skip homework, or stop showing up, we will address it directly. This
            is not a course you can pause. It's a three-month commitment, and we take that seriously.
          </p>
          <div className="sa-mini-grid">
            {STANDARDS_CARDS.map((c, i) => (
              <div className="sa-mini-card" key={i}>
                <span className="sa-mini-card__icon">{c.icon}</span>
                <span className="sa-mini-card__title">{c.title}</span>
                <span className="sa-mini-card__body">{c.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING SHOWCASE */}
      <section className="sa-section sa-section--tracker">
        <span className="sa-pill">Tracked Week by Week</span>
        <h2 className="sa-h2 sa-h2--sm">Your Numbers, <span className="sa-accent">In Black and White.</span></h2>
        <p className="sa-tracker__copy">
          Every week of the program, your stats go into a tracker we build for you: calls scheduled,
          show rate, offers made, close rate, revenue, cash collected, and commission earned. Week
          over week, you and your coach see exactly what's improving and what we attack next.
        </p>
        <div className="sa-tracker__frame vsl-glow">
          <img src="/images/sales-ascension-tracker.png" alt="The weekly performance tracker used inside Sales Ascension, covering calls scheduled, show rate, close rate, revenue, cash collected, and commission earned" />
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="sa-section">
        <span className="sa-pill">Ideal Candidate</span>
        <h2 className="sa-h2">Who This Program Is For</h2>
        <p className="sa-lead">
          We are not looking to fill seats. We are looking for the right people: professionals who
          are already in the game, already generating revenue, and ready to operate at a higher
          standard.
        </p>
        <div className="sa-grid-3">
          {CANDIDATE_CARDS.map((c, i) => (
            <div className="sa-info-card" key={i}>
              <span className="sa-info-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVERYTHING INCLUDED */}
      <section className="sa-section">
        <span className="sa-pill">What You Get</span>
        <h2 className="sa-h2">Everything Included</h2>
        <p className="sa-lead">
          Every deliverable is designed to compound on the others. The curriculum gives you the
          foundation. The calls give you the reps. The 1:1 sessions give you the personalized edge
          that no group program can replicate.
        </p>
        <div className="sa-grid-3">
          {INCLUDED_CARDS.map((c, i) => (
            <div className="sa-info-card" key={i}>
              <span className="sa-info-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="sa-section" id="curriculum">
        <span className="sa-pill">The Curriculum</span>
        <h2 className="sa-h2">What You'll Learn</h2>
        <p className="sa-lead">
          Six structured modules that build on each other, covering every dimension of
          high-performance sales. The framework is proven. The application is entirely yours.
        </p>
        <div className="sa-modules">
          {MODULES.map((m, i) => <ModuleItem key={i} mod={m} defaultOpen={i === 0} />)}
        </div>
      </section>

      {/* 1:1 SESSIONS */}
      <section className="sa-section" id="sessions">
        <span className="sa-pill">Private Coaching</span>
        <h2 className="sa-h2">Your 7 Private 1:1 Sessions</h2>
        <p className="sa-lead">
          One session with Dylan, then six with Chris. Each session has a defined purpose and is
          front-loaded in the program so you enter the group calls with a strong, personalized
          foundation. Sessions run approximately one hour. The first session is always a diagnostic:
          we assess before we build.
        </p>
        <div className="sa-timeline">
          {SESSIONS.map((s, i) => (
            <div className="sa-timeline__item" key={i}>
              <div className="sa-timeline__dot" />
              <span className="sa-timeline__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className={`sa-coach-tag${s.coach === 'With Dylan' ? ' sa-coach-tag--dylan' : ''}`}>{s.coach}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="sa-section" id="schedule">
        <span className="sa-pill">Program Timeline</span>
        <h2 className="sa-h2">12-Week Program Schedule</h2>
        <p className="sa-lead">
          The 1:1 sessions are front-loaded so you enter the group calls with a strong foundation.
          Group calls run once per week throughout the full 12 weeks and focus on call reviews and
          live role plays.
        </p>
        <div className="sa-schedule">
          <div className="sa-schedule__row sa-schedule__row--head">
            <span>Week</span>
            <span>Group Call (1x/Week)</span>
            <span>1:1 Session</span>
            <span>Focus</span>
          </div>
          {SCHEDULE.map((r, i) => (
            <div className="sa-schedule__row" key={i}>
              <span className="sa-schedule__week">{r.week}</span>
              <span data-label="Group Call">{r.group}</span>
              <span data-label="1:1 Session" className={r.session ? '' : 'sa-schedule__none'}>{r.session || 'No 1:1 this week'}</span>
              <span data-label="Focus">{r.focus}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COACHES */}
      <section className="sa-section">
        <span className="sa-pill">Your Coaches</span>
        <h2 className="sa-h2">Who's Leading This</h2>
        <p className="sa-lead">
          Two people built this program. One is a formally trained teacher who became an elite
          closer. The other is a closer who became the operator behind the systems. Together, they
          cover every dimension of what it takes to perform at the highest level.
        </p>

        <div className="sa-coach">
          <div className="sa-coach__media">
            <img src="/images/team/team-5.jpg" alt="Chris Cha" className="sa-coach__photo" />
          </div>
          <div className="sa-coach__body">
            <h3 className="sa-coach__name">Chris Cha</h3>
            <span className="sa-coach__role">Head of Client Success · Lead Sales Coach</span>
            <div className="sa-coach__bio">
            <p>
              Chris spent three years in South Korea as a missionary, Bible teacher, and youth
              minister before ever touching a sales call. With a degree in English secondary
              education and seminary training behind him, teaching wasn't a side skill. It was the job.
            </p>
            <p>
              When he transitioned into high-ticket closing, he tanked at sub-10% his first month,
              doubled down on his skill set, and within months was driving 65-70% of his team's
              revenue and broke his first $30,000 commission month.
            </p>
            <p>
              Formally trained teacher, previously failed closer, now elite performer. Chris knows
              where the breakdowns happen because he lived them. Because of this, he leads with
              belief shifts before tactics, because that's how real teaching works.
            </p>
              <ChrisVideo />
            </div>
          </div>
        </div>

        <div className="sa-coach">
          <div className="sa-coach__media">
            <img src="/images/dylan-headshot.jpg" alt="Dylan Vergara" className="sa-coach__photo" />
          </div>
          <div className="sa-coach__body">
            <h3 className="sa-coach__name">Dylan Vergara</h3>
            <span className="sa-coach__role">Founder · Operations &amp; Infrastructure Lead</span>
            <div className="sa-coach__bio">
            <p>
              Dylan left a high-paying roofing sales job in 2022 for remote closing, recreated a
              six-figure income, and quickly outgrew the seat, leaning into management, recruiting,
              and other scalable positions across the industry.
            </p>
            <p>
              He started a sales agency as COO, scaled it from $0 to $700K/month with 30 employees
              in under a year, and built the infrastructure that took client teams from zero to $1M
              per month before exiting the business.
            </p>
            <p>
              That obsession with infrastructure didn't go away. It's why this training exists.
              Dylan is building everything that supports it: the platform, the tracking, and the
              in-depth offer deep dives that make sure you're maximizing the sales funnel serving
              you leads. Closer turned operator turned builder. He knows what reps need to win
              because he's built the systems that let them.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAST CLIENTS */}
      <PastClients />

      {/* GUARANTEE */}
      <section className="sa-guarantee">
        <div className="sa-guarantee__inner">
          <span className="sa-guarantee__icon">🛡️</span>
          <h2>The Performance Guarantee</h2>
          <p>
            Our goal is a tangible ROI for every participant. If you show up to every call, complete
            every 1:1 session, submit your weekly stats, and do the work, you should see a
            measurable improvement in your close rate, commission, and overall performance. We track
            every metric to ensure that's true. Details discussed during your application review.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sa-section" id="faq">
        <div className="sa-faq-head">
          <span className="sa-pill">Common Questions</span>
          <h2 className="sa-h2">Frequently Asked Questions</h2>
          <p className="sa-lead">Still have questions? Reach out directly. We'd rather talk it through than have you guess.</p>
        </div>
        <div className="short-faq-list">
          {FAQS.map((item, i) => <FaqItem key={i} item={item} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sa-section sa-final" id="apply">
        <span className="sa-pill">Apply Now</span>
        <h2 className="sa-h2 sa-h2--center">
          This Is 1-on-1. <span className="sa-accent">Built Entirely Around You.</span>
        </h2>
        <p className="sa-final__copy">
          If you're already on an offer, already earning, and know you're leaving money on the
          table, this program was built for you. Fill out the application and we'll review it
          personally.
        </p>
        <p className="sa-final__micro">No sales call required. We review every application and reach out directly.</p>
        <p className="sa-final__micro">
          After you submit, we'll follow up with a short set of questions about your current
          situation: your offer, your numbers, and where you think you're leaving money on the
          table. This helps us review your application properly before we reach out.
        </p>
        <div className="sa-final__ctas">
          <ApplyCTA label="Apply Now" />
          <a href="mailto:dylan@serialsales.co?subject=Sales%20Ascension%20Question" className="sa-btn-ghost">Learn More. Ask a Question</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
