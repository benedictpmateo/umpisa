// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/", "/my-pokemons", "/catch-pokemon", '/rankings', '/profile'] };
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const publicPath = ['/login', '/signup'];
  const privatePath = ["/", "/my-pokemons", "/catch-pokemon", '/rankings', '/profile']
  // If it's the root path, just render it
  if (publicPath.includes(path)) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log('session', session)

  const isProtected = privatePath.includes(path);
  console.log({path})

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && publicPath.includes(path)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}
