import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

type ContactBody = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  // Optional honeypot field (should be left empty by humans)
  honeypot?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    let body: Partial<ContactBody> | null = null;
    try {
      body = (await req.json()) as Partial<ContactBody>;
    } catch {
      return NextResponse.json({ error: "Hibás kérés: a törzs nem érvényes JSON." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Hibás kérés: hiányzó vagy érvénytelen adatok." }, { status: 400 });
    }

    // Honeypot (anti-bot): if filled, silently accept without writing
    if (body.honeypot && String(body.honeypot).trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 204 });
    }

    const email = (body.email ?? "").trim().toLowerCase();
    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!firstName) {
      return NextResponse.json({ error: "A vezetéknév megadása kötelező." }, { status: 422 });
    }

    if (!lastName) {
      return NextResponse.json({ error: "A keresztnév megadása kötelező." }, { status: 422 });
    }
    if (!email) {
      return NextResponse.json({ error: "Az e-mail cím megadása kötelező." }, { status: 422 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Érvénytelen e-mail cím." }, { status: 422 });
    }
    if (!message) {
      return NextResponse.json({ error: "Az üzenet megadása kötelező." }, { status: 422 });
    }

    /*     if (!message) errors.push("Az üzenet megadása kötelező.");
    if (message && message.length < 8) errors.push("Az üzenet túl rövid (min. 8 karakter).");
    if (message && message.length > 2000) errors.push("Az üzenet túl hosszú (max. 2000 karakter)."); */

    const saved = await prisma.contactMessage.create({
      data: {
        email,
        firstName,
        lastName,
        message,
      },
    });

    return NextResponse.json(
      {
        id: saved.id,
        message: "Köszönjük! Üzenetedet megkaptuk.",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: any) {
    console.error("[POST /api/consultation] error:", err);
    return NextResponse.json({ error: "Váratlan hiba történt" }, { status: 500 });
  }
}
