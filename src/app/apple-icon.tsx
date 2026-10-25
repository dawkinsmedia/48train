import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171B19",
          color: "#F5F3ED",
          fontSize: 112,
          fontWeight: 700,
          letterSpacing: -4,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        48
      </div>
    ),
    { ...size },
  );
}
