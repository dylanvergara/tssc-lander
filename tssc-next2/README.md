# The Serial Sales Community — Next.js Landing Page

## Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
Push this folder's contents to the **root** of your GitHub repo, then import on Vercel.  
Vercel auto-detects Next.js — no config needed.

## Page Flow (in order)
1. Header — logo + name
2. Hero — VSL video + CTA
3. Disclaimer — honesty card
4. Testimonial Videos — with load more (6 at a time)
5. About — team photo + credibility copy
6. Differentiator — Proximity section
7. Mission — million dollar mission + CTA
8. Proof Wall — screenshot grid with lightbox
9. Wins — prizes + TSSC trophies
10. Longevity — trust/long-run section
11. FAQ — accordion
12. Final CTA
13. Footer

## All Content → `data/content.js`
Every word, video ID, image path, and prize lives in this one file.

### Adding Videos
```js
{ id: 13, label: '$15k first month', sub: 'Before: Retail', videoId: 'abc123', platform: 'youtube' }
```
YouTube thumbnails auto-load — no extra work needed.

### Adding Screenshots
Drop files into `public/images/proof/` then add:
```js
{ id: 13, src: '/images/proof/proof-13.jpg', alt: 'Member result' }
```

## Images Needed in `/public/images/`
- `logo-white-bg.png` ← your white background logo
- `logo-transparent.png` ← transparent logo
- `team/team-photo.jpg` ← team group photo
- `trophies/tssc-trophies-promo.jpg` ← trophies promo image
- `trophies/trophies-real.jpg` ← real trophies photo
- `proof/proof-01.jpg` through `proof-XX.jpg` ← screenshots
- `og-image.jpg` ← social share image (1200×630)
