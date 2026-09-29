// Single source of truth for Success Query (/sqdb) interview links.
//
// The model is told which members have interviews, but the final href is
// always decided here: every YouTube link in an assistant reply is rewritten
// to the canonical https://www.youtube.com/watch?v=ID for the member it
// belongs to, so a mistyped ID, stale playlist params, or the wrong member's
// video can never reach the user.
//
// Order matters: when a member has more than one video, the first entry is
// their primary interview.

export const PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLZ9SGNF-tCG3zwAu8lrpR9N_WbL4JQn3W';

// [member name as used in chat answers, YouTube video ID]
export const INTERVIEW_LINKS = [
  ["Sarith S.", "by5RzbjxiO8"],
  ["Reda T.", "mziE3tvVzdM"],
  ["Miriam C.", "PVfqwyuHNTQ"],
  ["Jake M.", "sF9xm4Na2yQ"],
  ["Jase S.", "2HzfzaJ__QU"],
  ["Ethan Z.", "aAx8DWwdIiQ"],
  ["Josh H.", "UUM_Kf6rlRY"],
  ["Zach S.", "fiRZj6Pt8To"],
  ["Jordan W.", "ZBfGJmzLWoM"],
  ["Joe E.", "K2jGMM0KkD8"],
  ["Chris P.", "0qkQzPdb40s"],
  ["Jordan Z.", "cIKgkBmLNeg"],
  ["Dalton M.", "mEhWcYqac-U"],
  ["Chris C.", "ej2TCqn-FbA"],
  ["Somil M.", "07r72x6zNz0"],
  ["Valentim D.", "IgIlHG82HRc"],
  ["David L.", "l5A5vnW7n_o"],
  ["Franklyn P.", "9h4AomeCIjY"],
  ["Noah M.", "u5Jt-M2BYmo"],
  ["Robbie B.", "Zaw1PwooYmU"],
  ["Paul S.", "0EJvocphe1E"],
  ["DeAvin R.", "8bJ2Jq-n1k4"],
  ["Josh P.", "UA3N3ulXwzQ"],
  ["Aaron F.", "EnAfMcCT-gg"],
  ["Julian D.", "8ZSGY5P14j8"],
  ["Burhan A.", "M7SDqaGnCuk"],
  ["Noah S.", "RH1tLrZeXqE"],
  ["Moe I.", "LS2UzFdwTJE"],
  ["Jake S.", "XfmfnANJ8vc"],
  ["Brady B.", "w3DoRxHNzBs"],
  ["Mauricio G.", "8y1L6JnZu5k"],
  ["Apostalos S.", "6Eu62BkCI7U"],
  ["Kam I.", "VcIFitTDRLE"],
  ["Drew D.", "LRhqJEXoOZ4"],
  ["Jaryd J.", "n74DuGv-dSg"],
  ["Gary R.", "o_-dztM0OLA"],
  ["Caden H.", "tBJTAuwHkFw"],
  ["Nick V.", "pqkm1Pau9LY"],
  ["Angel M.", "H-1BVXB-vtQ"],
  ["Sam W.", "CZ3ZZ_i_vmo"],
  ["Diego M.", "tn-kzQohbhU"],
  ["Ty N.", "WlA8HHM9_Zs"],
  ["Garret T.", "vHqWjtq4CVE"],
  ["Noah B.", "Lcwj3WlIQO8"],
  ["Jake P.", "iDchGIpIH24"],
  ["Daniel F.", "3bCy4fuABSs"],
  ["David H.", "ncLVggg5N_c"],
  ["Jon B.", "N_i2wRgC5EU"],
  ["Benny S.", "TXjOXmzzj6o"],
  ["George D.", "1Wq1FSPYm5Q"],
  ["Deniz T.", "ignIURf-G-k"],
  ["Jason S.", "Zohndt8yRTI"],
  ["Ian M.", "3E57483fJBI"],
  ["George K.", "BG0WkZV6_Rs"],
  ["Cole A.", "toAXtjogewg"],
  ["Daniel B.", "9kQw7-4BvhM"],
  ["Tristen N.", "LbBabkwOnH8"],
  ["Meelod R.", "oGBRnxPIkS4"],
  ["Dan R.", "RJLy5buhlM4"],
  ["DeAvin R.", "wgX8ltp5AEI"],
  ["Terry E.", "PE4aEXb3uNA"],
  ["Drew L.", "BxABlacPKRc"],
  ["Camilo M.", "n1wOAEm4sS4"],
  ["Fardeed A.", "LY86VWoqoV8"],
  ["Jordan W.", "Gh181tLC92A"],
  ["Kendra", "tPWQK3P1nvM"],
  ["Fernando A.", "9ui_0lbNYcE"],
  ["Justin S.", "pGS14kXemxk"],
  ["Marco G.", "q9HWqDHy0s8"],
  ["Austin L.", "tIzn1qr_4lg"],
  ["Kade T.", "7JMXVr4FCfs"],
  ["Josh C.", "2KHqnY1xpFA"],
  ["Luka K.", "pgTv6T0joKQ"],
  ["Apostalos S.", "BJz-R6LsYgs"],
  ["Trett J.", "TZf3RzkJn2k"],];

