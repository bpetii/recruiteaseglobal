"use client";

import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// ---------- BRAND + PRESETS ----------
const BRAND = {
  primary: "#AFC7E9", // CTA chip you’ve been using
  primaryHover: "#9FBAE4",
  dark: "#212121", // footer/header dark you liked
  text: "#1f2937",
};

type TemplateType = "contact" | "newsletter" | "appointment";

type DevicePreset = "desktop" | "tablet" | "mobile";
const PRESET_WIDTHS: Record<DevicePreset, number> = {
  desktop: 900, // stage width (preview area); email body is usually 600
  tablet: 680,
  mobile: 390,
};

// ---------- YOUR EMAIL COMPONENTS ----------
import { ContactEmail } from "@/components/EmailTemplate/ContactEmail/ContactEmail";
import { NewsletterEmail } from "@/components/EmailTemplate/NewsLetterEmail/NewsLetterEmail";
import { AppointmentEmail } from "@/components/EmailTemplate/AppointmentEmail/AppointmentEmail";
// TODO: add your NewsletterEmail + AppointmentEmail when ready
// import { NewsletterEmail } from "@/components/...";
// import { AppointmentEmail } from "@/components/...";

// ---------- UTIL: wrap into full HTML doc with a minimal email-safe reset ----------
function wrapAsHtmlDoc(inner: string) {
  return `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<title>Email Preview</title>
<style>
/* Minimal email-safe reset */
html, body { margin:0; padding:0; }
body { background:#f6f9fc; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
img { border:0; outline:none; text-decoration:none; display:block; }
a { color: ${BRAND.primary}; text-decoration: none; }
</style>
</head>
<body>
${inner}
</body>
</html>`;
}

// ---------- PAGE ----------
export default function EmailPreviewPage() {
  const [selected, setSelected] = useState<TemplateType>("contact");
  const [preset, setPreset] = useState<DevicePreset>("desktop");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Render the chosen template (React -> HTML string)
  const renderedHtml = useMemo(() => {
    const element: JSX.Element =
      selected === "contact" ? (
        <ContactEmail
          firstName="Péter"
          lastName="Bíró"
          email="test@gmail.com"
          message="Érdeklődni szeretnék a nemzetközi toborzási szolgáltatásotokkal kapcsolatban. Tudnátok küldeni részletesebb információt az árakról és a folyamat menetéről?"
        />
      ) : selected === "newsletter" ? (
        <NewsletterEmail
          email="test@gmail.com"
          title="Szeptemberi hírlevelünk"
          content="Ebben a hónapban bemutatjuk legújabb toborzási megoldásainkat, amelyekkel még gyorsabban találhatod meg a megfelelő jelölteket."
          ctaLink="https://recruiteaseglobal.com/services"
          ctaLabel="Fedezd fel a részleteket"
        />
      ) : (
        <AppointmentEmail name="Anna" notes="Valami megjegyzés" email="anna.kovacs@example.com" date="2025-10-05" time="14:30" />
      );

    const inner = renderToStaticMarkup(element);
    return wrapAsHtmlDoc(inner);
  }, [selected]);

  // Inject HTML into the iframe whenever it changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(renderedHtml);
    doc.close();
  }, [renderedHtml]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: `linear-gradient(180deg, #f8fafc, #eef2f7)`,
        padding: "24px",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Brand + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: BRAND.primary,
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              color: BRAND.dark,
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontWeight: 800, color: BRAND.dark }}>RecruitEase – Email Preview</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Statikus HTML előnézet</div>
          </div>
        </div>

        {/* Template buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {(["contact", "newsletter", "appointment"] as TemplateType[]).map((key) => {
            const active = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: `1px solid ${active ? BRAND.primary : "#e5e7eb"}`,
                  background: active ? BRAND.primary : "#fff",
                  color: active ? "#0b1320" : BRAND.text,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {key === "contact" ? "Kapcsolat" : key === "newsletter" ? "Hírlevél" : "Időpont"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary toolbar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        {/* Device presets */}
        <div style={{ display: "flex", gap: 8 }}>
          {(["desktop", "tablet", "mobile"] as DevicePreset[]).map((p) => {
            const active = preset === p;
            return (
              <button
                key={p}
                onClick={() => setPreset(p)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: `1px solid ${active ? BRAND.primary : "#e5e7eb"}`,
                  background: active ? BRAND.primary : "#fff",
                  color: active ? "#0b1320" : BRAND.text,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview stage */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: 24,
          borderRadius: 16,
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <iframe
          ref={iframeRef}
          title="Email Preview"
          style={{
            width: PRESET_WIDTHS[preset],
            height: 900,
            border: "1px solid #e5e7eb",
            background: "#fff",
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  );
}
