// One entry per live training. To add a date:
// 1. Copy the current webinar object under a new key (the URL slug).
// 2. Set CURRENT_WEBINAR_SLUG when that date should be the one
//    /webinar/register and /webinar/confirmation redirect to.
//
// Slugs that are not in WEBINARS (a past date, or any unknown slug) are not
// built. middleware.js 307s those register and confirmation URLs to the
// current register page. The pages themselves 404 if a request gets through.
//
// Thank-you video is per date: thankYouVideoId. Leave it empty for the placeholder.
//
// WebinarJam opens a popup from the Save My Seat buttons. Where that popup
// sends people after signup is a WebinarJam dashboard setting, not this file.

const SITE_ORIGIN = 'https://www.serialsalescommunity.co';

/** Bare /webinar/register and /webinar/confirmation redirect here. */
export const CURRENT_WEBINAR_SLUG = '12_2_26';

export const SAVE_SEAT_LABEL = 'Save My Seat';

/** Join link and reminders come from this address. Empty renders [SENDER EMAIL]. */
export const SENDER_EMAIL = 'dylan@serialsales.co';

/** Confirmation share line. Set to '' to remove the sentence. */
export const LIVE_ROOM_CAP = 'The live room is capped at 100.';

export const PRIMER_VIDEO_URL = 'https://www.youtube.com/watch?v=wkfufV75lW8';
export const PRIMER_VIDEO_LABEL = 'What is high-ticket sales?';


// TODO: Dylan has not confirmed this start time. Assumed 8:00 PM ET.
// Wednesday, December 2, 2026. Eastern is EST (UTC-5) that week.
// 8:00 PM ET = 2026-12-03T01:00:00Z. Change startIso, endIso, startUtc, and endUtc together.
const DEC_2 = {
  slug: '12_2_26',
  hash: 'mrr55kiq',
  embedSrc: '',
  thankYouVideoId: '',
  embedBarSrc:
    'https://event.webinarjam.com/register/mrr55kiq/embed-bar?buttonText=Register&buttonBgColor=%23000000&buttonBgOpacity=0.5&barBgColor=%2329b6f6&barBgOpacity=0.95&formTemplate=2&formColor=1',
  startIso: '2026-12-03T01:00:00.000Z',
  endIso: '2026-12-03T03:00:00.000Z',
  startUtc: '20261203T010000Z',
  endUtc: '20261203T030000Z',
  h1: 'The Black Friday Encore: How to Land Your First or Next WFH Contracted Sales Job in 30 Days',
  h1Kicker: 'The Black Friday Encore',
  h1Main: 'How to Land Your First or Next WFH Contracted Sales Job in 30 Days',
  metaTitle: 'The Black Friday Encore: How to Land Your First or Next WFH Contracted Sales Job in 30 Days | TSSC Live Training',
  metaDescription:
    "Encore of the Black Friday training, Wednesday Dec 2 at 8pm ET. Live only, no replay. The system I've taught 500+ reps.",
  confirmTitle: "You're In | Black Friday Encore",
  confirmDescription: "You're registered for the encore. Wednesday, December 2 at 8pm ET. Live only, no replay.",
  eyebrowLive: 'Black Friday encore',
  eyebrowNight: 'One night only',
  eyebrowWhen: 'Wednesday, December 2 · 8:00 PM ET',
  countdownFallback: 'Starts 8:00 PM Eastern',
  lede: "The system I've taught 500+ reps, taught live one more time. Even without industry experience.",
  points: [
    'What these remote, 1099, inbound sales roles actually are and what they really pay',
    'Why the best jobs never hit LinkedIn or Indeed, and who sees them first',
    "The 3-part mechanism that gets people hired fast (it's not sales training)",
    'Black Friday-only bonuses for live attendees, including 1-on-1 time with Dylan, capped at 10',
  ],
  urgency: 'Live only. No replay. This encore is its own night.',
  reassure: "No spam. You'll get your join link plus reminders by email and text.",
  learnTitle: "What you'll walk away with on Wednesday night",
  learn: [
    {
      title: 'The real industry breakdown',
      body: "Remote, 1099, inbound appointment setting and closing roles. Real pay ranges, not the Instagram version. Who this is for and who it isn't.",
    },
    {
      title: 'The truth section',
      body: 'The reputation problem, the pyramid scheme question, whether job placement is real, and why most people fail. Nobody else in this space says this on a stage.',
    },
    {
      title: 'The 30-day mechanism',
      body: 'Access to the good roles before anyone else, showing up as the most prepared applicant, and who you know. Three things stacked.',
    },
  ],
  proofTitle: 'Proof',
  hostTitle: "Who's teaching this",
  faqTitle: 'Questions',
  faqs: [
    {
      q: 'Is this really live?',
      a: 'Yes. It runs live on Wednesday, December 2 at 8:00 PM Eastern. There is no replay, so plan to be in the room.',
    },
    {
      q: 'How long is it?',
      a: 'About 2 hours including live Q&A at the end.',
    },
    {
      q: 'What does it cost?',
      a: "Nothing. The training is free. There's an optional Black Friday offer at the end for people who want help executing.",
    },
    {
      q: 'I have no sales experience. Is this for me?',
      a: "The mechanism works without industry experience. That's the whole point of the training.",
    },
  ],
  finalTitle: 'Wednesday, December 2. 8:00 PM Eastern. Live only.',
  finalSub: 'No replay. Black Friday bonuses for live attendees only.',
  confirmEyebrow: "You're in",
  confirmMark: 'Black Friday encore. Live only. No replay.',
  confirmWhen: 'Wednesday, Dec 2 · 8:00 PM ET',
  confirmLine: "You're in · Wednesday, Dec 2 · 8:00 PM ET",
  confirmH1: 'Wednesday, December 2. 8:00 PM Eastern.',
  confirmLede: "You're in. Your seat is saved. Now watch the short video below. It's the most important step.",
  watchStep: 'Step 1',
  watchHeadline: 'Watch this video before you do anything else',
  watchWhy: "It shows you how to get the most out of the training and what to have ready so you don't fall behind live.",
  stepsTitle: 'Before Wednesday',
  steps: [
    {
      title: 'Whitelist this email address',
      body: 'Add it to your contacts so the join link stays out of spam.',
    },
    {
      title: 'Show up 10-15 minutes early',
      body: 'We start sharp at 8:00 PM Eastern.',
    },
  ],
  primerTitle: 'Get the most out of Wednesday',
  primerBody:
    "Watch this before the training. It's the best primer on what this industry actually is, and it'll make Tuesday hit twice as hard.",
  shareTitle: 'Know someone who needs this?',
  shareLead: 'Send them the registration link.',
  shareWhen: 'Live Wednesday, December 2 at 8:00 PM ET.',
  calendarLocation: 'Online. Join link arrives by email.',
  calendarDescription:
    'Black Friday encore with Dylan Vergara. How to land your first or next WFH contracted sales job in 30 days. Wednesday, December 2, 2026 at 8:00 PM Eastern. About 2 hours, including live Q&A. Live only. No replay. Your join link arrives by email. Show up 10 to 15 minutes early.',
  testimonial: {
    quote:
      'The moment I joined, I literally landed my first job and I am doing more than roofing... sit down, make a few thousand dollars, and then go hang out with my wife.',
    name: 'Josh P.',
    detail: 'left roofing sales, now a remote closer',
    interviewUrl: 'https://www.youtube.com/watch?v=UA3N3ulXwzQ',
    interviewLabel: "Watch Josh's interview",
  },
};

