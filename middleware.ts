import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  // Get token from header
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  // Check if path should be protected
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/counselor");

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const response = NextResponse.next();

    // Add user info to request headers
    response.headers.set("X-User-ID", (decoded as any).userId);
    response.headers.set("X-User-Role", (decoded as any).role);

    return response;
  } catch (error) {
    // Token is invalid
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/counselor/:path*"],
};