import { NextResponse } from 'next/server';
import { WEBINARS, registerPath } from './lib/webinar';

// Past and unknown webinar slugs are not pages. Send both the register and
// confirmation URLs to the current register page so old email and social
// links still land on a live training. Live slugs are served as usual.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/webinar\/(?:register|confirmation)\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const slug = decodeURIComponent(match[1]);
  if (WEBINARS[slug]) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = registerPath();
  return NextResponse.redirect(url, 307);
}

export const config = {
  // :path* is the matcher form Next compiles into a real path segment.
  // A bare :slug is swallowed by the optional data-route suffix and never matches.
  matcher: ['/webinar/register/:path*', '/webinar/confirmation/:path*'],
};
