# The Serial Sales Community — Next.js Landing Page

## Quick Start

```bash
npm install
npm run dev
```
Open **http://localhost:3000**

---

## Deploy to Vercel (GitHub → Vercel)

1. Push this folder to your GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js — **no settings needed**
4. Hit Deploy ✓

Every push to `main` auto-redeploys.

---

## File Structure

```
tssc-next/
├── app/
│   ├── layout.js        ← root layout + metadata
│   ├── page.js          ← assembles all sections
│   └── globals.css      ← all styles
├── components/
│   ├── Nav.js
│   ├── Hero.js          ← also exports VideoFacade (reused in TestimonialVideos)
│   ├── StatsBar.js
│   ├── Mission.js
│   ├── About.js
│   ├── WhoItsFor.js
│   ├── Process.js
│   ├── Results.js
│   ├── TestimonialVideos.js
│   ├── ProofWall.js
│   ├── Team.js
│   ├── FAQ.js
│   ├── FinalCTA.js
│   ├── Footer.js
│   └── ScrollReveal.js
├── data/
│   └── content.js       ← ⭐ ALL YOUR CONTENT LIVES HERE
└── public/
    └── images/
        ├── logo-white-bg.png
        ├── logo-transparent.png
        ├── vsl-thumbnail.jpg
        ├── about-image.jpg
        ├── og-image.jpg
        ├── team/
        │   ├── team-01.jpg
        │   └── ...
        └── proof/
            ├── proof-01.jpg
            └── ...
```

---

## Adding Content

### Videos
In `data/content.js`, add to `testimonialVideos`:
```js
{ id: 13, name: 'Jane Smith', title: 'First $100K Year', videoId: 'abc123', platform: 'youtube', category: 'sdr' }
```
- `platform`: `'youtube'` | `'vimeo'` | `'loom'`
- `category`: `'closer'` | `'sdr'` | `'leader'` (for filter tabs)
- YouTube thumbnails auto-load from `img.youtube.com` — no extra work needed

### Screenshots
Drop files into `public/images/proof/` then add to `screenshots` array:
```js
{ id: 19, src: '/images/proof/proof-19.jpg', alt: 'Member win' }
```

### Brand Colors
Edit CSS variables at the top of `app/globals.css`:
```css
:root {
  --blue:  #b6cdde;
  --black: #0d0d0d;
  --white: #fafafa;
}
```
