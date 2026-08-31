"use client";

import { Fragment, useEffect, useRef } from "react";
import styles from "./about.module.css";

const aboutText =
  "I’m a Nairobi-based software developer focused on building reliable, user-centred web products. My work spans React and Next.js interfaces, typed application APIs, relational data, authentication, payments, content systems, and cloud media workflows. I turn product requirements into responsive, production-ready software.";

const words = aboutText.split(" ");
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const scrollStart = 0.85;
const scrollEnd = 0.35;
const spring = { stiffness: 90, damping: 26, mass: 0.8 } as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const About = () => {
  const statementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const statement = statementRef.current;
    if (!statement) return;

    const wordElements = Array.from(
      statement.querySelectorAll<HTMLElement>("[data-about-word]"),
    );
    const motionPreference = window.matchMedia(reducedMotionQuery);
    let currentProgress = 0;
    let targetProgress = 0;
    let velocity = 0;
    let previousTime = 0;
    let frame: number | undefined;

    const measureProgress = () => {
      const bounds = statement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = bounds.height + viewportHeight * (scrollStart - scrollEnd);

      if (travel <= 0) return 1;
      return clamp((viewportHeight * scrollStart - bounds.top) / travel);
    };

    const paintWords = (progress: number) => {
      const revealWindow = 1.4 / wordElements.length;

      wordElements.forEach((word, index) => {
        const start = index / wordElements.length;
        const end = Math.min(1, start + revealWindow);
        const localProgress = clamp((progress - start) / (end - start));

        word.style.opacity = (0.16 + localProgress * 0.84).toFixed(3);
        word.style.transform = `translate3d(0, ${(14 * (1 - localProgress)).toFixed(2)}px, 0)`;
      });
    };

    const cancelFrame = () => {
      if (frame === undefined) return;
      window.cancelAnimationFrame(frame);
      frame = undefined;
      previousTime = 0;
    };

    const animateSpring = (time: number) => {
      if (previousTime === 0) previousTime = time;
      const elapsed = Math.min((time - previousTime) / 1000, 1 / 30);
      previousTime = time;

      const springForce = -spring.stiffness * (currentProgress - targetProgress);
      const dampingForce = -spring.damping * velocity;
      velocity += ((springForce + dampingForce) / spring.mass) * elapsed;
      currentProgress += velocity * elapsed;
      paintWords(clamp(currentProgress));

      const isMoving = Math.abs(velocity) > 0.002;
      const isDisplaced = Math.abs(targetProgress - currentProgress) > 0.0005;

      if (isMoving || isDisplaced) {
        frame = window.requestAnimationFrame(animateSpring);
        return;
      }

      currentProgress = targetProgress;
      velocity = 0;
      frame = undefined;
      previousTime = 0;
      statement.dataset.aboutMotion = "ready";
      paintWords(currentProgress);
    };

    const requestSpring = () => {
      if (frame !== undefined) return;
      statement.dataset.aboutMotion = "active";
      frame = window.requestAnimationFrame(animateSpring);
    };

    const syncToScroll = () => {
      if (motionPreference.matches) return;
      targetProgress = measureProgress();
      requestSpring();
    };

    const applyMotionPreference = () => {
      cancelFrame();
      velocity = 0;

      if (motionPreference.matches) {
        currentProgress = 1;
        targetProgress = 1;
        statement.removeAttribute("data-about-motion");
        paintWords(1);
        return;
      }

      currentProgress = measureProgress();
      targetProgress = currentProgress;
      statement.dataset.aboutMotion = "ready";
      paintWords(currentProgress);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelFrame();
        return;
      }

      applyMotionPreference();
    };

    applyMotionPreference();
    window.addEventListener("scroll", syncToScroll, { passive: true });
    window.addEventListener("resize", syncToScroll);
    document.addEventListener("visibilitychange", handleVisibility);
    motionPreference.addEventListener("change", applyMotionPreference);

    return () => {
      cancelFrame();
      window.removeEventListener("scroll", syncToScroll);
      window.removeEventListener("resize", syncToScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", applyMotionPreference);
      statement.removeAttribute("data-about-motion");
      wordElements.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("transform");
      });
    };
  }, []);

  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-title"
    >
      <h2 id="about-title" className={styles.title}>
        <span aria-hidden="true" />
        About Nick Lusweti
      </h2>

      <div className={styles.statementRow}>
        <span
          className={`${styles.rule} ${styles.ruleLeft}`}
          aria-hidden="true"
        />

        <p ref={statementRef} className={styles.statement}>
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className={styles.word} data-about-word>
                {word}
              </span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>

        <span
          className={`${styles.rule} ${styles.ruleRight}`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default About;
