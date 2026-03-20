'use client';
import { useState, useRef } from 'react';

const SECTIONS = [
  {
    id: 'about',
    label: 'About Dylan & The Community',
    color: '#b6cdde',
    textColor: '#1a2e3a',
    faqs: [
      { q: 'Who should be watching this video?', a: 'Someone who understands that time is money, knows the benefits of getting help, and feels like the limiting factor in their career is the vehicle, not themselves.' },
      { q: 'How many people have you helped?', a: 'Between 2022 and 2023, we ran an active group with 350 members. Since then, we have worked hands-on with over 350 sales professionals, plus countless others through mutual connections, sales teams, and social media.' },
      { q: 'How do I know the member results I\'m seeing are real?', a: 'Consider what it would take to fake 60+ full-length interviews, 20+ hours of content, thousands of win screenshots, three sold-out in-person events, and countless in-person gatherings with paying members. If you see all of that and still don\'t believe it, that\'s your primal brain working against you.' },
      { q: 'How long have you been running this community?', a: 'Since August 2022. We are one of the few businesses in this space that have been around that long and continue to hit record months in both sales and fulfillment.' },
      { q: 'What\'s in it for you?', a: 'Money, tied directly to your results. I understand that helping people meet their financial goals is how I meet my own. I also only have one reputation, and I won\'t burn it.' },
      { q: 'Why should I work with you versus somebody else?', a: 'Better results, more consistency, and a truly custom-fit process. We are a white glove service. Your success is our success.' },
      { q: 'Why is this different from other programs I\'ve tried that didn\'t work?', a: 'Most programs are money grabs focused on things that don\'t solve your immediate problem. We have a proven process that works regardless of where you\'re starting from. Sales training alone does not get you hired.' },
      { q: 'What sales philosophies do you teach?', a: 'We focus on landing you in quality inbound roles where the sale becomes the easy part. Our style is laid back with high accountability. We never recommend selling something you don\'t believe in.' },
    ],
  },
  {
    id: 'opportunity',
    label: 'The Opportunity',
    color: '#a8d5b5',
    textColor: '#1a3323',
    faqs: [
      { q: 'What is the difference between a setter and a closer, and which should I pursue?', a: 'A setter books appointments for a closer to handle. Setting is effort-based, high-volume, lower skill. Closing is skill-based, lower volume, higher leverage.' },
      { q: 'Is high ticket sales saturated?', a: 'Saturation only exists among the unserious. Any opportunity where you can change your life within 12 months will seem saturated. If competition scares you, this probably isn\'t for you.' },
      { q: 'What kind of companies am I working for?', a: 'Online businesses driving inbound leads through ads or content, including coaching, agencies, B2B services, masterminds, bootcamps, software, and communities. There are thousands of options, and plenty of legitimate opportunities regardless of your interests.' },
      { q: 'What does on-target earnings actually mean, and how do I know if it\'s accurate?', a: 'OTE is what a company believes you will earn if you perform as expected. Many companies inflate it to attract talent. One of our biggest focuses is helping you do due diligence so you don\'t fall victim to that.' },
      { q: 'What happens if I get hired and the company turns out to be a bad fit?', a: 'You always have access to our job board, whether it\'s your first role or your tenth. We\'ve had members go from $5k to $10k to $20k per month by leveraging each role into the next. A one-and-done placement model doesn\'t give you that.' },
      { q: 'What if it doesn\'t work?', a: 'Sales jobs on the internet do work. If it doesn\'t work, you didn\'t make it work. Our job isn\'t to convince you the opportunity exists. It\'s to help people who already know it does.' },
      { q: 'What if the market slows down?', a: 'Markets slow and speed up. Economic downturns typically create more opportunity in alternative education and income. There are always winners in every market.' },
      { q: 'If it\'s so good, why doesn\'t everybody do it?', a: 'It\'s hard, scary, and uncertain. Commission-based sales isn\'t for most people. Add in the 1099 model and that narrows it further. Most people prefer a guaranteed lesser outcome over a non-guaranteed bigger one.' },
      { q: 'Is this a pyramid scheme or MLM?', a: 'No. Selling for internet businesses is not an MLM. Less than 1% of our members ever work on any team we\'re involved in. Members make money selling for companies we don\'t own.' },
    ],
  },
  {
    id: 'right-for-me',
    label: 'Is This Right For Me',
    color: '#f0c97a',
    textColor: '#3a2a00',
    faqs: [
      { q: 'Do I need a sales background?', a: 'No, just manageable expectations. We\'ve helped people with zero experience and people with 20 years. Both have gotten results they were satisfied with.' },
      { q: 'I\'m introverted. Can I still succeed in sales?', a: 'Yes, and you may actually have an edge. Sales is about solving problems, which is much easier when you listen more than you talk. Some of the best reps I know are introverts.' },
      { q: 'How do I know this is for me?', a: 'If you\'re ambitious, feel like you\'re in the wrong vehicle, and want your outcome to be determined by how hard you work, this could be for you.' },
      { q: 'Can I do this part-time?', a: 'Yes. Part-time roles are harder to find than full-time, but they exist. We have many members currently doing this part-time.' },
      { q: 'Can I do this from anywhere?', a: 'Yes. Some companies prefer US-based reps, but that\'s typically a preference, not a hard requirement. Since most of these companies aren\'t hiring W-2, there are ways to work around it.' },
      { q: 'What do realistic results look like?', a: 'A realistic result is landing a quality role with earning potential that matches where you\'re starting from. Setter experience gets setter income. Closer experience gets closer income. Our goal is helping you navigate the details before you commit.' },
      { q: 'For the people who don\'t get the result, why don\'t they?', a: 'They stopped trying or never started. It is extremely rare that someone follows our process fully and doesn\'t receive a solid offer. Most people who don\'t get results know the bottleneck is themselves, not the process.' },
      { q: 'What is your success rate?', a: 'Nobody has completed our full process without receiving a legitimate offer. That said, success means something different for everyone. We can\'t guarantee earnings, but we can guarantee the process works when you follow it.' },
    ],
  },
  {
    id: 'inside',
    label: 'Inside The Community',
    color: '#c4b0e8',
    textColor: '#1e1030',
    faqs: [
      { q: 'How is TSSC different from a course?', a: 'Nobody joins us for the course material. They join for the community, job flow, and career strategy. A course is rigid and one-size-fits-all. We meet you where you\'re at.' },
      { q: 'What does a typical week inside the community look like?', a: 'Structured calls with our team, open floor calls throughout the week, community posts, member connections, and direct access to our team. The most successful members take full advantage of the social side.' },
      { q: 'How active is the community day-to-day?', a: 'Our team and members are active Monday through Sunday, posting announcements, wins, help requests, and daily job opportunities.' },
      { q: 'Will I be lost in a big group, or will I get personal attention?', a: 'You will get personal attention. Our team is small. If you show up, we will know who you are, where you started, and what you\'re working toward.' },
      { q: 'What does the course material cover?', a: 'Everything from getting hired to building longevity in the industry. Sourcing jobs, standing out, sales training, networking, and entity/tax basics. No stone goes unturned.' },
      { q: 'Where is the community hosted?', a: 'On the Circle platform, with a clean web and mobile app. Everything is accessible on the go.' },
      { q: 'I\'m in another program. Can I still benefit from this one?', a: 'Absolutely. Some of our highest earners intentionally joined multiple groups. Your network is your net worth.' },
      { q: 'Can I join your team?', a: 'Probably not. We have an extremely lean team and rarely hire. When we do, roles are posted publicly and the best candidate wins, regardless of whether they\'re a member.' },
    ],
  },
  {
    id: 'jobs',
    label: 'Jobs & Opportunities',
    color: '#f4a87c',
    textColor: '#3a1500',
    faqs: [
      { q: 'Are the job opportunities you post actually legitimate?', a: 'They are vetted to a reasonable extent before being shared. We will never intentionally misrepresent a role, and if we find one has been, we address it immediately and cut off the source.' },
      { q: 'Do you do job placement?', a: 'No. Job placement is a one-time band-aid. Our goal is to make you self-sufficient so you can land your first job and every job after.' },
      { q: 'Am I paying you for a job?', a: 'No. You\'re paying for access, proximity, and a team in your corner. Members pay us to save time and avoid the dumb tax navigating this industry on their own.' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing, Guarantee & Logistics',
    color: '#f2a0b8',
    textColor: '#3a0015',
    faqs: [
      { q: 'What\'s your guarantee?', a: 'We don\'t offer income guarantees. What we do is work toward getting you a legitimate 1099 remote sales offer with earning potential that covers your membership cost monthly, if you perform. If you do what\'s required and don\'t get there, Dylan works with you one-on-one daily until you do.' },
      { q: 'How much does the community cost?', a: 'It\'s not free and not cheap. We have several packages based on your goals. If approved, we can split membership into sub-$200 monthly installments. Book a call to go over the options.' },
      { q: 'Do you offer payment plans?', a: 'Yes, both internally managed and through third parties, with some options under $200 per month.' },
      { q: 'What if I can\'t afford it right now?', a: 'Study our free content and get as far as you can with that. When you\'re ready, book a call. We plan on being around for the long run.' },
      { q: 'Do you offer refunds?', a: 'Yes. There is a no-questions-asked refund window after joining where we\'ll refund you in full less any fees. Once our team has invested irrecoverable resources toward you, refunds are no longer offered.' },
      { q: 'Can I get a discount if I bring a friend?', a: 'No discounts, but we do pay referral commissions. Active members receive $400 per paid referral. Non-members receive $250.' },
      { q: 'How much is lifetime access?', a: 'There are two pricing tiers. The best rate is presented on your intake call. A second option is offered at the end of your six-month membership.' },
      { q: 'Why do you charge for lifetime access?', a: 'We want an engaged, invested community. Your network in this space only becomes more valuable as you grow, and the right people around you are worth paying to keep close.' },
    ],
  },
  {
    id: 'taxes',
    label: 'Money, Taxes & 1099 Basics',
    color: '#9dd4c8',
    textColor: '#0a2e28',
    faqs: [
      { q: 'How much does it cost to get into remote sales?', a: 'Technically free. A computer, Wi-Fi, and English are all you need. A better setup helps but isn\'t required. You don\'t need to join TSSC to get started.' },
      { q: 'Can this replace my full-time income?', a: 'Yes, it can. Nothing is guaranteed, but we\'ve had members make $10k in their first month after landing a role. Check our YouTube interviews for more real examples.' },
      { q: 'What are the tax implications of being a 1099 contractor?', a: 'We are not tax professionals. We do partner with the right people inside the community to help you navigate this. In many cases, 1099 is more favorable than W-2.' },
      { q: 'How do I handle income inconsistency month to month?', a: 'Much of our process is built around manageable expectations. Highs and lows will happen. Between avoiding bad offers, not jumping prematurely, and having the right professionals in your corner, we do everything we can to help you manage them.' },
    ],
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    color: '#d4e89d',
    textColor: '#1a2e00',
    faqs: [
      { q: 'When should I start?', a: 'The best time to plant a tree was 20 years ago. Second best is today. If you want to be in a new role soon, you\'re already behind. Give yourself the 3 to 6 weeks upfront, however that fits into your current situation.' },
      { q: 'How much time per week do I need to commit?', a: 'About 3 to 5 hours per week to work through our process, on your own schedule. Once in a role, expect at minimum 10 to 15 hours per week even for part-time positions.' },
      { q: 'How long does it take to get started?', a: 'Our intake call is 45 minutes and onboarding takes about 15. You\'ll be on a one-on-one with your client success manager within 24 to 48 business hours and have immediate access to all community assets.' },
      { q: 'I\'m not ready yet. What should I do?', a: 'Go to our YouTube channel and learn for free. When you\'re ready to implement, book a call and we\'ll take it from there.' },
      { q: 'How do I get started?', a: 'Book a call on this page. Show up on time, from a quiet space, with good Wi-Fi and something to take notes with. If it\'s a fit, we\'ll discuss onboarding and next steps on the call.' },
      { q: 'Can I pay you with money I earned from the job?', a: 'No. Our team front-loads resources and has to be paid regardless of your activity. We would if we could.' },
      { q: 'I have more questions. Where can I ask them?', a: 'DM Dylan on any platform or email dylan@serialsales.co. If you\'re close to ready, just book the call and get them answered there.' },
    ],
  },
];

function FaqItem({ item, color, textColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{item.q}</span>
        <span className="faq-icon" style={open ? { background: textColor, borderColor: textColor, color: color } : {}}>+</span>
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ data }) {
  const panelRefs = useRef({});

  const scrollToSection = (id) => {
    const el = panelRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <section className="section">
      <div className="col">
        <span className="eyebrow eyebrow--light reveal">FAQ</span>
        <h2 className="headline headline--white reveal">Common Questions</h2>

        {/* Color key */}
        <div className="faq-key reveal reveal--delay-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="faq-key__item"
              onClick={() => scrollToSection(s.id)}
              style={{ '--dot-color': s.color }}
            >
              <span className="faq-key__dot" />
              <span className="faq-key__label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scrolling panels */}
      <div className="faq-outer reveal reveal--delay-2">
        <div className="faq-track" style={{ paddingLeft: 'max(20px, calc((100vw - var(--col)) / 2))' }}>
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className="faq-panel"
              ref={(el) => { panelRefs.current[section.id] = el; }}
            >
              {/* Section header chip */}
              <div className="faq-panel__header" style={{ background: section.color }}>
                <span style={{ color: section.textColor }}>{section.label}</span>
              </div>
              {section.faqs.map((item, qi) => (
                <FaqItem key={qi} item={item} color={section.color} textColor={section.textColor} />
              ))}
            </div>
          ))}
          <div style={{ flexShrink: 0, width: '20px' }} />
        </div>
      </div>

      <div className="col">
        <div className="carousel-hint reveal reveal--delay-3">
          <span>Swipe to explore all sections</span>
        </div>
      </div>
    </section>
  );
}
