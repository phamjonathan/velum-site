"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const A = "/assets";

type Feature = {
  label: string;
  heading: string;
  body: string;
  num: string;
};

const features: Feature[] = [
  {
    label: "{ Dedicated Chatting. }",
    heading: "24/7 trained chatters across every time zone.",
    body: "Your DMs covered around the clock by vetted operators who sound exactly like you.",
    num: "01",
  },
  {
    label: "{ Revenue Reporting. }",
    heading: "Live earnings dashboard, updated daily.",
    body: "Track gross sales, top spenders and PPV performance in real time — no guesswork.",
    num: "02",
  },
  {
    label: "{ Fan Monetization. }",
    heading: "Long-term spender development, not quick cash.",
    body: "Relationship-led scripting that turns one-time buyers into recurring whales.",
    num: "03",
  },
  {
    label: "{ Content & Scripts. }",
    heading: "Done-for-you guides, captions & sales scripts.",
    body: "Proven playbooks tuned to your niche, so every message converts.",
    num: "04",
  },
];

/** Glass card — verified against live: 320×480, r32, blur 8, inset white glow. */
const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(113,156,176,0.4)",
  boxShadow: "inset 0 0 16px 8px rgba(255,255,255,0.25)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

/** Diagonal fan rest position on the 1280 design frame (≈ +104x / +100y per card). */
const restLeft = (i: number) => 318 + i * 104;
const restTop = (i: number) => 84 + i * 100;

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div
      className="hf-border-line relative flex h-[480px] w-[320px] flex-col justify-between overflow-hidden rounded-[32px] p-6 text-white"
      style={cardStyle}
    >
      <span className="self-center rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[15px] leading-none tracking-[-0.4px]">
        {f.label}
      </span>
      <div className="flex flex-col items-center gap-3 text-center">
        <h6 className="m-0 text-[24px] font-normal leading-[28.8px] tracking-[-0.72px]">
          {f.heading}
        </h6>
        <p className="m-0 hf-body-sm">{f.body}</p>
      </div>
      <div className="flex items-start leading-none">
        <span className="text-[32px] font-normal tracking-[-0.96px]">#</span>
        <span className="text-[72px] font-normal leading-[79.2px] tracking-[-2.16px]">{f.num}</span>
      </div>
    </div>
  );
}

/** A card that rises into view from below over its slice of the pinned scroll.
    Opacity stays constant (matches the live site — cards never fade). */
function AnimatedCard({
  f,
  i,
  progress,
}: {
  f: Feature;
  i: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + i * 0.2;
  const y = useTransform(progress, [start, start + 0.22], [800, 0], { clamp: true });
  return (
    <motion.div className="absolute" style={{ left: restLeft(i), top: restTop(i), y, zIndex: i }}>
      <FeatureCard f={f} />
    </motion.div>
  );
}

/** Faded display wordmark with a looping highlight sweep (two stacked layers). */
function Wordmark() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
      <div className="relative select-none whitespace-nowrap">
        <span
          className="font-display block text-[120px] font-normal leading-none tracking-[-0.05em]"
          style={{ color: "rgba(255,255,255,0.24)" }}
        >
          Clarity at Every Step
        </span>
        <span
          aria-hidden
          className="font-display absolute inset-0 block text-[120px] font-normal leading-none tracking-[-0.05em]"
          style={{
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 41%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 59%, rgba(255,255,255,0) 100%)",
            backgroundSize: "200% 200%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "hf-shimmer 5s linear infinite",
          }}
        >
          Clarity at Every Step
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Desktop pinned scene: a 550vh track with a 100vh sticky panel. The scenic
   background sits behind a faded wordmark; the 4 cards rise in sequence and
   stack into a diagonal fan (later cards in front).
--------------------------------------------------------------------------- */
function PinnedFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -100]);

  return (
    <div ref={ref} className="relative h-[550vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-clip bg-white">
        {/* scenic background (slow parallax drift, slightly over-scaled) */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src={`${A}/32f8216538f1273b.webp`}
            alt=""
            className="h-full w-full scale-125 object-cover"
          />
        </motion.div>

        {/* faded background wordmark with shimmer */}
        <Wordmark />

        {/* stepped cards on the 1280 design frame */}
        <div className="relative mx-auto h-full w-[1280px] max-w-full">
          {features.map((f, i) => (
            <AnimatedCard key={f.num} f={f} i={i} progress={scrollYProgress} />
          ))}
        </div>

        <p className="absolute bottom-6 right-10 m-0 text-[14px] leading-[18px] tracking-[-0.42px] text-white">
          Scroll Down
        </p>
      </div>
    </div>
  );
}

/** Static fanned layout for reduced-motion (no pin / no scroll cycle). */
function StaticFeatures() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <img
          src={`${A}/32f8216538f1273b.webp`}
          alt=""
          className="h-full w-full scale-125 object-cover"
        />
      </div>
      <Wordmark />
      <div className="relative mx-auto h-full w-[1280px] max-w-full">
        {features.map((f, i) => (
          <div
            key={f.num}
            className="absolute"
            style={{ left: restLeft(i), top: restTop(i), zIndex: i }}
          >
            <FeatureCard f={f} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Section5Features() {
  const reduce = useReducedMotion();

  return (
    <section data-nav-theme="dark" className="relative w-full overflow-clip bg-white">
      {/* desktop: pinned scroll scene (static fallback when reduced motion) */}
      <div className="hidden lg:block">{reduce ? <StaticFeatures /> : <PinnedFeatures />}</div>

      {/* mobile: stacked over the scenic backdrop */}
      <div className="relative lg:hidden">
        <div className="absolute inset-0">
          <img
            src={`${A}/32f8216538f1273b.webp`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative flex flex-col items-center gap-6 px-6 py-24">
          {features.map((f) => (
            <FeatureCard key={f.num} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
