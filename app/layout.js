import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import ScrollReveal from '../components/ScrollReveal';
import NoSave from '../components/NoSave';

export async function generateMetadata() {
  const { siteData } = await import('../data/content.js');
  return {
    title: siteData.meta.title,
    description: siteData.meta.description,
    icons: {
      icon: '/images/logo-white-bg.png',
      apple: '/images/logo-white-bg.png',
    },
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PSL6KM8J');`
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSL6KM8J"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollReveal />
        <NoSave />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
