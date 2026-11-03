import WinsChallenge from '../../components/WinsChallenge';
import Footer from '../../components/Footer';
import { getWinsPageData } from '../../lib/wins-challenge';
import { loadDrawings } from '../../lib/wins-store';

const TITLE = 'Wins Challenge | The Serial Sales Community';
const DESCRIPTION = 'The monthly TSSC Wins Challenge. Spin a point-weighted wheel, check the running tally, and see every recorded winner since January 2025.';
const URL = 'https://www.serialsalescommunity.co/wins-challenge';
const IMAGE = 'https://www.serialsalescommunity.co/images/og-image.jpg';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'The Serial Sales Community',
    type: 'website',
    images: [
      {
        url: IMAGE,
        width: 1200,
        height: 630,
        alt: 'The Serial Sales Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

export default async function WinsChallengePage() {
  const { drawings, ready } = await loadDrawings();
  const data = getWinsPageData(new Date(), drawings);
  data.storageReady = ready;
  return (
    <div className="wc-page">
      <WinsChallenge data={data} />
      <Footer />
    </div>
  );
}
