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

## Wins Challenge

`/wins-challenge` reads tallies from `data/wins-challenge.json`. `GET /api/wins-challenge` returns that file, then fills a null `winner` when a drawing has been locked and adds a `drawing` object on every month. A tally bot can still replace the file in a pull request. Do not infer a winner from the leaderboard. If a month has no announcement and no locked drawing, `winner` stays `null`.

The page treats the current month as the `YYYY-MM` key in America/Chicago when that month is in the file. Otherwise it uses the latest month in the file. The wheel lists months that do not have a winner yet. Visitors can look. Only an admin can spin, mark someone not present, or lock the final winner.

Open `/wins-challenge?admin=YOUR_KEY` once. If `WINS_ADMIN_KEY` matches, the key is saved in localStorage and the query string is removed. After a spin, **Not present - spin again** drops that person from this drawing and spins again. **Final winner** locks the month. Both are written to Vercel Blob (`wins-challenge/drawings.json`) with a timestamp, so a reload or another device sees the same log. History shows `Winner: X. Picked but not present: A, B.`

Env vars for the Vercel project:

- `WINS_ADMIN_KEY`: shared secret for the drawing buttons.
- `BLOB_READ_WRITE_TOKEN`: from a Blob store connected to the project. A connected private store may set `BLOB_STORE_ID` instead and use Vercel OIDC. Reads and writes use private access unless `BLOB_ACCESS=public`.

Names are first name plus last initial (`Alex P.`). A single first name is fine when that is all Circle has (`Billie`). The page shortens anything longer before it renders. Profiles live in `data/wins-members.json`, keyed by Circle user id:

```json
{
  "123": {
    "id": "123",
    "displayName": "Alex P.",
    "avatarUrl": "/images/wins-members/123.jpg",
    "circleProfileUrl": "https://the-serial-sales-community.circle.so/u/public_uid"
  }
}
```

`GET /api/wins-challenge/members` returns that registry after adding any member id found in `data/wins-challenge.json` that is not saved yet. Existing `displayName` and `avatarUrl` are not replaced. A missing `circleProfileUrl` can be filled in. The tally bot should commit new profiles into `data/wins-members.json` and leave saved profiles alone unless a profile is being changed on purpose.

Month tallies reference `memberId`. Optional `name`, `avatarUrl`, and `circleProfileUrl` on a tally row are only used the first time that id is seen. Avatars are cached under `public/images/wins-members/`. If a photo is missing or broken, the page shows initials.

Drawings and history use the saved profile for the name, photo, and Circle link.

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
- `winner`: `null`, or `{ memberId, sourceUrl }`. `sourceUrl` is the announcement post. `null` means unknown. The API fills the name and photo from the member registry, and replaces a null winner when a drawing final winner is locked.
- `drawing`: API only. `{ absent: [{ memberId, name, avatarUrl, at }], finalWinner: null or the same person shape }`. `at` is an ISO timestamp. Not stored in the tally file.
- `tally`: one object per member. `points` is the slice weight and must match the sum of `entries[].points`. `entries[].topic` should be a key in `tiers`.
- `meta`: notes for the bot. The page only reads `meta.spaceUrl`.
