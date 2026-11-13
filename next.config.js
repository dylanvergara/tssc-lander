/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // JSON roles are read with fs at request time (UTM overrides).
    // Keep data/srotd in the server trace so a new file deploys with the route.
    outputFileTracingIncludes: {
      '/srotd/[keyword]': ['./data/srotd/**/*.json'],
    },
  },
  async rewrites() {
    return [
      { source: '/opportunity-cost-calculator', destination: 'https://opportunity-cost-calculator-tau.vercel.app/' },
      { source: '/opportunity-cost-calculator/:path*', destination: 'https://opportunity-cost-calculator-tau.vercel.app/:path*' },
    ];
  },
};

module.exports = nextConfig;
