import { ArrowUpRight, GitFork } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FloatingNav from "@/components/floating-nav";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProjectDetailHero from "@/components/project-detail-hero";
import {
  getNextProject,
  getProject,
  projects,
  type ProjectSlug,
} from "@/lib/projects";
import styles from "./project-detail.module.css";

const projectContent = {
  "studio-io": () => import("@/content/projects/studio-io.mdx"),
  "afrika-mosaics": () => import("@/content/projects/afrika-mosaics.mdx"),
  resonix: () => import("@/content/projects/resonix.mdx"),
} satisfies Record<ProjectSlug, () => Promise<{ default: React.ComponentType }>>;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Nicholas Lusweti`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const { default: ProjectContent } = await projectContent[project.slug]();
  const nextProject = getNextProject(project.slug);

  return (
    <>
      <main id="top" className={styles.page}>
        <Header />
        <ProjectDetailHero project={project} />

        <section className={styles.caseStudy} aria-label="Project details">
          <div className={styles.caseStudyInner}>
            <aside className={styles.sidebar} data-reveal="detail-sidebar">
              <div className={styles.stack}>
                <p className={styles.label}>Technologies</p>
                <ul>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.projectLinks}>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <GitFork aria-hidden="true" />
                  GitHub repository
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a href={project.live} target="_blank" rel="noreferrer">
                  View live project
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </aside>

            <article className={styles.markdown} data-reveal-scope="prose">
              <ProjectContent />
            </article>
          </div>
        </section>

        <section
          className={styles.nextProject}
          aria-label="Next project"
          data-reveal="next-project"
        >
          <Link href={`/projects/${nextProject.slug}`}>
            <span>Next project / {nextProject.index}</span>
            <strong>{nextProject.title}</strong>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}
