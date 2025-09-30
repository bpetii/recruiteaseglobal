import React from "react";
import EmailLayout from "../EmailLayout";

interface INewsletterEmailProps {
  title: string;
  content: string;
  ctaLink?: string;
  ctaLabel?: string;
  email: string;
}

export const NewsletterEmail: React.FC<Readonly<INewsletterEmailProps>> = ({
  title,
  content,
  email,
  ctaLink = "https://recruiteaseglobal.com",
  ctaLabel = "Tudj meg többet",
}) => {
  return (
    <EmailLayout email={email} ctaLink={ctaLink} ctaLabel={ctaLabel}>
      {/* Title */}
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "16px",
          color: "black",
        }}
      >
        {title}
      </h2>

      {/* Content */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.6",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        {content}
      </p>

      {/* Signature */}
      <p style={{ fontSize: "14px", color: "#555", marginTop: "30px" }}>
        Üdvözlettel,
        <br />
        <strong>RecruitEase Global csapata</strong>
      </p>
    </EmailLayout>
  );
};
