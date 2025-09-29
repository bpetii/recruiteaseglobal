// app/admin/page.tsx
export const revalidate = 0;

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import prisma from "@/prisma/client";

export default async function AdminPage() {
  const [appointments, messages, subscriptions] = await Promise.all([
    prisma.appointment.findMany({
      orderBy: [{ date: "desc" }, { time: "desc" }],
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return <AdminDashboard appointments={appointments} messages={messages} subscriptions={subscriptions} />;
}
