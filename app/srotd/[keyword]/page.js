import { notFound } from 'next/navigation';
import { siteData } from '../../../data/content.js';
import SrotdLander from '../../../components/srotd/SrotdLander';
import { SROTD_RESERVED_KEYWORDS } from '../../../lib/srotd/config';
import { getSrotdKeywords, getSrotdRole } from '../../../lib/srotd/roles';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSrotdKeywords()
    .filter((keyword) => !SROTD_RESERVED_KEYWORDS.includes(keyword))
    .map((keyword) => ({ keyword }));
}

function absoluteAsset(src) {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteData.meta.url}${src}`;
}

export function generateMetadata({ params }) {
  const role = getSrotdRole(params.keyword);
  const robots = { index: false, follow: false };
  if (!role) return { robots };

  const title = 'Sales Role of the Day';
  const description = 'Get the full breakdown + how to apply.';
  const image = absoluteAsset(role.heroImage);
  const url = `${siteData.meta.url}/srotd/${role.keyword}`;

  return {
    title,
    description,
    robots,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: image ? [{ url: image, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default function SrotdPage({ params }) {
  if (SROTD_RESERVED_KEYWORDS.includes(params.keyword)) notFound();
  const role = getSrotdRole(params.keyword);
  if (!role) notFound();
  return <SrotdLander role={role} />;
}
