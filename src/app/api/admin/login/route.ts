import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}));
  const { password } = data || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Hibás jelszó." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Let the client redirect (we return JSON). If you prefer server redirect:
  // return NextResponse.redirect(new URL(next || "/admin", req.url), { ...cookies })
  return res;
}
