import { notFound } from 'next/navigation';
import RegisterPage from '../../../../components/webinar/RegisterPage';
import { fetchPlaylistStats, formatHoursPlus, interviewCountOf, tenkCountOf } from '../../../../lib/playlist-stats';
import { getWebinar, registerUrl, WEBINARS } from '../../../../lib/webinar';

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(WEBINARS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const webinar = getWebinar(params.slug);
  if (!webinar) return {};
  const url = registerUrl(webinar.slug);
  const image = {
    url: '/images/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'The Serial Sales Community. Since 2022, the easy button for 1099 WFH sales jobs.',
  };
  return {
    title: webinar.metaTitle,
    description: webinar.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: webinar.metaTitle,
      description: webinar.metaDescription,
      url,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: webinar.metaTitle,
      description: webinar.metaDescription,
      images: [image],
    },
  };
}

export default async function WebinarRegisterPage({ params }) {
  const webinar = getWebinar(params.slug);
  if (!webinar) notFound();
  const stats = await fetchPlaylistStats({ revalidate: 600 });
  return (
    <RegisterPage
      webinar={webinar}
      interviewCount={interviewCountOf(stats)}
      hoursLabel={formatHoursPlus(stats)}
      tenkCount={tenkCountOf(stats)}
    />
  );
}
