'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from '@/utils/auth/session';

interface FormData {
  email: string;
  password: string;
}

export async function signup(data: FormData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password, returnSecureToken: true }),
    },
  );

  if (!response.ok) return { error: true };

  const { idToken } = await response.json();
  const sessionCookie = await createSessionCookie(idToken);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
  });

  revalidatePath('/', 'layout');
  redirect('/');
}
