"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const A = "/assets";
/** The stat headlines are a solid grey-blue on the live site (not a gradient). */
const ACCENT = "107, 133, 175";

/* ---------------------------------------------------------------------------
   Stat block
   Live behaviour: the three lines stay stacked & centred while the section is
   pinned; the *emphasis* hands off down the list as you scroll. The active line
   grows to 48px / solid colour, its neighbours taper to 32px → 24px and fade to
   24% opacity. `act` runs 0 → 2 across the pin (one integer per line).
--------------------------------------------------------------------------- */
function StatLine({
  act,
  index,
  children,
}: {
  act: MotionValue<number>;
  index: number;
  children: ReactNode;
}) {
  // Distance from the focus line (0 = active, 1 = neighbour, 2 = far). Sizes
  // step 48 → 32 → 24px to mirror the live H3/H5/H6 cuts at each stage.
  const dist = useTransform(act, (v) => Math.min(2, Math.abs(v - index)));
  const px = (d: number) => (d <= 1 ? 48 - d * 16 : 32 - (d - 1) * 8);
  const fontSize = useTransform(dist, (d) => `${px(d).toFixed(1)}px`);
  const lineHeight = useTransform(dist, (d) => `${(px(d) * 1.2).toFixed(1)}px`);
  const letterSpacing = useTransform(dist, (d) =>
    `${(d <= 1 ? -1.44 + d * 0.48 : -0.96 + (d - 1) * 0.24).toFixed(2)}px`,
  );
  // Only the focus line is solid; neighbours hold at 24% opacity.
  const color = useTransform(
    dist,
    (d) => `rgba(${ACCENT}, ${(0.24 + Math.max(0, 1 - d / 0.5) * 0.76).toFixed(3)})`,
  );
  return (
    <motion.p
      style={{ fontSize, lineHeight, letterSpacing, color }}
      className="m-0 max-w-[640px] text-center font-normal"
    >
      {children}
    </motion.p>
  );
}

/** Static stack used on mobile and for reduced-motion (no scroll cycle). */
function StatBlockStatic() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h3
        className="m-0 text-[48px] font-normal leading-[57.6px] tracking-[-1.44px]"
        style={{ color: `rgb(${ACCENT})` }}
      >
        35 Days Average time-to-fill.
      </h3>
      <h5
        className="m-0 text-[32px] font-normal leading-[38.4px] tracking-[-0.96px]"
        style={{ color: `rgba(${ACCENT}, 0.24)` }}
      >
        100% Results delivered.
      </h5>
      <h6
        className="m-0 text-[24px] font-normal leading-[28.8px] tracking-[-0.72px]"
        style={{ color: `rgba(${ACCENT}, 0.24)` }}
      >
        85+ Executives placed at Global Companies.
      </h6>
    </div>
  );
}

