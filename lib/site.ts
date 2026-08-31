export const siteConfig = {
  name: "Nick Lusweti",
  legalName: "Nicholas Lusweti",
  title: "Software Developer in Nairobi, Kenya | Nick Lusweti",
  description:
    "Nick Lusweti is a Nairobi-based software developer building production web products with React, Next.js, TypeScript, APIs, PostgreSQL, and cloud services.",
  url: "https://luswetinick.cc.cd",
  updatedAt: "2026-08-31",
  locale: "en_KE",
  language: "en",
  email: "luswetideveloper@gmail.com",
  location: {
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
  },
  profiles: {
    github: "https://github.com/LuswetiNick",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
