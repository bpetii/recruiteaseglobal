// app/api/newsletter/unsubscribe/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return html("Hiányzó email.", 400);
    }

    const sub = await prisma.newsletterSubscription.findUnique({
      where: { email: email },
    });

    if (!sub) {
      return html("Érvénytelen leiratkozási hivatkozás.", 404);
    }

    await prisma.newsletterSubscription.delete({
      where: { id: sub.id },
    });

    return html("Sikeresen leiratkoztál a hírlevelünkről. Sajnáljuk, hogy elmész! 🤍");
  } catch (err) {
    return html("Váratlan hiba történt. Kérjük, próbáld újra később.", 500);
  }
}

function html(message: string, status = 200) {
  // minimal, inline “Thanks” page (keeps it simple; no extra route needed)
  const body = `<!doctype html>
<html lang="hu">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Leiratkozás</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
             background:#f6f7f9; margin:0; padding:40px; color:#111; }
      .card { max-width:640px; margin:0 auto; background:#fff; border:1px solid #e5e7eb;
              border-radius:14px; padding:32px; box-shadow:0 8px 24px rgba(0,0,0,.06); }
      h1 { font-size:22px; margin:0 0 10px; }
      p { font-size:16px; line-height:1.6; margin:0; }
      a { color:#111; text-decoration:underline; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Leiratkozás</h1>
      <p>${escapeHtml(message)}</p>
      <p style="margin-top:16px;"><a href="/">Vissza a kezdőlapra</a></p>
    </div>
  </body>
</html>`;
  return new NextResponse(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]!));
}
