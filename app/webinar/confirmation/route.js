import { confirmPath } from '../../../lib/webinar';

export function GET() {
  return new Response(null, {
    status: 307,
    headers: { Location: confirmPath() },
  });
}
