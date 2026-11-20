import { buildIcs } from '../../../lib/webinar';

export function GET() {
  return new Response(buildIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="tssc-live-training.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
