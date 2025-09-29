import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin and its subpaths, except the login page and the API that sets the cookie
  const isAdminPath = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";
  const isApiLogin = pathname.startsWith("/api/admin/login");
  const isApiLogout = pathname.startsWith("/api/admin/logout");

  if (isAdminPath && !isLogin && !isApiLogin && !isApiLogout) {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    if (cookie !== "ok") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // apply to the whole /admin tree
};
