import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import type { DecodedIdToken } from 'firebase-admin/auth';

export const SESSION_COOKIE_NAME = '__firebase_session';
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days in seconds

/**
 * Reads and verifies the Firebase session cookie.
 * Returns the decoded token or null if missing/invalid.
 */
export async function getServerUser(): Promise<DecodedIdToken | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}

/**
 * Like getServerUser() but throws if no valid session.
 * Drop-in replacement for validateUserSession().
 */
export async function validateSession(): Promise<DecodedIdToken> {
  const user = await getServerUser();
  if (!user) {
    throw new Error('You are not allowed to perform this action.');
  }
  return user;
}

/**
 * Creates a Firebase session cookie from a client-side ID token.
 */
export async function createSessionCookie(idToken: string): Promise<string> {
  const expiresIn = SESSION_COOKIE_MAX_AGE * 1000; // Admin SDK uses milliseconds
  return adminAuth.createSessionCookie(idToken, { expiresIn });
}
