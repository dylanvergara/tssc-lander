/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/opportunity-cost-calculator', destination: 'https://opportunity-cost-calculator-tau.vercel.app/' },
      { source: '/opportunity-cost-calculator/:path*', destination: 'https://opportunity-cost-calculator-tau.vercel.app/:path*' },
    ];
  },
};

module.exports = nextConfig;
