import { NextResponse } from "next/server";

export function proxy(request) {
  console.log("🔥 Proxy:", request.nextUrl.pathname);

  const token = request.cookies.get("token");

  console.log("🍪 Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};