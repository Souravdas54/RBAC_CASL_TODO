import { NextResponse } from "next/server"
export  function middleware(req) {

    const role=req?.cookies.get('userRole')?.value || 'user';

    if(role !== 'admin' && req.nextUrl.pathnamwe.startswith('/admin')){
        return NextResponse.redirect(new URL('/', req.URL))
    }

  return NextResponse.next()
}
export const config = {
    matcher: '/admin/:path*', // Apply only to /admin and subpaths
  };