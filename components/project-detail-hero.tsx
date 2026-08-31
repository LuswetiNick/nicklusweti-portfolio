import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import styles from "./project-detail-hero.module.css";

type ProjectDetailHeroProps = {
  project: Project;
};

const ProjectDetailHero = ({ project }: ProjectDetailHeroProps) => {
  return (
    <section className={styles.hero} aria-labelledby="project-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div className={styles.heading}>
            <Link href="/#projects" className={styles.backLink}>
              ← Selected work
            </Link>
            <p className={styles.eyebrow}>
              Case study / {project.index} · {project.category}
            </p>
            <h1
              id="project-title"
              aria-label={`${project.title} ${project.headingDescriptor}`}
            >
              <span>{project.title}</span>
              <span className={styles.headingDescriptor}>
                {project.headingDescriptor}
              </span>
            </h1>
          </div>

          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.imageWrap}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 50px), 1440px"
          />
          <span className={styles.imageIndex} aria-hidden="true">
            ({project.index})
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailHero;
