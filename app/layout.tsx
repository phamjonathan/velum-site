import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Velum — Best OnlyFans Management & Agency",
    template: "%s — Velum",
  },
  description:
    "Velum provides world-leading OnlyFans management & agency services to creators ready for real growth. We partner, execute, and drive results through personal brand growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
