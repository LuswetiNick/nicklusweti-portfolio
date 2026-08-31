import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: project.updatedAt,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.updatedAt,
    },
    ...projectPages,
  ];
}
