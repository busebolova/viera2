import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get auth token from cookie
    const authToken = request.cookies.get("admin-auth")?.value

    // Check if user is authenticated
    const adminPassword = process.env.ADMIN_PASSWORD
    const isAuthenticated = authToken === adminPassword

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !request.nextUrl.pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // If authenticated and on login page, redirect to admin dashboard
    if (isAuthenticated && request.nextUrl.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
