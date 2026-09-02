import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Inter, Titillium_Web } from "next/font/google";
import Script from "next/script";
import ScrollRevealController from "@/components/scroll-reveal-controller";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.language}
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
        <SpeedInsights />
        <Analytics />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZV9EYEM0KE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZV9EYEM0KE');
        `}
      </Script>
    </html>
  );
}
