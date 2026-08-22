import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectSlug } from "@/lib/projects";
import SectionHeading from "./section-heading";
import styles from "./projects.module.css";

const projectPresentation = {
  "studio-io": {
    className: styles.studio,
    reveal: "project-left",
    sizes:
      "(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) 75vw, (max-width: 1550px) 58vw, 840px",
  },
  "afrika-mosaics": {
    className: styles.afrika,
    reveal: "project-right",
    sizes:
      "(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) 50vw, (max-width: 1550px) 33vw, 475px",
  },
  resonix: {
    className: styles.resonix,
    reveal: "project-wide",
    sizes:
      "(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) 88vw, (max-width: 1550px) 75vw, 1080px",
  },
} satisfies Record<
  ProjectSlug,
  { className: string; reveal: string; sizes: string }
>;

const Projects = () => {
  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <div className={styles.inner}>
        <SectionHeading
          label="My Work"
          title="Crafted With Purpose"
          id="projects-title"
        />

        <div className={styles.gallery}>
          {projects.map((project) => (
            <article
              className={`${styles.card} ${projectPresentation[project.slug].className}`}
              data-reveal={projectPresentation[project.slug].reveal}
              key={project.title}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className={styles.imageWrap}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    placeholder="blur"
                    sizes={projectPresentation[project.slug].sizes}
                  />
                </div>

                <div className={styles.caption}>
                  <div className={styles.meta}>
                    <span>Case study / {project.index}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <p className={styles.technologies}>
                    {project.technologies.join(" · ")}
                  </p>
                  <span className={styles.caseStudyLink}>
                    Read case study <ArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
