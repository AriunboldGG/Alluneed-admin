import { NextResponse } from 'next/server';
import { checkToken } from 'src/middleware/middleWareHelper';

export default async function middleware(req) {
   const { pathname } = req.nextUrl;
   let result = checkToken(req);

   if (result?.token) {
      if (result?.roleBased) {
         if (pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
         }
      } else {
         return NextResponse.redirect(new URL('/403', req.url));
      }
   } else {
      if (!pathname.startsWith('/login')) {
         return NextResponse.redirect(new URL('/login', req.url));
      }
   }
}

export const config = {
   matcher: ['/dashboard/:path*'],
};
