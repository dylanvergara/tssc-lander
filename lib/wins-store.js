import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { get, put } from '@vercel/blob';
import { emptyDrawings, normalizeDrawings } from './wins-drawings';

const PATHNAME = 'wins-challenge/drawings.json';
const DEV_FILE = path.join(os.tmpdir(), 'wins-challenge-drawings.json');

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function blobAccess() {
  return process.env.BLOB_ACCESS === 'public' ? 'public' : 'private';
}

function devFileAllowed() {
  return !blobConfigured() && process.env.NODE_ENV !== 'production';
}

let chain = Promise.resolve();

function withLock(fn) {
  const run = chain.then(fn, fn);
  chain = run.then(() => undefined, () => undefined);
  return run;
}

async function readDevFile() {
  try {
    const text = await fs.readFile(DEV_FILE, 'utf8');
    return normalizeDrawings(JSON.parse(text));
  } catch (error) {
    if (error && error.code === 'ENOENT') return emptyDrawings();
    throw error;
  }
}

async function readBlob() {
  const result = await get(PATHNAME, { access: blobAccess(), useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return emptyDrawings();
  const text = await new Response(result.stream).text();
  return normalizeDrawings(JSON.parse(text));
}

export async function loadDrawings() {
  try {
    if (blobConfigured()) return { drawings: await readBlob(), ready: true };
    if (devFileAllowed()) return { drawings: await readDevFile(), ready: true };
    return { drawings: emptyDrawings(), ready: false };
  } catch (error) {
    const missing = error && (error.name === 'BlobNotFoundError' || error.status === 404);
    if (missing) return { drawings: emptyDrawings(), ready: blobConfigured() };
    console.error('Wins drawing log could not be read.');
    return { drawings: emptyDrawings(), ready: blobConfigured() };
  }
}

async function writeDrawings(drawings) {
  const body = JSON.stringify(drawings);
  if (blobConfigured()) {
    await put(PATHNAME, body, {
      access: blobAccess(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
    });
    return;
  }
  if (devFileAllowed()) {
    await fs.writeFile(DEV_FILE, body);
    return;
  }
  const error = new Error('Drawing storage is not configured.');
  error.status = 503;
  throw error;
}

export function updateDrawings(mutator) {
  return withLock(async () => {
    const { drawings, ready } = await loadDrawings();
    if (!ready) {
      const error = new Error('Drawing storage is not configured.');
      error.status = 503;
      throw error;
    }
    const next = await mutator(drawings);
    await writeDrawings(next);
    return next;
  });
}
