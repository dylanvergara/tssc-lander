'use client';

import { useEffect } from 'react';

export default function CompleteRegistration() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'complete_registration' });
  }, []);

  return null;
}