/* top-left — "Results / You Can Trust" */
function ResultsCard() {
  return (
    <div className="rounded-[36px] bg-black p-1.5">
      <div className="relative flex h-[188px] w-[188px] flex-col justify-between overflow-hidden rounded-[32px] p-4">
        <img
          src={`${A}/b73197ef33df2e03.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/25" />
        <span className="relative text-[24px] font-normal leading-[28.8px] tracking-[-0.72px] text-white">
          Results
        </span>
        <span className="relative self-end text-right text-[24px] font-normal leading-[28.8px] tracking-[-0.72px] text-white">
          You Can Trust
        </span>
      </div>
    </div>
  );
}

/* lower-left — "Proven with / Global Leaders" */
function ProvenCard() {
  return (
    <div className="rounded-[26px] bg-white p-1.5 shadow-[0_20px_50px_rgba(60,90,130,0.12)]">
      <div className="relative flex h-[248px] w-[168px] items-center justify-center overflow-hidden rounded-[24px]">
        <img
          src={`${A}/499833f94a9d7ca6.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative text-center text-[16px] font-normal leading-[20.8px] tracking-[-0.48px] text-white">
          <p className="m-0">Proven with</p>
          <p className="m-0">Global Leaders</p>
        </div>
      </div>
    </div>
  );
}

/* top-right — "Talent / Shaping the Future" */
function TalentCard() {
  return (
    <div className="rounded-[36px] bg-black p-1.5">
      <div
        className="flex h-[228px] w-[168px] flex-col items-center justify-between rounded-[32px] px-4 pb-6 pt-10"
        style={{
          backgroundImage:
            "linear-gradient(151.5deg, rgb(156,175,188) 0%, rgb(209,215,220) 100%)",
        }}
      >
        <span
          className="hf-border-line relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/30"
          style={{ backdropFilter: "blur(4px)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="3" stroke="white" strokeWidth="1.6" />
            <circle cx="8.5" cy="9.5" r="1.6" fill="white" />
            <path d="M4 17l4.5-4.5 3 3L16 11l4 4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-[32px] font-normal leading-[38.4px] tracking-[-0.96px] text-white">
            Talent
          </span>
          <span className="text-[14px] font-normal leading-[18.2px] tracking-[-0.42px] text-white">
            Shaping the Future
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Desktop pinned scene: a 250vh track with a 100vh sticky panel. While pinned,
   the cards parallax in from the edges and the stat emphasis cycles.
--------------------------------------------------------------------------- */
function PinnedScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Stat emphasis: 0 → 2 (one line at a time), settled within the pin.
  const act = useTransform(scrollYProgress, [0.08, 0.92], [0, 2], { clamp: true });

  // Cards slide in from the edges + fade over the first third of the pin.
  const enter = useTransform(scrollYProgress, [0, 0.32], [0, 1], { clamp: true });
  const fade = useTransform(enter, [0, 1], [0, 1]);
  const resultsX = useTransform(enter, [0, 1], [-72, 0]);
  const talentX = useTransform(enter, [0, 1], [72, 0]);
  const provenX = useTransform(enter, [0, 1], [-56, 0]);
  const provenY = useTransform(enter, [0, 1], [64, 0]);

  return (
    <div ref={ref} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-clip">
        {/* centred stat block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <StatLine act={act} index={0}>
            35 Days Average time-to-fill.
          </StatLine>
          <StatLine act={act} index={1}>
            100% Results delivered.
          </StatLine>
          <StatLine act={act} index={2}>
            85+ Executives placed at Global Companies.
          </StatLine>
        </div>

        {/* floating cards on the 1280 design frame, centred on wider screens */}
        <div className="pointer-events-none absolute inset-0">
          <div className="relative mx-auto h-full w-[1280px] max-w-full">
            <motion.div style={{ x: resultsX, opacity: fade }} className="absolute left-6 top-[9%]">
              <ResultsCard />
            </motion.div>
            <motion.div
              style={{ x: provenX, y: provenY, opacity: fade }}
              className="absolute left-20 bottom-[7%]"
            >
              <ProvenCard />
            </motion.div>
            <motion.div style={{ x: talentX, opacity: fade }} className="absolute right-6 top-[17%]">
              <TalentCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section4SocialProof() {
  const reduce = useReducedMotion();

  return (
    <section data-nav-theme="light" className="relative w-full overflow-clip bg-white">
      {/* desktop: pinned scroll scene (static fallback when reduced motion) */}
      <div className="hidden lg:block">
        {reduce ? (
          <div className="relative mx-auto flex h-screen w-[1280px] max-w-full items-center justify-center">
            <StatBlockStatic />
            <div className="absolute left-6 top-[9%]">
              <ResultsCard />
            </div>
            <div className="absolute left-20 bottom-[7%]">
              <ProvenCard />
            </div>
            <div className="absolute right-6 top-[17%]">
              <TalentCard />
            </div>
          </div>
        ) : (
          <PinnedScene />
        )}
      </div>

      {/* mobile: stacked */}
      <div className="flex flex-col items-center gap-12 px-6 py-24 lg:hidden">
        <StatBlockStatic />
        <div className="flex flex-wrap items-center justify-center gap-6">
          <ResultsCard />
          <TalentCard />
          <ProvenCard />
        </div>
      </div>
    </section>
  );
}
