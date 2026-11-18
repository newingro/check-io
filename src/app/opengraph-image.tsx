import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CHECK-iO — Property Management. Il tuo immobile. Il suo massimo potenziale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-full-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#06111d",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(8,183,169,0.28), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
          color: "#ffffff",
        }}
      >
        <img src={logoSrc} width={420} height={127} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>Il tuo immobile.</div>
          <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#35cdbd" }}>
            Il suo massimo potenziale.
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            Property management e gestione affitti brevi · check-io.it
          </div>
        </div>
      </div>
    ),
    size,
  );
}
