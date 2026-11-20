import { getMemberRegistry } from '../../../../lib/wins-challenge';

export const dynamic = 'force-dynamic';

// Saved profiles, plus any member id in the tally file that is not saved yet.
// Existing profiles are not overwritten. The tally bot commits new ids into
// data/wins-members.json.
export function GET() {
  return Response.json(getMemberRegistry(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
