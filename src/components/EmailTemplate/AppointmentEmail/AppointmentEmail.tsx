import React from "react";
import EmailLayout from "../EmailLayout";

interface IAppointmentEmailProps {
  name: string;
  notes?: string;
  email: string;
  date: string; // ISO string or formatted date
  time: string; // e.g. "14:00"
}

export const AppointmentEmail: React.FC<Readonly<IAppointmentEmailProps>> = ({ name, email, notes, date, time }) => {
  return (
    <EmailLayout email={email} ctaLink={`${process.env.NEXT_PUBLIC_BASE_URL}/appointments`} ctaLabel="Időpont megtekintése">
      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
          color: "black",
        }}
      >
        <strong>Új konzultációs időpont foglalás érkezett:</strong>
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>Küldő neve:</strong> {name}
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>E-mail cím:</strong> {email}
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>Időpont:</strong> {date} {time}
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>Megjegyzés:</strong> {notes || "-"}
      </p>

      <p style={{ marginTop: "20px", color: "#444" }}>Kérjük, erősítsd meg az időpontot, és vedd fel a kapcsolatot a jelentkezővel, ha szükséges.</p>
    </EmailLayout>
  );
};
