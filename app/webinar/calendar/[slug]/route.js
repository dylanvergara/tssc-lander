import { buildIcs, getWebinar } from '../../../../lib/webinar';

export function GET(_request, { params }) {
  const webinar = getWebinar(params.slug);
  if (!webinar) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(buildIcs(webinar), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="tssc-live-training-${webinar.slug}.ics"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
