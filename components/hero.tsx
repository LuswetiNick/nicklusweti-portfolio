import { ArrowDownRight } from "lucide-react";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <h1
        id="hero-title"
        className={styles.wordmark}
      >
        <span className={styles.identity}>Nick Lusweti</span>
        <span className={styles.role}>Software Developer</span>
      </h1>

      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.intro}>
        <p className={styles.kicker}>Software developer · Nairobi, Kenya</p>
        <p className={styles.statement}>
          Building end-to-end web products across interfaces, application
          logic, data, and cloud integrations.
        </p>
        <p className={styles.stack}>
          TypeScript · React · Next.js · PostgreSQL
        </p>
      </div>

      <div className={styles.year} aria-label="Portfolio edition 2026">
        <span>Portfolio</span>
        <strong>20</strong>
        <strong>26</strong>
      </div>

      <a className={styles.workLink} href="#projects">
        <span>Explore projects</span>
        <ArrowDownRight aria-hidden="true" size={18} strokeWidth={1.7} />
      </a>

      <p className={styles.scrollCue} aria-hidden="true">
        Scroll to discover
      </p>
    </section>
  );
};

export default Hero;
