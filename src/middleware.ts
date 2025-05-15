import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  console.log("Middleware triggered");
  console.log("Request URL:", req.url);
  const token = req.cookies.get("auth-token");

  if(req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login",req.url));
  }
  if (!token && req.nextUrl.pathname.startsWith("/shop")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/shop/:path*"],
};