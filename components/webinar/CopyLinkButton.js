'use client';

import { useState } from 'react';

export default function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="wb-share__btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? 'Copied' : 'Copy link'}
    </button>
  );
}
