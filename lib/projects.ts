import afrikaMosaicsImage from "@/public/projects/afrika-mosaics.png";
import resonixImage from "@/public/projects/resonix.png";
import studioIoImage from "@/public/projects/studio-io.png";

export const projects = [
  {
    slug: "studio-io",
    index: "01",
    title: "Studio IO",
    category: "Learning platform",
    description:
      "A full-featured learning management system for course creation, progress tracking, rich lesson content, and Stripe-powered payments.",
    image: studioIoImage,
    imageAlt: "Studio IO learning management dashboard",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Stripe",
      "AWS S3",
      "Tiptap",
    ],
    github: "https://github.com/LuswetiNick/studio-io-lms",
    live: "https://studio-io-lms.vercel.app",
  },
  {
    slug: "afrika-mosaics",
    index: "02",
    title: "Afrika Mosaics",
    category: "Artist portfolio",
    description:
      "A content-managed portfolio for Kenyan mosaic artist Githaka Karuri, bringing galleries, commissions, writing, and courses together.",
    image: afrikaMosaicsImage,
    imageAlt: "Afrika Mosaics artist portfolio interface",
    technologies: [
      "Next.js",
      "TypeScript",
      "Sanity",
      "Tailwind CSS",
      "Resend",
    ],
    github: "https://github.com/LuswetiNick/artist-portfolio",
    live: "https://artist-portfolio-dusky.vercel.app",
  },
  {
    slug: "resonix",
    index: "03",
    title: "Resonix",
    category: "AI audio platform",
    description:
      "An AI-powered text-to-speech and voice-cloning platform with multi-tenant workspaces, metered billing, and secure audio storage.",
    image: resonixImage,
    imageAlt: "Resonix text-to-speech application interface",
    technologies: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "PostgreSQL",
      "Prisma",
      "Cloudflare R2",
    ],
    github: "https://github.com/LuswetiNick/resonix",
    live: "https://resonix-sooty.vercel.app",
  },
] as const;

export type Project = (typeof projects)[number];
export type ProjectSlug = Project["slug"];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug): Project {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}
