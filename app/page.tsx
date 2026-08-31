import About from "@/components/about";
import Contact from "@/components/contact";
import FloatingNav from "@/components/floating-nav";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import JsonLd from "@/components/seo/json-ld";
import { getProfilePageJsonLd } from "@/lib/structured-data";

const homeSocialImage = projects[0].image;

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: homeSocialImage.src,
        width: homeSocialImage.width,
        height: homeSocialImage.height,
        alt: "Studio IO learning management dashboard, a project by Nick Lusweti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: homeSocialImage.src,
        alt: "Studio IO learning management dashboard, a project by Nick Lusweti",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getProfilePageJsonLd()} />
      <main className="relative min-h-screen overflow-x-clip bg-[#0f0f10]">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}
