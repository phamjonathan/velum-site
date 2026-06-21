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
    default: "Highflyers — Startup & Scaleup Executive Search",
    template: "%s — Highflyers",
  },
  description:
    "Startup & Scaleup Executive Search and Talent Acquistion. Stop Searching. Start Growing.",
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