const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function watchUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

// Lines for the system prompt, e.g. "Gary R.: https://www.youtube.com/watch?v=o_-dztM0OLA"
export const INTERVIEW_LINKS_PROMPT = INTERVIEW_LINKS.map(
  ([name, id]) => `${name}: ${watchUrl(id)}`
).join('\n');

const MEMBERS = (() => {
  const byName = new Map();
  for (const [name, id] of INTERVIEW_LINKS) {
    if (!byName.has(name)) {
      const [first, last = ''] = name.split(' ');
      byName.set(name, { name, first, initial: last.replace('.', ''), ids: [] });
    }
    byName.get(name).ids.push(id);
  }
  return [...byName.values()];
})();

const ID_TO_MEMBER = new Map();
for (const m of MEMBERS) for (const id of m.ids) ID_TO_MEMBER.set(id, m);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

// Pull a video ID out of any YouTube URL shape (watch, youtu.be, shorts, embed, live).
export function extractYouTubeId(rawUrl) {
  if (!rawUrl) return null;
  let url;
  try {
    url = new URL(rawUrl.replace(/&amp;/gi, '&'));
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, '');
  let id = null;
  if (host === 'youtu.be') id = url.pathname.split('/')[1];
  else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    id = url.searchParams.get('v');
    if (!id) {
      const m = url.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/?#]+)/);
      if (m) id = m[1];
    }
  }
  return id ? id.trim() : null;
}

export function isYouTubeUrl(rawUrl) {
  try {
    const host = new URL(rawUrl).hostname.replace(/^www\.|^m\./, '');
    return host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com');
  } catch {
    return false;
  }
}

// Members named in the CTA label, e.g. "Watch Gary's full interview →" -> [Gary R.].
function membersInLabel(label) {
  if (!label) return [];
  const exact = MEMBERS.filter((m) =>
    m.initial && new RegExp(`\\b${escapeRe(m.first)}\\s+${escapeRe(m.initial)}(?:\\.|\\b)`).test(label)
  );
  if (exact.length) return exact;
  return MEMBERS.filter((m) => new RegExp(`\\b${escapeRe(m.first)}\\b`).test(label));
}

// When several members share a first name (Noah M./S./B.), pick the one whose
// "First L." was mentioned most recently before the link.
function disambiguate(candidates, context) {
  if (candidates.length <= 1) return candidates[0] || null;
  let best = null;
  let bestPos = -1;
  const text = context || '';
  for (const m of candidates) {
    const re = new RegExp(`\\b${escapeRe(m.first)}\\s+${escapeRe(m.initial)}(?:\\.|[a-z]*)`, 'g');
    let match;
    while ((match = re.exec(text)) !== null) {
      if (match.index > bestPos) {
        bestPos = match.index;
        best = m;
      }
    }
  }
  return best;
}

