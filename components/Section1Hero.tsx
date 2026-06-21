"use client";

import { motion, useReducedMotion } from "motion/react";
import CtaButton from "./CtaButton";
import HeroLottie from "./HeroLottie";
import { MailIcon } from "./icons";

const A = "/assets";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Section1Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section className="relative w-full overflow-hidden bg-white h-[100svh] min-h-[720px]">
      {/* sky + cloud background fills the viewport */}
      <div className="absolute inset-0">
        <img
          src={`${A}/ca93772a505039a3.png`}
          alt=""
          className="h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* content frame */}
      <div className="relative mx-auto h-full w-[1280px] max-w-full">
        {/* headline cluster (horizontally centered, ~22% down) */}
        <div className="absolute left-1/2 top-[22%] flex w-[343px] max-w-[88%] -translate-x-1/2 flex-col items-center gap-6 text-center">
          <h2 className="m-0">
            <motion.span
              {...rise(0)}
              className="block whitespace-nowrap text-[40px] font-normal leading-[1.2] tracking-[-1.68px] text-white lg:text-[56px] lg:leading-[67.2px]"
              style={{ textShadow: "0 2px 22px rgba(110,143,200,0.35)" }}
            >
              Stop Searching
            </motion.span>
            <motion.span
              {...rise(0.08)}
              className="block whitespace-nowrap text-[40px] font-normal leading-[1.2] tracking-[-1.68px] text-white lg:text-[56px] lg:leading-[67.2px]"
              style={{ textShadow: "0 2px 22px rgba(110,143,200,0.35)" }}
            >
              Start Growing.
            </motion.span>
          </h2>

          <motion.p
            {...rise(0.16)}
            className="m-0 max-w-[280px] text-[15px] font-normal leading-[1.35] tracking-[-0.2px] text-[#55698c]"
          >
            Startup &amp; Scaleup Executive Search and Talent Acquistion.
          </motion.p>

          {/* hero CTA: envelope · divider · pill */}
          <motion.div {...rise(0.24)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center">
              <MailIcon className="h-6 w-6" fill="white" />
            </span>
            <span className="h-4 w-px bg-white/25" />
            <CtaButton />
          </motion.div>
        </div>

        {/* glowing orb (glow behind the marquee's featured card) */}
        <motion.img
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.85 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1.1, ease: EASE, delay: 0.3 },
              })}
          src={`${A}/11c4934fdbbb3e86.png`}
          alt=""
          className="absolute left-1/2 bottom-[44px] h-[220px] w-[220px] -translate-x-1/2"
        />

        {/* bottom marquee — exact Lottie (placed executives + company logos) */}
        <HeroLottie className="absolute left-1/2 bottom-[44px] z-[2] h-[220px] w-screen -translate-x-1/2" />

        {/* scroll to explore */}
        <div className="absolute inset-x-0 bottom-[24px] z-[3] flex items-end justify-end px-6">
          <div className="flex items-center gap-3 text-white">
            <span className="text-[14px] leading-[18px] tracking-[-0.42px]">Scroll to Explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
