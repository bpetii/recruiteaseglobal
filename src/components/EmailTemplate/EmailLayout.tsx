import React from "react";
import EmailFooter from "./EmailFooter";

interface EmailLayoutProps {
  children: React.ReactNode;
  ctaLink?: string;
  ctaLabel?: string;
  email: string;
}

const EmailLayout: React.FC<Readonly<EmailLayoutProps>> = ({ children, ctaLink, ctaLabel, email }) => {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#1c1c1e",
        padding: "20px",
        backgroundColor: "#f6f6f6",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              margin: 0,
              display: "inline-flex",
              alignItems: "flex-start", // top-align the two pieces
              gap: "6px",
              fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>RECRUITEASE</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1,
                transform: "translateY(-0.25em)", // lift to the top
              }}
            >
              global
            </span>
          </h1>

          {/*  <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <a href="https://albizz.app" style={{ display: "inline-block" }}>
              <img
                src="https://realstate-test.s3.eu-north-1.amazonaws.com/logo/black_logo.png"
                alt="Albizz Logo"
                style={{ width: "60px", height: "60px", border: "1px solid #DDDDDD" }}
              />
            </a>
          </div> */}
        </div>

        {/* Main Email Box */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {children}

          {/* CTA Button */}
          {ctaLink && ctaLabel && (
            <div style={{ textAlign: "left", marginTop: "24px" }}>
              <a
                href={ctaLink}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "1.6",
                }}
              >
                {ctaLabel}
              </a>
            </div>
          )}
        </div>

        {/* Footer Message */}
        <hr style={{ margin: "24px 0", borderColor: "#ddd" }} />
        <p style={{ fontSize: "14px", color: "#555", textAlign: "center", margin: 0 }}>
          Ha bármilyen kérdésed van, vagy segítségre van szükséged, bátran vedd fel velünk a kapcsolatot. Örömmel támogatunk abban, hogy a bérbeadás
          egyszerű és hatékony legyen számodra!
        </p>
      </div>

      {/* Global Footer */}
      <EmailFooter email={email} />
    </div>
  );
};

export default EmailLayout;
