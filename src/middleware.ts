import { type NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/utils/auth/session';

const firebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !!process.env.FIREBASE_ADMIN_PROJECT_ID;

const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PATHS = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  if (!firebaseConfigured) {
    if (request.nextUrl.pathname === '/setup') return NextResponse.next();
    return NextResponse.redirect(new URL('/setup', request.url));
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
