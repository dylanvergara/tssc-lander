/**
 * CONTENT DATA FILE
 * ─────────────────
 * All text, videos, and section content lives here.
 * Swap placeholders with your real content — no need to touch any components.
 */

export const siteData = {

  // ── Site Meta ──────────────────────────────────────────────────────────────
  meta: {
    title: 'The Serial Sales Community',
    description: 'The premier community for elite sales professionals who are done with average and ready to build legendary careers.',
    ogImage: '/images/og-image.jpg',
    url: 'https://serialsalescommunity.co',
  },

  // ── CTA ───────────────────────────────────────────────────────────────────
  ctaUrl: 'https://bl1yxjc3x33.typeform.com/to/FVsMAspu',
  ctaText: 'Apply Now',

  // ── Nav ───────────────────────────────────────────────────────────────────
  nav: {
    links: [
      { label: 'About',    href: '#about' },
      { label: 'Process',  href: '#process' },
      { label: 'Results',  href: '#results' },
      { label: 'Team',     href: '#team' },
      { label: 'FAQ',      href: '#faq' },
    ],
  },

  // ── Hero / VSL ────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'By Invitation Only',
    headline: ['The Community Built for', 'Sales Professionals Who', 'Refuse to Be Average.'],
    italicWord: 'Refuse to Be Average.',
    subheadline: 'Join the most exclusive network of elite closers, SDRs, and sales leaders — sharing real strategies, real results, and real accountability.',
    // ► REPLACE: paste your YouTube video ID (the part after ?v=)
    vslVideoId: 'YOUR_VSL_VIDEO_ID',
    vslThumbnail: '/images/vsl-thumbnail.jpg',
  },

  // ── Mission ───────────────────────────────────────────────────────────────
  mission: {
    eyebrow: 'Our Mission',
    headline: 'Elevate the Standard of Sales.',
    body: [
      'The Serial Sales Community exists for one reason: to prove that world-class sales is a discipline — not a personality type, not luck, not just hustle.',
      'We built this community because we were tired of watching talented sales professionals plateau alone. The strategies that actually move the needle don\'t get shared on LinkedIn. They get shared here.',
      'Our mission is to create the environment where the top 1% of sales professionals are forged — not born.',
    ],
    stat1: { number: '500+',  label: 'Active Members' },
    stat2: { number: '$2.4M+', label: 'Member Revenue Generated' },
    stat3: { number: '47',    label: 'Industries Represented' },
  },

  // ── About / Story ─────────────────────────────────────────────────────────
  about: {
    eyebrow: 'Our Story',
    headline: 'Born in the Trenches. Built for the Best.',
    body: [
      'The Serial Sales Community didn\'t start in a boardroom. It started with a group of top performers who realized that the most valuable conversations they were having weren\'t happening in any training program — they were happening between each other.',
      'We took that energy and built something permanent. A curated space where elite sales professionals can be completely candid about what\'s working, what\'s not, and how to get to the next level.',
    ],
    // ► REPLACE: real image path in /public/images/
    image: '/images/about-image.jpg',
  },

  // ── Who It's For ──────────────────────────────────────────────────────────
  whoItsFor: {
    eyebrow: 'Who This Is For',
    headline: 'This Is Not For Everyone.',
    intro: 'The Serial Sales Community is a curated, application-only network. We\'re selective because our members\' time is valuable and the quality of conversation depends on it.',
    included: [
      'Closers and AEs generating $500K+ in annual pipeline',
      'SDRs and BDRs ready to break into their first $100K year',
      'Sales leaders building and scaling high-performance teams',
      'Founders who sell and want to install a repeatable process',
      'Professionals transitioning into high-ticket sales careers',
    ],
    excluded: [
      'Anyone looking for shortcuts that don\'t require work',
      'People who aren\'t coachable or open to feedback',
      'Those not ready to invest seriously in their development',
    ],
  },

  // ── Process ───────────────────────────────────────────────────────────────
  process: {
    eyebrow: 'How It Works',
    headline: 'A System That Actually Produces Results.',
    steps: [
      { number: '01', title: 'Apply',    body: 'Submit your application. We review every submission personally and only accept members who fit our community standards.' },
      { number: '02', title: 'Onboard', body: 'Join a private onboarding call where we learn your goals, your gaps, and plug you into the right resources immediately.' },
      { number: '03', title: 'Engage',  body: 'Access live coaching calls, member forums, deal reviews, script libraries, and weekly accountability pods.' },
      { number: '04', title: 'Perform', body: 'Execute with a network of peers holding you to a higher standard. Your results become the next member\'s proof.' },
    ],
  },

  // ── Results / Stats ───────────────────────────────────────────────────────
  results: {
    eyebrow: 'Results',
    headline: "The Numbers Don't Lie.",
    body: "These aren't manufactured numbers. They're pulled from member check-ins, milestone posts, and quarterly reviews.",
    stats: [
      { number: '87%',  label: 'of members hit their next income milestone within 90 days' },
      { number: '3.2×', label: 'average increase in close rate after 60 days in the community' },
      { number: '94%',  label: 'member retention rate — people don\'t leave' },
      { number: '$0',   label: 'wasted on tactics that don\'t work — we only share what\'s proven' },
    ],
  },

  // ── Testimonial Videos ────────────────────────────────────────────────────
  // ► REPLACE: Add your 30+ videos here
  // For YouTube thumbnails use: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
  testimonialVideos: [
    { id: 1,  name: 'Member Name',  title: 'SDR → $120K in 8 Months',    videoId: 'VIDEO_ID_1',  platform: 'youtube', category: 'sdr' },
    { id: 2,  name: 'Member Name',  title: 'Closed $400K Quarter',        videoId: 'VIDEO_ID_2',  platform: 'youtube', category: 'closer' },
    { id: 3,  name: 'Member Name',  title: '3× Close Rate Improvement',   videoId: 'VIDEO_ID_3',  platform: 'youtube', category: 'closer' },
    { id: 4,  name: 'Member Name',  title: 'From Plateau to $250K',       videoId: 'VIDEO_ID_4',  platform: 'youtube', category: 'closer' },
    { id: 5,  name: 'Member Name',  title: 'Built a 12-Person Team',      videoId: 'VIDEO_ID_5',  platform: 'youtube', category: 'leader' },
    { id: 6,  name: 'Member Name',  title: 'First $50K Month',            videoId: 'VIDEO_ID_6',  platform: 'youtube', category: 'closer' },
    { id: 7,  name: 'Member Name',  title: 'Broke Into Tech Sales',       videoId: 'VIDEO_ID_7',  platform: 'youtube', category: 'sdr' },
    { id: 8,  name: 'Member Name',  title: 'Doubled Pipeline in 60 Days', videoId: 'VIDEO_ID_8',  platform: 'youtube', category: 'closer' },
    { id: 9,  name: 'Member Name',  title: '10× ROI on Membership',       videoId: 'VIDEO_ID_9',  platform: 'youtube', category: 'closer' },
    { id: 10, name: 'Member Name',  title: 'VP Sales at 28',              videoId: 'VIDEO_ID_10', platform: 'youtube', category: 'leader' },
    { id: 11, name: 'Member Name',  title: 'SDR → AE in 90 Days',         videoId: 'VIDEO_ID_11', platform: 'youtube', category: 'sdr' },
    { id: 12, name: 'Member Name',  title: '$1M Pipeline Quarter',        videoId: 'VIDEO_ID_12', platform: 'youtube', category: 'leader' },
    // ► ADD MORE: copy a line and update the values
  ],

  // ── Screenshots ───────────────────────────────────────────────────────────
  // ► REPLACE: drop images into /public/images/proof/ and list them here
  screenshots: [
    { id: 1,  src: '/images/proof/proof-01.jpg', alt: 'Member win' },
    { id: 2,  src: '/images/proof/proof-02.jpg', alt: 'Member win' },
    { id: 3,  src: '/images/proof/proof-03.jpg', alt: 'Member win' },
    { id: 4,  src: '/images/proof/proof-04.jpg', alt: 'Member win' },
    { id: 5,  src: '/images/proof/proof-05.jpg', alt: 'Member win' },
    { id: 6,  src: '/images/proof/proof-06.jpg', alt: 'Member win' },
    { id: 7,  src: '/images/proof/proof-07.jpg', alt: 'Member win' },
    { id: 8,  src: '/images/proof/proof-08.jpg', alt: 'Member win' },
    { id: 9,  src: '/images/proof/proof-09.jpg', alt: 'Member win' },
    { id: 10, src: '/images/proof/proof-10.jpg', alt: 'Member win' },
    { id: 11, src: '/images/proof/proof-11.jpg', alt: 'Member win' },
    { id: 12, src: '/images/proof/proof-12.jpg', alt: 'Member win' },
    // ► ADD MORE
  ],

  // ── Team ──────────────────────────────────────────────────────────────────
  // ► REPLACE: add real names, bios, and photos in /public/images/team/
  team: [
    {
      id: 1,
      name: 'Team Member Name',
      title: 'Founder & Lead Coach',
      bio: 'Your compelling bio here. What makes you credible? What have you built, sold, or achieved that earns the right to teach this?',
      photo: '/images/team/team-01.jpg',
      linkedin: '#',
    },
    {
      id: 2,
      name: 'Team Member Name',
      title: 'Head of Community',
      bio: 'Your bio here. Focus on results, real experience, and your passion for helping sales professionals level up.',
      photo: '/images/team/team-02.jpg',
      linkedin: '#',
    },
    {
      id: 3,
      name: 'Team Member Name',
      title: 'Sales Coach',
      bio: 'Your bio here. What specialties do you bring to the community? What industries, deal sizes, or methodologies?',
      photo: '/images/team/team-03.jpg',
      linkedin: '#',
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    { id: 1, q: 'Who is this community for?',                   a: "The Serial Sales Community is for sales professionals at every stage who are serious about becoming elite. Whether you're an SDR just starting out or an AE trying to break into seven figures, if you're coachable and committed, there's a place for you here." },
    { id: 2, q: 'What do I actually get access to?',            a: "Members get access to live coaching calls, a private community forum, curated script and playbook libraries, weekly accountability pods, deal review sessions, and direct access to our coaching team." },
    { id: 3, q: 'How is this different from other communities?', a: "We're application-only, which means every member meets a minimum standard. You're not learning alongside people who aren't serious. The conversations here are candid, tactical, and based on what's actually working — not recycled LinkedIn content." },
    { id: 4, q: 'What is the time commitment?',                 a: "We recommend a minimum of 3–5 hours per week to get full value — live calls, community engagement, and applying what you learn. That said, everything is recorded and available on-demand." },
    { id: 5, q: 'Is there a contract or can I cancel?',         a: "Membership is month-to-month. We don't lock you in because we don't need to — results retain members. You can cancel anytime with no penalty." },
    { id: 6, q: 'How do I apply?',                              a: "Click the Apply Now button anywhere on this page. The application takes about 5 minutes. We review every application personally and respond within 48 hours." },
    { id: 7, q: "What if I'm not in tech sales?",              a: "Our community spans 47+ industries. The principles of elite selling apply everywhere. We have members in insurance, real estate, SaaS, medical devices, financial services, and more." },
    { id: 8, q: 'What is the investment?',                      a: "Pricing is discussed on your onboarding call after your application is accepted. We do this intentionally — we want to understand your situation first so we can point you to the right tier." },
  ],
};