export const WEBINARS = {
  '12_2_26': DEC_2,
};

export function getWebinar(slug) {
  return WEBINARS[slug] || null;
}

export function getCurrentWebinar() {
  return WEBINARS[CURRENT_WEBINAR_SLUG];
}

export function registerPath(slug = CURRENT_WEBINAR_SLUG) {
  return `/webinar/register/${slug}`;
}

export function registerUrl(slug = CURRENT_WEBINAR_SLUG) {
  return `${SITE_ORIGIN}${registerPath(slug)}`;
}

export function confirmPath(slug = CURRENT_WEBINAR_SLUG) {
  return `/webinar/confirmation/${slug}`;
}

export function confirmUrl(slug = CURRENT_WEBINAR_SLUG) {
  return `${SITE_ORIGIN}${confirmPath(slug)}`;
}

export function calendarPath(slug = CURRENT_WEBINAR_SLUG) {
  return `/webinar/calendar/${slug}`;
}

export const REGISTER_URL = registerUrl();
export const CONFIRM_URL = confirmUrl();

export function senderEmailLabel() {
  const value = String(SENDER_EMAIL || '').trim();
  return value || '[SENDER EMAIL]';
}

export function senderEmailIsPlaceholder() {
  return !String(SENDER_EMAIL || '').trim();
}

export function googleCalendarUrl(webinar = getCurrentWebinar()) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: webinar.h1,
    dates: `${webinar.startUtc}/${webinar.endUtc}`,
    details: webinar.calendarDescription,
    location: webinar.calendarLocation,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(webinar = getCurrentWebinar()) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    startdt: webinar.startIso,
    enddt: webinar.endIso,
    subject: webinar.h1,
    body: webinar.calendarDescription,
    location: webinar.calendarLocation,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function icsEscape(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\n|\r/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function foldLine(line) {
  const chars = Array.from(line);
  if (chars.length <= 75) return line;
  const parts = [chars.slice(0, 75).join('')];
  for (let i = 75; i < chars.length; i += 74) {
    parts.push(` ${chars.slice(i, i + 74).join('')}`);
  }
  return parts.join('\r\n');
}

export function buildIcs(webinar = getCurrentWebinar(), now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Serial Sales Community//Live Training//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:tssc-live-training-${webinar.slug}@serialsalescommunity.co`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${webinar.startUtc}`,
    `DTEND:${webinar.endUtc}`,
    `SUMMARY:${icsEscape(webinar.h1)}`,
    `DESCRIPTION:${icsEscape(webinar.calendarDescription)}`,
    `LOCATION:${icsEscape(webinar.calendarLocation)}`,
    `URL:${registerUrl(webinar.slug)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.map(foldLine).join('\r\n')}\r\n`;
}

export function shareBlurb(webinar = getCurrentWebinar()) {
  const parts = [
    'How to land your first or next WFH contracted sales job in 30 days.',
    webinar.shareWhen,
  ];
  if (LIVE_ROOM_CAP) parts.push(LIVE_ROOM_CAP);
  return parts.join(' ');
}

export function xShareUrl(webinar = getCurrentWebinar()) {
  const params = new URLSearchParams({
    text: shareBlurb(webinar),
    url: registerUrl(webinar.slug),
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function linkedInShareUrl(webinar = getCurrentWebinar()) {
  const params = new URLSearchParams({ url: registerUrl(webinar.slug) });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}
