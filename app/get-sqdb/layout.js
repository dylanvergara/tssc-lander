export const metadata = {
  title: 'Get Access to the SQDB | The Serial Sales Community',
  description:
    'The SQDB is an AI trained on 69 real interviews with paying TSSC members. Ask it anything about landing a remote appointment setting or closing job. 100% free.',
  openGraph: {
    title: 'The Most Successful Minds of TSSC, In Your Pocket',
    description:
      'An AI trained on 69 real member success stories. Ask it anything about breaking into remote sales. 100% free, unsubscribe anytime.',
    images: [
      {
        url: 'https://www.serialsalescommunity.co/images/get-sqdb-cover.png',
        width: 1600,
        height: 900,
        alt: 'The SQDB, Success Query Database',
      },
    ],
    url: 'https://www.serialsalescommunity.co/get-sqdb',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Most Successful Minds of TSSC, In Your Pocket',
    description: 'An AI trained on 69 real member success stories. 100% free, unsubscribe anytime.',
    images: ['https://www.serialsalescommunity.co/images/get-sqdb-cover.png'],
  },
};

export default function GetSqdbLayout({ children }) {
  return children;
}
