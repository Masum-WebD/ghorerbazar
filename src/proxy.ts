import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected route prefixes and their required role
const PROTECTED_ROUTES: Record<string, string> = {
  "/dashboard/customer": "customer",
  "/dashboard/affiliate": "affiliate",
  "/dashboard/wholesaler": "wholesaler",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected dashboard route
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    const token = request.cookies.get("sirajtech_token")?.value;

    // No token → redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based check (basic — full check is done client-side in ProtectedRoute)
    // For now, just ensure token exists for any dashboard route
    // Role validation happens in the dashboard layout/page components
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all dashboard routes
    "/dashboard/:path*",
    // Exclude static files, images, api routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
