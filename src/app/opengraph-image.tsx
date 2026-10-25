import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Men's Saturday morning workout at Heritage Preserve, Conway SC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photoPath = path.join(
    process.cwd(),
    "public/images/workout-warmup-circle.jpg",
  );
  const photoData = await readFile(photoPath);
  const photoBase64 = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoBase64}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(23,27,25,0.92) 0%, rgba(23,27,25,0.35) 55%, rgba(23,27,25,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "48px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: "#A6AAA4",
              textTransform: "uppercase",
            }}
          >
            Saturday mornings · 7 AM · Conway, SC
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#F5F3ED",
              lineHeight: 0.95,
              letterSpacing: 1,
              maxWidth: 900,
            }}
          >
            SHOW UP. GET STRONGER. BUILD BROTHERHOOD.
          </div>
          <div style={{ fontSize: 24, color: "#68745B", marginTop: 8 }}>
            One hour · All fitness levels · No gym required
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
