import { AppointmentEmail } from "@/components/EmailTemplate/AppointmentEmail/AppointmentEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAcceptedAppointment({
  email,
  name,
  notes,
  date,
  time,
}: {
  email: string;
  name: string;
  notes?: string;
  date: string;
  time: string;
}) {
  try {
    await resend.emails.send({
      from: "Recruitease <info@albizz.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: "Időpont elfogadva",
      react: <AppointmentEmail email={email} name={name} notes={notes} date={date} time={time} />,
    });

    console.log("Appointment email sent ✅");
  } catch (error) {
    console.error("❌ Failed to send appointment email:", error);
    throw error;
  }
}
