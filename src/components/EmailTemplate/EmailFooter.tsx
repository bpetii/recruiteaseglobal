import React from "react";

const EmailFooter = ({ email }: { email: string }) => {
  return (
    <div
      style={{
        marginTop: "40px",
        fontSize: "13px",
        color: "#333",
        textAlign: "center",
        lineHeight: "1.6",
      }}
    >
      <p style={{ marginBottom: "8px" }}>
        <strong>Nem szeretnél értesítést kapni minden üzenetről?</strong>
        <br />
        <a
          href={`https://recruiteaseglobal.vercel.app/api/newsletter/unsubscribe?email=${email}`}
          style={{ color: "#3366cc", textDecoration: "none" }}
        >
          Leiratkozás a hírlevélről
        </a>
      </p>

      <p style={{ marginTop: "20px" }}>
        Ez az e-mail a{" "}
        <a href="https://recruitease.com" style={{ color: "#3366cc", textDecoration: "none" }}>
          recruitease.com
        </a>{" "}
        oldalról lett küldve.
      </p>

      <p style={{ marginTop: "8px", color: "#555" }}>RecruitEase Kft.</p>
    </div>
  );
};

export default EmailFooter;
