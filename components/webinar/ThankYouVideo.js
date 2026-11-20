'use client';

import Script from 'next/script';

export default function ThankYouVideo({ mediaId }) {
  const swatch = `https://fast.wistia.com/embed/medias/${mediaId}/swatch`;

  return (
    <div id="ty-video" className="wb-video">
      <div className="wb-video__frame wb-video__frame--player wb-video__frame--lead">
        <style>{`
          .wb-video__frame wistia-player[media-id='${mediaId}']:not(:defined) {
            background: center / contain no-repeat url('${swatch}');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }
        `}</style>
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
        <Script
          src={`https://fast.wistia.com/embed/${mediaId}.js`}
          strategy="afterInteractive"
          type="module"
        />
        <wistia-player
          media-id={mediaId}
          aspect="1.7777777777777777"
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
