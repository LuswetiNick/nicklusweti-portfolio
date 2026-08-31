import type { Project } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

const websiteId = absoluteUrl("/#website");
const personId = absoluteUrl("/#person");

const personReference = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  jobTitle: "Software Developer",
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.countryCode,
  },
  sameAs: [siteConfig.profiles.github],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Application APIs",
    "PostgreSQL",
    "Authentication",
    "Payments",
    "Content management systems",
    "Cloud storage",
  ],
};

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        dateModified: siteConfig.updatedAt,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      personReference,
    ],
  };
}

export function getProjectPageJsonLd(project: Project) {
  const projectPath = `/projects/${project.slug}`;
  const projectUrl = absoluteUrl(projectPath);
  const articleId = `${projectUrl}#article`;
  const softwareId = `${projectUrl}#software`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": articleId,
        url: projectUrl,
        headline: project.seoTitle,
        name: `${project.title} ${project.headingDescriptor}`,
        description: project.seoDescription,
        image: absoluteUrl(project.image.src),
        datePublished: project.publishedAt,
        dateModified: project.updatedAt,
        inLanguage: siteConfig.language,
        author: { "@id": personId },
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        keywords: project.technologies.join(", "),
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": softwareId,
        name: project.title,
        description: project.description,
        url: project.live,
        codeRepository: project.github,
        programmingLanguage: "TypeScript",
        runtimePlatform: "Web",
        author: { "@id": personId },
        sameAs: [project.github, project.live],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      personReference,
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
      },
    ],
  };
}
