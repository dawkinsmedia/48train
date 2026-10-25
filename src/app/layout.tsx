import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = "Show Up. Get Stronger. Build Brotherhood. | Conway, SC";
const description =
  "Saturday mornings, 7 AM at Heritage Preserve in Conway. One hour outdoors—all fitness levels, no gym required. Free.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title: "Show Up. Get Stronger. Build Brotherhood.",
    description,
    url: siteUrl,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Show Up. Get Stronger. Build Brotherhood.",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
