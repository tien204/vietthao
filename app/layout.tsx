import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  Geist,
  Anton,
  Permanent_Marker,
  Rubik_Wet_Paint,
  Poppins,
  Caveat_Brush,
  Agbalumo,
} from "next/font/google";
import "./globals.css";

// Heading font (geometric, supports Vietnamese) — kept under --font-funnel
// so the existing CSS variable mapping doesn't change.
const funnelSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "800"],
  variable: "--font-funnel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-geist",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const rubikWetPaint = Rubik_Wet_Paint({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oxy-brush",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oxy-marker",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-oxy-poppins",
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-eureka-hand",
  display: "swap",
});

const agbalumo = Agbalumo({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-oxy-tagline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trần Việt Phương Thảo — Portfolio Marketing",
  description:
    "Portfolio của Trần Việt Phương Thảo — Thực tập sinh Marketing, chuyên Nội dung & Sự kiện tại TP. Hồ Chí Minh.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${funnelSans.variable} ${inter.variable} ${geist.variable} ${anton.variable} ${rubikWetPaint.variable} ${permanentMarker.variable} ${poppins.variable} ${caveatBrush.variable} ${agbalumo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
