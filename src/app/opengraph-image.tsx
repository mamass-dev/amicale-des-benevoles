import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Amicale des Bénévoles — Créateur d'expériences citoyennes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #1e3a5f 0%, #172e4a 60%, #0f1f33 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "rgba(233, 122, 43, 0.18)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(217, 74, 61, 0.12)",
            filter: "blur(30px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={88} height={88} style={{ borderRadius: 16 }} />
          <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
            Amicale des Bénévoles
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(233, 122, 43, 0.18)",
              border: "1px solid rgba(233, 122, 43, 0.4)",
              color: "#fed7aa",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            Association loi 1901
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
              gap: "0 24px",
            }}
          >
            <span>Créateur d&apos;expériences</span>
            <span style={{ color: "#fed7aa" }}>citoyennes</span>
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.75)", maxWidth: 900 }}>
            +3000 bénévoles sur des événements sportifs et culturels partout en France
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>amicaledesbenevoles.org</span>
          <span style={{ color: "#fed7aa", fontWeight: 600 }}>
            SaintéLyon · High Five Festival · OpenLakes...
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
