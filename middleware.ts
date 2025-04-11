import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered");
  console.log("Request URL:", req.url);
  const token = req.cookies.get("auth-token");

  if (!token && req.nextUrl.pathname.startsWith("/shop")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}