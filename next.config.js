/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/booking',
        destination: 'https://links.serialagency.co/widget/bookings/book-application',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
