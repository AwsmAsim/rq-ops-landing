import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RQ Ops | Automated Call Answering for Ontario HVAC",
  description:
    "Answer every HVAC call 24/7, capture complete job details, and book appointments without adding staff. Built for Ontario HVAC contractors.",
  openGraph: {
    title: "RQ Ops | Automated Call Answering for Ontario HVAC",
    description:
      "Answer every HVAC call 24/7, capture complete job details, and book appointments without adding staff.",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
