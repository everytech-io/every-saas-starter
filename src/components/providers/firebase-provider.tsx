'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { initAnalytics } from '@/lib/firebase/analytics';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Analytics (browser-only, non-blocking)
    initAnalytics().catch(() => {});

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await getIdToken(user);
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
      }
    });

    // Refresh the ID token and session cookie every 55 minutes
    const refreshInterval = setInterval(
      async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const idToken = await getIdToken(currentUser, true);
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
        }
      },
      55 * 60 * 1000,
    );

    return () => {
      unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return <>{children}</>;
}
