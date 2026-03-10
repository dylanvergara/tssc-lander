'use client';
import { useEffect } from 'react';

export default function NoSave() {
  useEffect(() => {
    // 1. Block right-click context menu site-wide
    const blockContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', blockContext);

    // 2. Block drag on all images and logos
    const blockDrag = (e) => e.preventDefault();
    document.addEventListener('dragstart', blockDrag);

    // 3. Block common save shortcuts (Ctrl+S, Ctrl+U, F12 DevTools shortcut)
    const blockKeys = (e) => {
      if (
        (e.ctrlKey || e.metaKey) && (
          e.key === 's' ||  // Save
          e.key === 'u' ||  // View source
          e.key === 'p'     // Print
        )
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', blockKeys);

    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('dragstart', blockDrag);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  return null;
}
