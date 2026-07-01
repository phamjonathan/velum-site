"use client";

import { Reveal } from "./Reveal";

const A = "/assets";

type Card = {
  label: string;
  title: string;
  body: string;
  mockup: string;
  glass: string;
  gradient: string;
};

const cards: Card[] = [
  {
    label: "{ Day 1. }",
    title: "Discovery Call",
    body: "We start with a call to understand your account, your goals, and exactly where revenue is leaking today.",
    mockup: `${A}/05a71489ac9a094b.png`,
    glass: `${A}/7f5349c5c0e8ad8c.png`,
    gradient: "linear-gradient(155deg, #b4cfe9 0%, #d8e5f1 100%)",
  },
  {
    label: "{ 1–3 Days. }",
    title: "Account Audit",
    body: "A deep audit of your chatting, pricing, and funnels to surface the biggest, fastest growth levers.",
    mockup: `${A}/82c8e9f6ad1d7c5c.png`,
    glass: `${A}/9a00d96c278c1c77.png`,
    gradient: "linear-gradient(155deg, #6f8fc8 0%, #9eb9da 100%)",
  },
  {
    label: "{ Week 1. }",
    title: "Custom Growth Plan",
    body: "A tailored playbook — scripts, schedules, and PPV strategy built around your fans and your niche.",
    mockup: `${A}/804e63c4ef928611.png`,
    glass: `${A}/668cd26a0c4f68a5.png`,
    gradient: "linear-gradient(155deg, #9aa6b0 0%, #c7ced5 100%)",
  },
  {
    label: "{ Ongoing. }",
    title: "Scale With Velum",
    body: "Our team runs 24/7 chatting and continuous optimization while you watch revenue climb, month over month.",
    mockup: `${A}/359572b8c4d0a129.png`,
    glass: `${A}/7cf1ebec818b4d7d.png`,
    gradient: "linear-gradient(155deg, #6f8fc8 0%, #aac4e2 100%)",
  },
];

function ProcessCard({ card }: { card: Card }) {
  return (
    <Reveal className="w-full max-w-[400px]">
      <div className="rounded-[40px] bg-black p-2">
        <div
          className="relative flex h-[560px] flex-col items-center overflow-hidden rounded-[32px] px-6 pt-7"
          style={{ backgroundImage: card.gradient }}
        >
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-[15px] leading-none tracking-[-0.4px] text-white backdrop-blur-sm">
            {card.label}
          </span>

          <h4 className="mt-5 max-w-[336px] text-center text-[34px] font-normal leading-[1.1] tracking-[-1px] text-white">
            {card.title}
          </h4>

          {/* illustration area */}
          <div className="pointer-events-none relative mt-2 flex w-full flex-1 items-center justify-center">
            <img src={card.mockup} alt="" className="w-[300px] max-w-[88%] object-contain" />
            <img
              src={card.glass}
              alt=""
              className="absolute bottom-2 right-2 w-[150px] object-contain opacity-90"
            />
          </div>

          <p className="relative z-10 pb-7 text-center text-[14px] leading-[20px] tracking-[-0.4px] text-white/90">
            {card.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Section3About() {
  return (
    <section data-nav-theme="light" className="relative w-full overflow-clip bg-white">
      <div className="mx-auto flex w-[1280px] max-w-full justify-center">
        {/* left intro (sticky on desktop) */}
        <aside className="sticky top-0 hidden h-screen w-[307px] shrink-0 flex-col justify-center px-6 lg:flex">
          <p className="m-0 text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
            4 Simple Steps
          </p>
          <h5 className="mt-6 m-0 text-[32px] font-normal leading-[38.4px] tracking-[-0.96px] text-black">
            Your Roadmap to Scaling with Velum.
          </h5>
        </aside>

        {/* center cards */}
        <div className="flex w-full max-w-[666px] flex-col items-center gap-4 px-5 pb-24 pt-28 lg:pt-[160px]">
          {/* mobile intro */}
          <div className="mb-6 w-full max-w-[400px] lg:hidden">
            <p className="m-0 text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
              4 Simple Steps
            </p>
            <h5 className="mt-4 m-0 text-[28px] font-normal leading-[1.2] tracking-[-0.96px] text-black">
              Your Roadmap to Scaling with Velum.
            </h5>
          </div>

          {cards.map((c) => (
            <ProcessCard key={c.title} card={c} />
          ))}

          {/* mobile closing paragraph */}
          <p className="mt-6 w-full max-w-[400px] text-left text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd] lg:hidden">
            From the first call to full-scale chatting — here&rsquo;s exactly how we take your
            account from leaking revenue to a 24/7 growth machine.
          </p>
        </div>

        {/* right rail (desktop) */}
        <aside className="relative hidden w-[307px] shrink-0 lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center px-6">
            <p className="m-0 text-right text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
              From the first call to full-scale chatting — here&rsquo;s exactly how we take your
              account from leaking revenue to a 24/7 growth machine.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
