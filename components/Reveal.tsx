"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global reveal convention from the setup brief: entrance "fadeUp" with ~0.08s
 * stagger between siblings, ~0.6s ease-out, triggered as elements enter view.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUpContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** distance to travel on entry (px) */
  y?: number;
  delay?: number;
  once?: boolean;
};

/** Single fade-up element. */
export function Reveal({ children, className, y = 40, delay = 0, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered group: wrap siblings that should fade up 0.08s apart. */
export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : fadeUpContainer}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/** Item inside a RevealGroup. */
export function RevealChild({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : fadeUpItem}>
      {children}
    </motion.div>
  );
}
