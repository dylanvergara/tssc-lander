import './globals.css';
import ScrollReveal from '../components/ScrollReveal';

export async function generateMetadata() {
  const { siteData } = await import('../data/content.js');
  return {
    title: siteData.meta.title,
    description: siteData.meta.description,
    openGraph: {
      title: siteData.meta.title,
      description: siteData.meta.description,
      images: [siteData.meta.ogImage],
      url: siteData.meta.url,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fix 6: Premium sans-serif — Space Grotesk for headlines, DM Sans for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
