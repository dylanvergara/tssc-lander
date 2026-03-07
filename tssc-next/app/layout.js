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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800&display=swap"
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
