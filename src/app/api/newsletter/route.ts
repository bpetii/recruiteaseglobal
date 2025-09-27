import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscription.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ error: "Ez az e-mail cím már fel van iratkozva a hírlevélre." }, { status: 400 });
    }

    const subscription = await prisma.newsletterSubscription.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
