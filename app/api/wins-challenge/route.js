import { getMemberRegistry, getWinsRaw } from '../../../lib/wins-challenge';
import { mergeWinsPayload } from '../../../lib/wins-drawings';
import { loadDrawings } from '../../../lib/wins-store';

export const dynamic = 'force-dynamic';

// Tallies come from data/wins-challenge.json. A locked drawing winner is
// filled in when the file still has winner: null. The drawing log is included
// on each month and does not change the tally entries.
export async function GET() {
  const raw = getWinsRaw();
  const { drawings } = await loadDrawings();
  return Response.json(mergeWinsPayload(raw, drawings, getMemberRegistry(raw)), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
