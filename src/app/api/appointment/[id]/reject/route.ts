// Requires: runtime "nodejs" (Prisma doesn't run on edge)
export const runtime = "nodejs";
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
      return NextResponse.json({ error: "No appoinemnt to reject" }, { status: 409 });
    }

    const appt = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        status: AppointmentStatus.REJECTED,
      },
    });

    /*  await sendAppointmentEmail({ email, name, notes, date, time }); */

    return NextResponse.json(appt, { status: 201 });
  } catch (err) {
    console.error("[PATCH /api/appointment/id/reject] error:", err);
    return NextResponse.json({ error: "Váratlan hiba történt" }, { status: 500 });
  }
}
