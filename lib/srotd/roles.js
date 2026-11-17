import fs from 'fs';
import path from 'path';
import { SROTD_RESERVED_KEYWORDS } from './config';

const DATA_DIR = path.join(process.cwd(), 'data', 'srotd');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_SROTD = /^\/srotd\/[A-Za-z0-9._/-]+$/;

function fail(message) {
  throw new Error(`SROTD: ${message}`);
}

function publicFile(urlPath) {
  if (urlPath.includes('..')) return null;
  const abs = path.join(PUBLIC_DIR, urlPath);
  const root = path.resolve(PUBLIC_DIR);
  const resolved = path.resolve(abs);
  if (!resolved.startsWith(root + path.sep)) return null;
  return fs.existsSync(resolved) ? resolved : null;
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
  if (data.keyword !== slug) {
    fail(`${file} keyword "${data.keyword}" must match the filename`);
  }

  const heroImage = typeof data.heroImage === 'string' ? data.heroImage.trim() : '';
  if (!PUBLIC_SROTD.test(heroImage) || heroImage.includes('..') || !publicFile(heroImage)) {
    fail(`${file} heroImage must be an existing file under public/srotd/`);
  }

  return { keyword: slug, heroImage };
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
