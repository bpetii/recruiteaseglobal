import { AppointmentEmail } from "@/components/EmailTemplate/AppointmentEmail/AppointmentEmail";
import { ContactEmail } from "@/components/EmailTemplate/ContactEmail/ContactEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  email,
  firstName,
  lastName,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: "Recruitease <info@albizz.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: "Új kapcsolatfelvétel",
      react: <ContactEmail firstName={firstName} lastName={lastName} email={email} message={message} />,
    });

    console.log("Contact email sent ✅");
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    throw error;
  }
}
