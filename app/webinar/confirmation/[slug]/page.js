import { notFound } from 'next/navigation';
import ConfirmationPage from '../../../../components/webinar/ConfirmationPage';
import { confirmUrl, getWebinar, WEBINARS } from '../../../../lib/webinar';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(WEBINARS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const webinar = getWebinar(params.slug);
  if (!webinar) return {};
  return {
    title: webinar.confirmTitle,
    description: webinar.confirmDescription,
    robots: { index: false, follow: false },
    alternates: { canonical: confirmUrl(webinar.slug) },
  };
}

export default function Page({ params }) {
  const webinar = getWebinar(params.slug);
  if (!webinar) notFound();
  return <ConfirmationPage webinar={webinar} />;
}
