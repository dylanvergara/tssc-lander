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

## Sales Role of the Day

One template serves every role at `/srotd/<keyword>`. The first role is `/srotd/sts`. Unknown keywords 404. Pages send `noindex`.

### Add a role

1. Copy `data/srotd/sts.json` to `data/srotd/<keyword>.json`.
2. Set `keyword` to that same slug (lowercase letters, numbers, hyphens). The filename and the `keyword` field must match.
3. Edit `role`, `niche`, `ote`, `source`, `headline`, `disclaimer`, and `meta` (`title`, `description`, `ogImage`).
4. `highlights` can hold more than three strings. The page shows the first three only. Put the lines you want on the page first.
5. `extraDetails` is optional and is not rendered. Use it for notes you do not want on the lander.
6. Background photo: drop a file in `public/srotd/`, then set `backgroundImage` to that path, for example `/srotd/sts.jpg`. Leave it `""` to keep the built-in dark background.
7. `utm` defaults to `utm_source=instagram`, `utm_medium=manychat_dm`, `utm_campaign=srotd`, `utm_content=<keyword>`. Set any of those keys in the JSON to change the default. A matching param on the incoming URL overrides the default. The signup component receives the resolved values as hidden fields.

The handwritten face for the values is set in one place: `lib/srotd/fonts.js` (Caveat). The Beehiiv publication id for Dylan's Newsletter lives in `lib/srotd/config.js`. The subscribe form is not connected yet. The only place to mount it is `components/srotd/SrotdSignup.js`.

## Wins Challenge

`/wins-challenge` reads tallies from `data/wins-challenge.json`. `GET /api/wins-challenge` returns that file, then fills a null `winner` when a drawing has been locked and adds a `drawing` object on every month. A tally bot can still replace the file in a pull request. Do not infer a winner from the leaderboard. If a month has no announcement and no locked drawing, `winner` stays `null`.

The page treats the current month as the `YYYY-MM` key in America/Chicago when that month is in the file. Otherwise it uses the latest month in the file. The wheel lists months that do not have a winner yet. Visitors can look. Only an admin can spin, mark someone not present, or lock the final winner.

Open `/wins-challenge?admin=YOUR_KEY` once. If `WINS_ADMIN_KEY` matches, the key is saved in localStorage and the query string is removed. After a spin, **Not present - spin again** drops that person from this drawing and spins again. **Final winner** locks the month. Both are written to Vercel Blob (`wins-challenge/drawings.json`) with a timestamp, so a reload or another device sees the same log. History shows `Winner: X. Picked but not present: A, B.`

Env vars for the Vercel project:

- `WINS_ADMIN_KEY`: shared secret for the drawing buttons.
- `BLOB_READ_WRITE_TOKEN`: from a Blob store connected to the project. A connected private store may set `BLOB_STORE_ID` instead and use Vercel OIDC. Reads and writes use private access unless `BLOB_ACCESS=public`.

Names in the file must be first name plus last initial (`Alex P.`). A single first name is fine when that is all Circle has (`Billie`). The page shortens anything longer before it renders. Drawing names are stored the same way.

### Schema

```json
{
  "generatedAt": "2026-11-03T21:17:59Z",
  "tiers": { "Life Changer": 7, "Record Breaker": 6, "Offer Accepted": 5, "Commission Earned": 4, "Community Assist": 3, "Interview Win": 2, "Other": 1 },
  "months": [
    {
      "month": "2026-11",
      "winner": null,
      "tally": [
        {
          "memberId": "123",
          "name": "Alex P.",
          "avatarUrl": "https://example.com/a.jpg",
          "points": 7,
          "entries": [
            { "postId": 1, "date": "2026-11-02T15:00:00.000Z", "topic": "Life Changer", "points": 7 }
          ]
        }
      ]
    }
  ],
  "meta": { "spaceUrl": "https://the-serial-sales-community.circle.so/c/wins" }
}
```

- `generatedAt`: ISO timestamp for when the file was built.
- `tiers`: topic name to point value. The page sorts these highest first.
- `months`: oldest first. `month` is `YYYY-MM`.
- `winner`: `null`, or `{ name, avatarUrl, sourceUrl }`. `sourceUrl` is the announcement post. `null` means unknown. The API replaces a null winner with `{ name, avatarUrl, sourceUrl: null }` when a drawing final winner is locked.
- `drawing`: API only. `{ absent: [{ memberId, name, avatarUrl, at }], finalWinner: null or the same person shape }`. `at` is an ISO timestamp. Not stored in the tally file.
- `tally`: one object per member. `points` is the slice weight and must match the sum of `entries[].points`. `entries[].topic` should be a key in `tiers`.
- `meta`: notes for the bot. The page only reads `meta.spaceUrl`.
