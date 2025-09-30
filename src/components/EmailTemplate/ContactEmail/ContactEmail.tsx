import React from "react";
import EmailLayout from "../EmailLayout";

interface IContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<IContactEmailProps>> = ({ firstName, lastName, email, message }) => {
  return (
    <EmailLayout email={email} ctaLink={`mailto:${email}`} ctaLabel="Válasz a felhasználónak">
      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
          color: "black",
        }}
      >
        <strong>Kapcsolatfelvételi üzenet érkezett:</strong>
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>Küldő neve:</strong> {firstName} {lastName}
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>E-mail cím:</strong> {email}
      </p>

      <p style={{ marginBottom: "12px" }}>
        <strong>Üzenet:</strong>
        <br />
        {message}
      </p>
    </EmailLayout>
  );
};
