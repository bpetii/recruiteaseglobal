// Requires: runtime "nodejs" (Prisma doesn't run on edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
// Adjust the import to wherever your singleton lives:
// import { prisma } from "@/lib/prisma";
import prisma from "@/prisma/client"; // <- if you put it under /prisma/client.ts
import { AppointmentEmail } from "@/components/EmailTemplate/AppointmentEmail/AppointmentEmail";
import { resend } from "@/lib/resend";
import { sendAppointmentEmail } from "@/lib/resend/emails/sendAppointmentEmail";

type Body = {
  name: string;
  email: string;
  phoneNumber: string;
  notes?: string;
  date: string; // ISO date string (e.g. "2025-09-29")
  time: string; // "HH:mm" (e.g. "14:00")
  timezone: string; // IANA tz (e.g. "Europe/Budapest")
};

function isTimeHHMM(v: string) {
  return /^\d{2}:\d{2}$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>;
    const { name, email, phoneNumber, notes, date, time, timezone } = body;

    // Basic validation (keep it lib-free)
    if (!name || !email || !date || !time || !timezone) {
      return NextResponse.json({ error: "Missing required fields: name, email, date, time, timezone" }, { status: 400 });
    }

    if (!isTimeHHMM(time)) {
      return NextResponse.json({ error: "Invalid time (HH:mm expected)" }, { status: 400 });
    }

    // Prevent double booking: same day + time (optionally same timezone)
    const clash = await prisma.appointment.findFirst({
      where: { date: new Date(date), time },
      select: { id: true },
    });
    if (clash) {
      return NextResponse.json({ error: "This slot is already booked." }, { status: 409 });
    }

    const appt = await prisma.appointment.create({
      data: {
        name,
        email,
        phoneNumber,
        notes,
        date: new Date(date),
        time,
        timezone,
      },
    });

    await sendAppointmentEmail({ email, name, notes, date, time });

    return NextResponse.json(appt, { status: 201 });
  } catch (err) {
    console.error("[POST /api/consultation] error:", err);
    return NextResponse.json({ error: "Váratlan hiba történt" }, { status: 500 });
  }
}
