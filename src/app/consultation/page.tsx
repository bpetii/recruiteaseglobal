// app/page.tsx

import prisma from "@/prisma/client";
import ConsultationLayout from "../../components/Consultation/Consultation";

export default async function Consultation() {
  const rows = await prisma.appointment.findMany({
    orderBy: { date: "asc" },
  });

  const appointments = rows.map((r) => ({
    date: r.date.toISOString().slice(0, 10), // "YYYY-MM-DD"
    time: r.time, // "HH:mm"
  }));
  return <ConsultationLayout appointments={appointments} />;
}
