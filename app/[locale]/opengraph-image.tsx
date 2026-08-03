import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = "Fuentivo — soluciones digitales para negocios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;
  const title = locale === "en"
    ? "Digital solutions for businesses ready to move forward."
    : "Soluciones digitales para negocios que quieren avanzar.";

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "radial-gradient(circle at 78% 20%, #063b2b 0%, #111317 48%)",
        color: "#f7f8f8",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ color: "#00b86a", display: "flex", fontSize: 30, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.08, marginTop: 54, maxWidth: 900 }}>
          {title}
        </div>
        <div style={{ color: "#aeb5b2", display: "flex", fontSize: 26, marginTop: 42 }}>
          Websites · Business systems · Automation
        </div>
      </div>
    </div>,
    size,
  );
}
