"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEAD = "Hiring Made Simple, Fast, and Clear.";

export default function Section7Testimonials() {
  const reduce = useReducedMotion();
  const words = HEAD.split(" ");

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-6 py-24 lg:py-[120px]">
      <motion.h3
        className="m-0 max-w-[760px] text-center text-[32px] font-normal leading-[1.2] tracking-[-1px] text-[#6b85af] sm:text-[40px] lg:text-[48px] lg:leading-[57.6px] lg:tracking-[-1.44px]"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        aria-label={HEAD}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.h3>
    </section>
  );
}
