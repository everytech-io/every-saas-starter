import { NextResponse } from 'next/server';

// Firebase handles GitHub OAuth client-side via signInWithPopup.
// No server-side code exchange is needed.
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/`);
}
