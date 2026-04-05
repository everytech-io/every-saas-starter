import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from '@/utils/auth/session';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
    }

    const sessionCookie = await createSessionCookie(idToken);
    const response = NextResponse.json({ status: 'ok' });
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_COOKIE_MAX_AGE,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: 'ok' });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
