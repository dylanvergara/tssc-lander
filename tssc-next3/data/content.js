/**
 * TSSC CONTENT — edit this file to update all page content
 */
export const siteData = {

  meta: {
    title: 'The Serial Sales Community',
    description: 'The premier community for 1099 remote sales professionals. Real results, real people.',
    ogImage: '/images/og-image.jpg',
    url: 'https://serialsalescommunity.co',
  },

  ctaUrl: 'https://bl1yxjc3x33.typeform.com/to/FVsMAspu',
  ctaText: 'Apply to TSSC',

  // ── HERO VSL ──────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Watch this first',
    headline: 'Everything you need to know is in this video.',
    vslVideoId: 'XQ4AVDtHg0M',
    platform: 'youtube',
  },

  // ── DISCLAIMER ────────────────────────────────────────────────────────────
  disclaimer: {
    headline: 'Mind if we start off on the right foot?',
    paragraphs: [
      { text: 'Heavily performance-based 1099 remote sales roles are inherently "risky".', bold: true },
      { text: 'In fact, most people even see traditional sales roles as "risky".', bold: false },
      { text: "Nothing you see on this page is easy or guaranteed.", bold: false },
      { text: "Our intention is simply to show you what has been done with our help, that's it.", bold: false },
      { text: "Unbelievable guarantees and earnings claims attract the opposite of who we want inside TSSC.", bold: false },
      { text: "We have, and will always use transparent member results to find right people for our community.", bold: false },
      { text: "After all, it's the community element that has proven to be the most valuable since we began in 2022.", bold: false },
      { text: "Remember: Nobody will ever care about your own success more than you do.", bold: false },
      { text: "Now let's continue...", bold: false },
    ],
  },

  // ── TESTIMONIAL CAROUSEL GROUPS ───────────────────────────────────────────
  // Each group is a horizontal swipe carousel with a headline
  // ► REPLACE videoId with your real YouTube/Vimeo/Loom IDs
  testimonialCarousels: [
    {
      id: 'carousel-1',
      headline: 'A look into TSSC...',
      subhead: 'Swipe to hear from members →',
      videos: [
        { id: 1,  label: '2 yr review: $30k/mo',       sub: 'Before: B2B Insurance Sales',   videoId: 'XQ4AVDtHg0M', platform: 'youtube' },
        { id: 2,  label: '$11.7k/mo in 3 months',      sub: 'Before: Capped Tech SDR',       videoId: 'VIDEO_ID_2',  platform: 'youtube' },
        { id: 3,  label: '$18k/mo in 60 days',         sub: 'Before: Solar Sales',           videoId: 'VIDEO_ID_3',  platform: 'youtube' },
        { id: 4,  label: 'First $10k month',           sub: 'Before: No Experience',         videoId: 'VIDEO_ID_4',  platform: 'youtube' },
        { id: 5,  label: '$22k/mo closing SaaS',       sub: 'Before: Retail Manager',        videoId: 'VIDEO_ID_5',  platform: 'youtube' },
        { id: 6,  label: '6 figures in year one',      sub: 'Before: College Graduate',      videoId: 'VIDEO_ID_6',  platform: 'youtube' },
      ],
    },
    {
      id: 'carousel-2',
      headline: "More member stories.",
      subhead: 'Swipe to hear more →',
      videos: [
        { id: 7,  label: '$14k first full month',      sub: 'Before: Door-to-Door Sales',    videoId: 'VIDEO_ID_7',  platform: 'youtube' },
        { id: 8,  label: 'Quit 9-5 in 45 days',        sub: 'Before: Corporate Marketing',   videoId: 'VIDEO_ID_8',  platform: 'youtube' },
        { id: 9,  label: '$9k/mo part time',           sub: 'Before: Nurse Practitioner',    videoId: 'VIDEO_ID_9',  platform: 'youtube' },
        { id: 10, label: '$30k month, 2 yr member',    sub: 'Before: Auto Sales',            videoId: 'VIDEO_ID_10', platform: 'youtube' },
        { id: 11, label: 'Hired in week one',          sub: 'Before: Recent Graduate',       videoId: 'VIDEO_ID_11', platform: 'youtube' },
        { id: 12, label: '$25k/mo within 90 days',     sub: 'Before: Financial Advisor',     videoId: 'VIDEO_ID_12', platform: 'youtube' },
      ],
    },
    {
      id: 'carousel-3',
      headline: "Still not convinced?",
      subhead: 'Here are even more →',
      videos: [
        { id: 13, label: '$17k mo, single parent',     sub: 'Before: Bartender',             videoId: 'VIDEO_ID_13', platform: 'youtube' },
        { id: 14, label: 'Remote job in 3 weeks',      sub: 'Before: In-Person Only Sales',  videoId: 'VIDEO_ID_14', platform: 'youtube' },
        { id: 15, label: '$40k best month ever',       sub: 'Before: Real Estate Agent',     videoId: 'VIDEO_ID_15', platform: 'youtube' },
        { id: 16, label: 'From $3k to $18k/mo',        sub: 'Before: SDR 2 Years Stuck',     videoId: 'VIDEO_ID_16', platform: 'youtube' },
        { id: 17, label: 'Consistent $15k months',    sub: 'Before: Gym Sales',             videoId: 'VIDEO_ID_17', platform: 'youtube' },
        { id: 18, label: 'VP Sales at 26',             sub: 'Before: Entry Level AE',        videoId: 'VIDEO_ID_18', platform: 'youtube' },
      ],
    },
  ],

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  about: {
    // dylan-presenting.jpg is the room full of people photo
    image: '/images/team/dylan-presenting.jpg',
    headline: "Sales training doesn't get you hired, we do.",
    paragraphs: [
      "Whether you've got sales experience or not, we have a process that's been proven across 100's of members.",
      'Many out there have convinced the public that the reason they aren\'t making X amount/mo is because they aren\'t "good enough" yet.',
      "Well, I'm here to share that simply is not the case.",
      "We've been doing this longer than the sales coach who wants to teach you a new way to handle a spouse objection has been in sales.",
      "And a good portion of this has you and I working together directly. No outsourced fulfillment.",
      "Frequent 1-1 and small group interactions. Our process is iron-clad.",
    ],
  },

  // ── PROCESS TIMELINE ──────────────────────────────────────────────────────
  process: {
    eyebrow: 'The Process',
    headline: 'Your first 6 months, mapped out.',
    subhead: "This is what happens after you join. Every touchpoint, every milestone — laid out so you know exactly what you're getting into.",
    // The 6-month timeline graphic
    image: '/images/process-timeline.png',
    steps: [
      { number: '01', title: 'Onboard',  body: '1-1 onboarding call with CSM. TSSC custom roadmap call with Dylan.' },
      { number: '02', title: 'Position', body: 'Market positioning call with Dylan. New member care package received.' },
      { number: '03', title: 'Apply',    body: 'CSM check-ins and reports. Hiring open floor with Dylan and Recruiting Team.' },
      { number: '04', title: 'Audit',    body: 'Progress audit call with Dylan. Refinements based on what\'s working.' },
      { number: '05', title: 'Review',   body: '1-1 call review with Dylan. Fine-tune your approach for maximum placement.' },
      { number: '06', title: 'Perform',  body: 'Full 1-1 DM access throughout. Member-to-member support network active.' },
    ],
  },

  // ── DIFFERENTIATOR ────────────────────────────────────────────────────────
  differentiator: {
    headline: 'The difference maker?',
    accentWord: 'Proximity.',
    paragraphs: [
      'Through years of trial-and-error, we crafted a bullet-proof process.',
      'Taking beginners and experts alike, from no job, to having a job ideally in 3-5 weeks.',
      'We provide access to hundreds of inbound sales roles/mo (yes, hundreds).',
      'Our record to-date is 966 open 1099 remote sales roles in a single month.',
      'No pyramid schemes, licensing required, or any of that other lame stuff.',
      'Just online businesses who charge a lot of money for online services through an inbound funnel.',
      'We hyper-fixate on the application funnel. So not only do you have inbound job-flow of the top 1%...',
      "You've got the best resume, top-tier loom videos, and a better understanding than most others in the space when it comes to how hiring decisions are made.",
    ],
  },

  // ── MISSION ───────────────────────────────────────────────────────────────
  mission: {
    headline: 'Will you join our',
    accentLine: 'million-dollar mission?',
    paragraphs: [
      'Our mission is simple.',
      'We want to film one hundred confirmed $10,000/mo interviews with TSSC members.',
      '$1,000,000 in "first time" five-figure/mo earnings through 1099 remote sales roles.',
      'As of the beginning of 2026, we are around ~50 and scaling.',
      'Many of the results you will see on this page meet this criteria.',
      'Will you be next?',
    ],
  },

  // ── PROOF SCREENSHOTS ─────────────────────────────────────────────────────
  proof: {
    headline: "It's worked for them.",
    subhead: 'Screenshots from inside the community. Posted by members, shared with permission.',
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
  },

  // ── WINS / TROPHIES ───────────────────────────────────────────────────────
  wins: {
    headline: 'We win when you win.',
    paragraphs: [
      'Given our marketing is dependent on the results of members inside — we truly only win when the members win.',
      'And when the members win, they win big.',
      'We run a "Wins Challenge" every month. Post a qualifying win, get points toward an EOM prize drawing.',
    ],
    prizeHeadline: 'Last 12 months of prizes:',
    prizes: [
      'Custom TSSC Yeti Beverage Bucket',
      'Apple Airpods Max',
      'Pro Shure Mic/Boom Arm + Blue Light Blockers',
      'Large Framed Poster from Drool Art',
      'Keurig K-Duo + Coffee Supply',
      'Custom Engraved Ember Travel Mug 2',
      'WHOOP Peak + 12 Month Subscription',
      'VIP Ticket to our Annual Meet-Up in ATX',
      'Portable JBL Xtreme 4 Speaker',
      'Casabrews Ultra Espresso Machine',
      'A Weekend in ATX with TSSC and friends',
      'Mini-fridge Filled with Beverage of Choice',
    ],
    // IMG_2141 — the TSSC Trophies promo graphic
    trophyPromoImage: '/images/trophies/trophies-promo.png',
    // IMG_7294 — real trophies lined up on floor
    trophyRealImage:  '/images/trophies/trophies-real.jpg',
    // 3__CongressVenue-96 — group shot at meet up with trophies
    meetupImage: '/images/events/meetup-trophies.jpg',
    trophyCaptions: [
      'And not to mention, our TSSC trophies.',
      'Hit a big commission milestone — $10k, $20k, or $30k/mo — and a custom engraved trophy ships to your door within the week.',
      'And yes, people are hitting the milestones...',
    ],
  },

  // ── EVENTS / COMMUNITY ────────────────────────────────────────────────────
  // The 3 small event screenshots
  events: {
    headline: 'This is what the community looks like.',
    subhead: 'In-person events, workshops, and meetups — we show up for each other.',
    images: [
      { src: '/images/events/outdoor-meeting.jpg',  caption: 'Member strategy sessions' },
      { src: '/images/events/presentation.jpg',     caption: 'Live workshops & training' },
      { src: '/images/events/community-night.jpg',  caption: 'Annual ATX meet-up' },
    ],
  },

  // ── LONGEVITY ─────────────────────────────────────────────────────────────
  longevity: {
    headline: "We're here for the long-run, don't worry.",
    paragraphs: [
      "Our reputation is the reason we're still here. Dating all the way back to August of 2022.",
      "In that time, we've seen a lot of people come and go.",
      "We've had ex-members become competitors... We've helped publish some massive names...",
      "But what we haven't done is over-promise and under-deliver.",
      "Don't be fooled by a flashy car and a cool Miami balcony view. These new guys are one bad month from being the next phenom crypto day-trading coach.",
      "You won't find legit negative press on us.",
      "I, Dylan, put the only first and last name I've got on this business and blast it far and wide across the internet. We don't take it lightly.",
      "Plus, if we were doing bad business, would we be selling out in-person events where people pay us to fly in from all over the world?",
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    { id: 1, q: 'Do I need prior sales experience?',        a: "No. We take beginners and experienced reps alike. Our process works regardless of background. The most important thing is coachability and drive." },
    { id: 2, q: 'What kind of roles do you help me get?',   a: "We focus exclusively on 1099 remote closing and setting roles for online businesses. High-ticket, inbound, work-from-anywhere positions." },
    { id: 3, q: 'How quickly can I get placed?',            a: "Most members ideally land a role within 3-5 weeks. Some faster, some longer — it depends on how quickly you execute the process we give you." },
    { id: 4, q: 'Is this a pyramid scheme or MLM?',         a: "Absolutely not. No licensing required, no buying inventory, no recruiting your family. These are legitimate 1099 remote sales jobs with real companies." },
    { id: 5, q: 'What does the community look like day-to-day?', a: "Active community channels, weekly group calls, 1-1 touchpoints with our team, job board access, deal reviews, and a group of people all in the same pursuit as you." },
    { id: 6, q: 'What is the investment?',                  a: "We discuss pricing on a call after your application is reviewed. We want to make sure TSSC is the right fit before talking numbers. Apply and we'll reach out within 48 hours." },
  ],
};
