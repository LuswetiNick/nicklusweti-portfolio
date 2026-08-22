import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Bebas_Neue,
  Geist_Mono,
  Inter,
  Titillium_Web,
} from "next/font/google";
import ScrollRevealController from "@/components/scroll-reveal-controller";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Nick Lusweti — Software Developer",
  description:
    "Portfolio of Nick Lusweti, a Nairobi-based software developer building end-to-end web products with React, Next.js, APIs, and data systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        "bg-background",
        bebasNeue.variable,
        geistMono.variable,
        inter.variable,
        titillium.variable,
      )}
    >
      <body className="min-h-full bg-[#0f0f10]">
        <ScrollRevealController />
        {children}
      </body>
    </html>
  );
}
