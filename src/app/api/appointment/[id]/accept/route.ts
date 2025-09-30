// app/api/appointment/[id]/accept/route.ts

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { AppointmentStatus } from "@prisma/client";

export async function PATCH(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> } // <- params is a Promise!
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "id hiányzik" }, { status: 400 });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Nincs elfogadható időpont" }, { status: 404 });
    }

    const appt = await prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.ACCEPTED },
    });

    return NextResponse.json(appt, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/appointment/[id]/accept] error:", err);
    return NextResponse.json({ error: "Váratlan hiba történt" }, { status: 500 });
  }
}
