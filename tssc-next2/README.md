# The Serial Sales Community — Next.js v3

## Quick Start
```bash
npm install && npm run dev
# http://localhost:3000
```

## Deploy → Vercel
Push contents of this folder to the ROOT of your GitHub repo. Vercel auto-detects Next.js.

## Images included (place in public/images/)
- `logo-white-bg.png` / `logo-transparent.png` — logos ✓
- `team/dylan-presenting.jpg` — Dylan presenting to room ✓ → About section
- `events/meetup-trophies.jpg` — 3rd Annual Meet Up group shot ✓ → Wins section
- `trophies/trophies-real.jpg` — trophies lined up on floor ✓ → Wins section
- `trophies/trophies-promo.png` — TSSC Trophies graphic ✓ → Wins section
- `events/outdoor-meeting.jpg` — outdoor member session ✓ → Events section
- `events/presentation.jpg` — live workshop ✓ → Events section
- `events/community-night.jpg` — group night out ✓ → Events section
- `process-timeline.png` — 6-month student timeline ✓ → Process section

## Adding proof screenshots
Drop into `public/images/proof/` and add to `data/content.js`:
```js
{ id: 13, src: '/images/proof/proof-13.jpg', alt: 'Member win' }
```

## Adding testimonial videos
In `data/content.js`, find `testimonialCarousels` and add to any carousel array:
```js
{ id: 19, label: '$15k first month', sub: 'Before: Retail', videoId: 'YOUR_YT_ID', platform: 'youtube' }
```
