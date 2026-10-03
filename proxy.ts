import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, isSessionTokenValid } from "@/lib/admin-auth";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same behavior, new name) —
// see node_modules/next/dist/docs/.../file-conventions/proxy.md.
const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // NextRequest.cookies is synchronous (unlike `cookies()` from next/headers,
  // which is async) — this is the Web-standard request-cookie API.
  const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (isSessionTokenValid(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
