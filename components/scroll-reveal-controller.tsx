"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "[data-reveal]",
  '[data-reveal-scope="prose"] h2',
  '[data-reveal-scope="prose"] h3',
].join(", ");

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const ScrollRevealController = () => {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia(reducedMotionQuery);
    const derivedElements: HTMLElement[] = [];
    const pendingElements = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let viewportFrame: number | undefined;
    let viewportChecksAttached = false;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );

    elements.forEach((element) => {
      if (!element.dataset.reveal) {
        element.dataset.reveal = "prose-heading";
        derivedElements.push(element);
      }
    });

    const revealElement = (element: HTMLElement) => {
      element.dataset.revealState = "visible";
      pendingElements.delete(element);
      observer?.unobserve(element);
    };

    const runViewportCheck = () => {
      viewportFrame = undefined;
      const triggerLine = window.innerHeight * 0.9;

      pendingElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();

        if (bounds.top <= triggerLine && bounds.bottom >= 0) {
          revealElement(element);
        }
      });

      if (pendingElements.size === 0 && viewportChecksAttached) {
        window.removeEventListener("scroll", scheduleViewportCheck);
        window.removeEventListener("resize", scheduleViewportCheck);
        viewportChecksAttached = false;
      }
    };

    const scheduleViewportCheck = () => {
      if (viewportFrame !== undefined) return;
      viewportFrame = window.requestAnimationFrame(runViewportCheck);
    };

    const detachViewportChecks = () => {
      if (viewportFrame !== undefined) {
        window.cancelAnimationFrame(viewportFrame);
        viewportFrame = undefined;
      }

      if (!viewportChecksAttached) return;

      window.removeEventListener("scroll", scheduleViewportCheck);
      window.removeEventListener("resize", scheduleViewportCheck);
      viewportChecksAttached = false;
    };

    const resetRevealEngine = () => {
      observer?.disconnect();
      observer = undefined;
      pendingElements.clear();
      detachViewportChecks();
    };

    const revealEverything = () => {
      resetRevealEngine();
      root.removeAttribute("data-scroll-reveal");
      elements.forEach((element) => {
        element.dataset.revealState = "visible";
      });
    };

    const enableScrollReveal = () => {
      resetRevealEngine();

      if (
        motionPreference.matches ||
        !("IntersectionObserver" in window) ||
        elements.length === 0
      ) {
        revealEverything();
        return;
      }

      const triggerLine = window.innerHeight * 0.9;

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const isAlreadyVisible = bounds.top <= triggerLine && bounds.bottom >= 0;

        element.dataset.revealState = isAlreadyVisible ? "visible" : "pending";
        if (!isAlreadyVisible) pendingElements.add(element);
      });

      root.dataset.scrollReveal = "ready";

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            revealElement(entry.target as HTMLElement);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0,
        },
      );

      pendingElements.forEach((element) => {
        observer?.observe(element);
      });

      if (pendingElements.size > 0) {
        window.addEventListener("scroll", scheduleViewportCheck, {
          passive: true,
        });
        window.addEventListener("resize", scheduleViewportCheck);
        viewportChecksAttached = true;
        scheduleViewportCheck();
      }
    };

    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;

      const revealTarget = event.target.closest<HTMLElement>("[data-reveal]");
      if (!revealTarget || revealTarget.dataset.revealState !== "pending") {
        return;
      }

      revealElement(revealTarget);
    };

    enableScrollReveal();
    motionPreference.addEventListener("change", enableScrollReveal);
    document.addEventListener("focusin", revealFocusedContent);

    return () => {
      resetRevealEngine();
      motionPreference.removeEventListener("change", enableScrollReveal);
      document.removeEventListener("focusin", revealFocusedContent);
      root.removeAttribute("data-scroll-reveal");
      elements.forEach((element) => {
        delete element.dataset.revealState;
      });
      derivedElements.forEach((element) => {
        delete element.dataset.reveal;
      });
    };
  }, [pathname]);

  return null;
};

export default ScrollRevealController;
