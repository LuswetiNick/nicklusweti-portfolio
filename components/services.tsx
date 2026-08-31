import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import styles from "./services.module.css";

const services = [
  {
    title: "Web Product Development",
    description:
      "End-to-end React and Next.js products that connect accessible interfaces to application logic, data, and production workflows.",
    proof: [
      { label: "Studio IO", href: "/projects/studio-io" },
      { label: "Resonix", href: "/projects/resonix" },
    ],
  },
  {
    title: "APIs, Data & Integrations",
    description:
      "Typed APIs, authentication, relational data, payments, usage metering, and secure cloud storage assembled into dependable systems.",
    proof: [
      { label: "Studio IO", href: "/projects/studio-io" },
      { label: "Resonix", href: "/projects/resonix" },
    ],
  },
  {
    title: "Content & Learning Systems",
    description:
      "Structured content models, editorial galleries, course authoring, progress tracking, and media workflows designed for ongoing use.",
    proof: [
      { label: "Afrika Mosaics", href: "/projects/afrika-mosaics" },
      { label: "Studio IO", href: "/projects/studio-io" },
    ],
  },
] as const;

const Services = () => {
  return (
    <section
      id="capabilities"
      className={styles.services}
      aria-labelledby="capabilities-title"
    >
      <div className={styles.inner}>
        <SectionHeading
          label="Technical Capabilities"
          title="Full-Stack Development Capabilities"
          id="capabilities-title"
        />

        <div className={styles.list}>
          {services.map((service, index) => (
            <article
              className={styles.service}
              data-reveal="row"
              key={service.title}
            >
              <p className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className={styles.summary}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className={styles.evidence}>
                <p>Selected proof</p>
                <div className={styles.proofLinks}>
                  {service.proof.map((project) => (
                    <Link href={project.href} key={project.href}>
                      {project.label} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
