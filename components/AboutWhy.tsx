"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const A = "/assets";

type Value = { n: string; title: string; body: string };

const values: Value[] = [
  { n: "01", title: "24/7 Chatting", body: "Vetted operators across every time zone who sound exactly like you — your DMs are never left cold." },
  { n: "02", title: "Data-Driven", body: "Live earnings dashboards, PPV performance, and spender development tracked daily. No guesswork." },
  { n: "03", title: "Discreet & Professional", body: "Your privacy and brand come first. We operate quietly, securely, and entirely in your voice." },
  { n: "04", title: "Built to Scale", body: "Relationship-led monetization that turns one-time buyers into long-term, recurring revenue." },
  { n: "05", title: "Operators Since 2020", body: "In the game from day one, with $50M+ generated for the creators we partner with." },
  { n: "06", title: "Fast Onboarding", body: "From first call to full-scale chatting in days — we find where revenue is leaking and fix it fast." },
  { n: "07", title: "Done-For-You Content", body: "Guides, captions, and sales scripts tuned to your niche, so every message converts." },
  { n: "08", title: "Long-Term Spenders", body: "We develop recurring whales, not quick cash — building fans who stay and keep spending." },
  { n: "09", title: "Founder-Led", body: "A founder reads every account. You get real operators, not a faceless sales floor." },
  { n: "10", title: "Real Targets", body: "We treat every account like a business with real revenue goals, not a side hustle." },
];

const CARD_W = 300;
const GAP = 24;
const STRIDE = CARD_W + GAP;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutWhy() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = values.length;
  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [go, reduce]);

  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 34 };

  return (
    <section data-nav-theme="light" className="relative w-full overflow-hidden bg-white">
      <img
        src={`${A}/24jW6oM4sy27LtVbtEqBBgYmgQ.webp`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex flex-col items-center gap-12 py-[120px] lg:gap-16 lg:py-[160px]">
        <h2 className="m-0 px-6 text-center text-[32px] font-normal leading-[1.2] tracking-[-1px] text-[#6b85af] sm:text-[40px] lg:text-[48px] lg:leading-[57.6px] lg:tracking-[-1.44px]">
          Why velum?
        </h2>

        {/* centered carousel */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-y-1/2"
            style={{ gap: GAP }}
            animate={{ x: -(active * STRIDE + CARD_W / 2) }}
            transition={spring}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                className="hf-border-line flex h-[460px] shrink-0 flex-col justify-between rounded-[40px] p-6 text-white"
                style={{
                  width: CARD_W,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                animate={{ scale: i === active ? 1 : 0.86, opacity: i === active ? 1 : 0.6 }}
                transition={spring}
              >
                <div className="flex flex-col gap-4">
                  <h5 className="m-0 text-[32px] font-normal leading-[38.4px] tracking-[-0.96px]">{v.title}</h5>
                  <p className="m-0 text-[18px] font-normal leading-[23.4px] tracking-[-0.54px]">{v.body}</p>
                </div>
                <span
                  className="self-center rounded-full px-4 py-1.5 text-[16px] leading-none tracking-[-0.48px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.16)" }}
                >
                  {`{ ${v.n}. }`}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* prev / next arrows flanking the centre card */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex w-[392px] max-w-full justify-between">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                <Chevron dir="left" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </div>

        {/* dot pagination */}
        <div className="flex items-center gap-2">
          {values.map((v, i) => (
            <button
              key={v.n}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === active ? 22 : 8,
                backgroundColor: i === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
