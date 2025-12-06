import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const publicPages = ["/", "/login", "/signup"];
  const { pathname } = req.nextUrl;

  // Allow public pages without checking token
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token → redirect to login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If token exists → allow access
  return NextResponse.next();
}

// Protect only these pages
export const config = {
  matcher: ["/dashboard", "/settings"],
};
