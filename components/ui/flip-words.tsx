"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const enterEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const currentWord = words[currentIndex % Math.max(words.length, 1)] ?? "";

  const startAnimation = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % words.length);
    setIsAnimating(true);
  }, [words.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      isAnimating ||
      shouldReduceMotion ||
      !isInView ||
      !isPageVisible ||
      words.length < 2
    ) {
      return;
    }

    const timeout = window.setTimeout(startAnimation, duration);

    return () => window.clearTimeout(timeout);
  }, [
    duration,
    isAnimating,
    isInView,
    isPageVisible,
    shouldReduceMotion,
    startAnimation,
    words.length,
  ]);

  if (shouldReduceMotion) {
    return (
      <span
        ref={containerRef}
        className={cn(
          "relative z-10 inline-flex px-2 text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
      >
        {words[0] ?? ""}
      </span>
    );
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        ref={containerRef}
        initial={{
          opacity: 0,
          y: 24,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.55,
          ease: enterEase,
        }}
        exit={{
          opacity: 0,
          y: -18,
          filter: "blur(6px)",
          scale: 0.985,
          transition: {
            duration: 0.32,
            ease: exitEase,
          },
        }}
        className={cn(
          "relative z-10 inline-flex px-2 text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
        key={`${currentIndex}-${currentWord}`}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.1,
              duration: 0.42,
              ease: enterEase,
            }}
            className="inline-block whitespace-nowrap"
            style={{
              marginInlineEnd:
                wordIndex === currentWord.split(" ").length - 1
                  ? undefined
                  : "0.16em",
            }}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: Math.min(
                    wordIndex * 0.1 + letterIndex * 0.025,
                    0.34,
                  ),
                  duration: 0.3,
                  ease: enterEase,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
