'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from '@/utils/auth/session';

interface FormData {
  email: string;
  password: string;
}

async function setSessionCookie(idToken: string) {
  const sessionCookie = await createSessionCookie(idToken);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function login(data: FormData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password, returnSecureToken: true }),
    },
  );

  if (!response.ok) return { error: true };

  const { idToken } = await response.json();
  await setSessionCookie(idToken);

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function loginAnonymously() {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    },
  );

  if (!response.ok) return { error: true };

  const { idToken, localId: uid } = await response.json();

  await adminAuth.updateUser(uid, {
    displayName: `Guest-${Date.now().toString(36)}`,
  });

  await setSessionCookie(idToken);

  revalidatePath('/', 'layout');
  redirect('/');
}
