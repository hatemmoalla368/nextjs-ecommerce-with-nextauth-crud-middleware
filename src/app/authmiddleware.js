import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const session = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Allow auth-related and public routes
  if (
    pathname.startsWith('/api/auth') || 
    pathname.startsWith('/login') ||
    pathname.startsWith('/activate')
  ) {
    return NextResponse.next();
  }

  // Redirect inactive users
  if (session?.user && !session.user.isActive) {
    return NextResponse.redirect(new URL('/verify-email', req.url));
  }

  return NextResponse.next();
}