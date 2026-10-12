import type { Metadata } from "next";
import { Unbounded, Space_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BloomCursor } from "@/components/BloomCursor";
import { IntroOverlay } from "@/components/IntroOverlay";
import { SpotlightTracker } from "@/components/SpotlightTracker";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basmag1.github.io"),
  title: {
    default: "Basma Gado — Media Artist",
    template: "%s | Basma Gado",
  },
  description:
    "Basma Gado — Cinema & Media Arts graduate specializing in 3D animation, virtual production, motion capture, and interactive media. Based between Toronto, Cairo, and Jeddah.",
  openGraph: {
    title: "Basma Gado — Media Artist",
    description:
      "3D animation, virtual production, motion capture, and interactive media.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceMono.variable} ${manrope.variable}`}
    >
      <body className={manrope.className}>
        <BloomCursor />
        <SpotlightTracker />
        <IntroOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
