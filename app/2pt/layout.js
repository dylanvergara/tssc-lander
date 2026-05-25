export const metadata = {
  title: 'Subscribe to 2PT Now!',
  description: 'See sales roles every Tuesday',
  openGraph: {
    title: 'Subscribe to 2PT Now!',
    description: 'See sales roles every Tuesday',
    images: [
      {
        url: 'https://www.serialsalescommunity.co/images/TWO-PIECE-TUESDAY.png?v=1',
        width: 1280,
        height: 720,
        alt: 'Two-Piece Tuesday',
      },
    ],
    url: 'https://www.serialsalescommunity.co/2pt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscribe to 2PT Now!',
    description: 'See sales roles every Tuesday',
    images: ['https://www.serialsalescommunity.co/images/TWO-PIECE-TUESDAY.png?v=1'],
  },
};

export default function TwoPTLayout({ children }) {
  return children;
}