// Most recently mentioned member of any name in the preceding text (for bare URLs with no CTA).
function lastMentionedMember(context) {
  const text = (context || '').slice(-600);
  let best = null;
  let bestPos = -1;
  for (const m of MEMBERS) {
    const re = new RegExp(`\\b${escapeRe(m.first)}\\b`, 'g');
    let match;
    while ((match = re.exec(text)) !== null) {
      if (match.index > bestPos) {
        bestPos = match.index;
        best = m;
      }
    }
  }
  if (!best) return null;
  const sameFirst = MEMBERS.filter((m) => m.first === best.first);
  return sameFirst.length > 1 ? disambiguate(sameFirst, context) : best;
}

function nearestId(id, pool) {
  if (!id) return null;
  let best = null;
  let bestD = Infinity;
  for (const cand of pool) {
    const d = levenshtein(id, cand);
    if (d < bestD) {
      bestD = d;
      best = cand;
    }
  }
  return bestD <= 3 ? best : null;
}

// Decide the canonical URL for one YouTube link in a reply.
export function resolveInterviewUrl(rawUrl, label = '', context = '') {
  const id = extractYouTubeId(rawUrl);
  const known = id && VIDEO_ID_RE.test(id) ? ID_TO_MEMBER.get(id) : null;

  let candidates = membersInLabel(label);
  if (candidates.length > 1) {
    const picked = disambiguate(candidates, context);
    if (picked) candidates = [picked];
  }
  if (!candidates.length && !known) {
    const mentioned = lastMentionedMember(`${context} ${label}`);
    if (mentioned) candidates = [mentioned];
  }

  // Valid, known ID that agrees with the member named in the CTA (or no name given).
  if (known && (!candidates.length || candidates.includes(known))) return watchUrl(id);

  // The CTA names one member: use that member's video (nearest of theirs if they have several).
  if (candidates.length === 1) {
    const m = candidates[0];
    return watchUrl(nearestId(id, m.ids) || m.ids[0]);
  }

  // Ambiguous name, known ID: keep it.
  if (known) return watchUrl(id);

  // Unknown/garbled ID: snap to the closest real interview ID if it is a near miss.
  const pool = candidates.length ? candidates.flatMap((m) => m.ids) : [...ID_TO_MEMBER.keys()];
  const near = nearestId(id, pool);
  if (near) return watchUrl(near);

  // Never show a dead link: fall back to the full interview playlist.
  return PLAYLIST_URL;
}

const TRAILING_PUNCT_RE = /[.,;:!?)\]}'"»”’*_]+$/;

export function splitTrailingPunctuation(url) {
  const m = url.match(TRAILING_PUNCT_RE);
  if (!m) return [url, ''];
  return [url.slice(0, -m[0].length), m[0]];
}

// Rewrite every YouTube link in an assistant reply to its canonical URL.
// Handles [CTA](url), [HYPERLINK: CTA](url), <url> and bare URLs.
export function canonicalizeInterviewLinks(text) {
  if (!text) return text;
  const re = /\[(?:HYPERLINK:\s*)?((?:[^\[\]]|\[[^\[\]]*\])+)\]\(\s*<?(https?:\/\/[^\s)>]+)>?\s*\)|<?(https?:\/\/[^\s<>]+)>?/g;
  let out = '';
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    const before = text.slice(0, match.index);
    out += text.slice(last, match.index);
    if (match[2]) {
      const label = match[1].replace(/\*\*|[\[\]]/g, '').trim();
      const url = isYouTubeUrl(match[2]) ? resolveInterviewUrl(match[2], label, before) : match[2];
      out += `[${label}](${url})`;
    } else {
      const [url, trailing] = splitTrailingPunctuation(match[3]);
      if (isYouTubeUrl(url)) {
        const lineStart = before.lastIndexOf('\n') + 1;
        const label = before.slice(lineStart);
        out += resolveInterviewUrl(url, label, before) + trailing;
      } else {
        out += match[0];
      }
    }
    last = match.index + match[0].length;
  }
  out += text.slice(last);
  return out;
}
