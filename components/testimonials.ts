const A = "/assets";

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  body: string;
  logo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aura",
    role: "Creator · Top 0.5% OnlyFans",
    avatar: `${A}/12f172cd6a6e33fb.png`,
    quote:
      "“Velum runs my page like a real business — my net revenue tripled in a single quarter…”",
    body: "The chatting team sounds exactly like me, my DMs are covered around the clock, and I finally see live numbers instead of guessing. I just focus on content now — they handle the machine behind it. If you're serious about growth, work with Velum.",
  },
  {
    name: "Lumière",
    role: "Creator & Model",
    avatar: `${A}/12471f895ddbbdb1.png`,
    quote:
      "“I stopped leaving money on the table the day I signed with Velum…”",
    body: "They audited my pricing and funnels and rebuilt my PPV strategy from scratch. Same content, far more revenue — and the spender development turned one-time buyers into fans who actually stick around.",
  },
  {
    name: "Nova",
    role: "Creator · 1.2M+ followers",
    avatar: `${A}/a8900c96b0b1f1af.png`,
    quote:
      "“The speed and discretion are unreal. Vetted operators, in my voice, 24/7…”",
    body: "What impressed me most was how quiet and professional the whole thing is. My privacy and brand come first, the team is data-driven, and my fans have no idea anything changed except that I reply faster.",
  },
  {
    name: "Eden Co.",
    role: "Creator Collective",
    avatar: `${A}/56f8dc966aa6fe08.png`,
    quote:
      "“We manage several pages and Velum scaled all of them without dropping the ball…”",
    body: "Every account is treated like its own business with real targets. Done-for-you scripts, live dashboards, and a team that optimizes daily — the month-over-month growth speaks for itself.",
  },
  {
    name: "Halcyon",
    role: "Creator Studio",
    avatar: `${A}/f3fa58a41501a9ec.jpg`,
    quote:
      "“Velum feels like a partner, not a vendor. A founder actually reads every account…”",
    body: "No faceless sales floor, no bots — just operators who know the niche. They took us from leaking revenue to a 24/7 growth machine in weeks, and the reporting keeps everyone honest.",
  },
  {
    name: "Velvet",
    role: "Creator · Top 1%",
    avatar: `${A}/18d9fa8d93100075.png`,
    quote: "“Relationship-led, not quick cash. That's the difference…”",
    body: "The team develops long-term spenders instead of burning fans out. My recurring revenue is the highest it's ever been, and I finally have time back to just create.",
  },
];
