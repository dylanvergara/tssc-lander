import fs from 'fs';
import path from 'path';
import { SROTD_DEFAULT_UTM, SROTD_MAX_HIGHLIGHTS, SROTD_RESERVED_KEYWORDS, SROTD_UTM_KEYS } from './config';

const DATA_DIR = path.join(process.cwd(), 'data', 'srotd');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const REQUIRED = ['keyword', 'role', 'niche', 'ote', 'source', 'headline', 'disclaimer'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_SROTD = /^\/srotd\/[A-Za-z0-9._/-]+$/;

function fail(message) {
  throw new Error(`SROTD: ${message}`);
}

function requireText(data, field, file) {
  const value = data[field];
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${file} is missing a non-empty "${field}" string`);
  }
  return value.trim();
}

function optionalText(value, field, file) {
  if (value == null || value === '') return '';
  if (typeof value !== 'string') fail(`${file} ${field} must be a string`);
  return value.trim();
}

function publicFile(urlPath) {
  if (urlPath.includes('..')) return null;
  const abs = path.join(PUBLIC_DIR, urlPath);
  const root = path.resolve(PUBLIC_DIR);
  const resolved = path.resolve(abs);
  if (!resolved.startsWith(root + path.sep)) return null;
  return fs.existsSync(resolved) ? resolved : null;
}

function resolveBackground(keyword, value) {
  if (value == null || value === '') return null;
  if (typeof value !== 'string') {
    fail(`${keyword}.json backgroundImage must be a path under public/srotd/ or ""`);
  }
  const src = value.trim();
  if (!src) return null;
  if (!PUBLIC_SROTD.test(src) || src.includes('..')) {
    fail(`${keyword}.json backgroundImage must be a path under public/srotd/ (got "${src}")`);
  }
  if (!publicFile(src)) {
    fail(`${keyword}.json backgroundImage was not found at public${src}`);
  }
  return src;
}

function resolveOgImage(keyword, value) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${keyword}.json meta.ogImage is required`);
  }
  const src = value.trim();
  if (/^https?:\/\//i.test(src)) return src;
  if (!src.startsWith('/') || src.includes('..') || !publicFile(src)) {
    fail(`${keyword}.json meta.ogImage must be an existing public path or an absolute URL`);
  }
  return src;
}

function readRoleFile(file) {
  const slug = file.replace(/\.json$/, '');
  if (!SLUG.test(slug)) fail(`"${file}" is not a lowercase keyword filename`);
  if (SROTD_RESERVED_KEYWORDS.includes(slug)) {
    fail(`"${slug}" is reserved by /srotd/${slug} and cannot be a role keyword`);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch (error) {
    fail(`${file} is not valid JSON (${error.message})`);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    fail(`${file} must be a JSON object`);
  }

  const text = {};
  for (const field of REQUIRED) text[field] = requireText(data, field, file);
  if (text.keyword !== slug) {
    fail(`${file} keyword "${text.keyword}" must match the filename`);
  }

  if (!Array.isArray(data.highlights) || data.highlights.some((item) => typeof item !== 'string')) {
    fail(`${file} highlights must be an array of strings`);
  }
  const highlights = data.highlights.map((item) => item.trim()).filter(Boolean);
  if (!highlights.length) fail(`${file} needs at least one highlight`);

  const meta = data.meta;
  if (!meta || typeof meta !== 'object') fail(`${file} meta object is required`);
  const title = requireText(meta, 'title', `${file} meta`);
  const description = requireText(meta, 'description', `${file} meta`);

  return {
    keyword: text.keyword,
    role: text.role,
    niche: text.niche,
    ote: text.ote,
    source: text.source,
    highlights: highlights.slice(0, SROTD_MAX_HIGHLIGHTS),
    headline: text.headline,
    disclaimer: text.disclaimer,
    backgroundImage: resolveBackground(slug, data.backgroundImage),
    roleName: optionalText(data.roleName, 'roleName', file),
    docUrl: optionalText(data.docUrl, 'docUrl', file),
    utm: data.utm && typeof data.utm === 'object' ? data.utm : {},
    meta: {
      title,
      description,
      ogImage: resolveOgImage(slug, meta.ogImage),
    },
  };
}

let cache = null;

function loadRoles() {
  if (cache) return cache;
  if (!fs.existsSync(DATA_DIR)) fail('data/srotd does not exist');
  const files = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith('.json')).sort();
  if (!files.length) fail('add at least one JSON file in data/srotd');
  cache = new Map(files.map((file) => {
    const role = readRoleFile(file);
    return [role.keyword, role];
  }));
  return cache;
}

export function getSrotdKeywords() {
  return Array.from(loadRoles().keys());
}

export function getSrotdRole(keyword) {
  if (typeof keyword !== 'string' || !SLUG.test(keyword)) return null;
  if (SROTD_RESERVED_KEYWORDS.includes(keyword)) return null;
  return loadRoles().get(keyword) || null;
}

function cleanParam(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string') return '';
  return raw.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, 120);
}

/**
 * Role JSON fills any key the defaults omit. Incoming URL params win.
 * Extra utm_* params on the URL are kept so they can be forwarded later.
 */
export function resolveSrotdUtm(role, searchParams = {}) {
  const utm = {
    ...SROTD_DEFAULT_UTM,
    utm_content: role.keyword,
  };

  for (const key of SROTD_UTM_KEYS) {
    const value = cleanParam(role.utm?.[key]);
    if (value) utm[key] = value;
  }

  for (const [key, raw] of Object.entries(searchParams || {})) {
    if (!/^utm_[a-z0-9_]+$/i.test(key)) continue;
    const value = cleanParam(raw);
    if (value) utm[key] = value;
  }

  const ordered = {};
  for (const key of SROTD_UTM_KEYS) ordered[key] = utm[key];
  for (const key of Object.keys(utm).sort()) {
    if (!(key in ordered)) ordered[key] = utm[key];
  }
  return ordered;
}
