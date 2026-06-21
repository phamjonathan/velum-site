"use client";

import { useState } from "react";

const A = "/assets";

const categories = ["All", "Future", "Hiring", "Growth", "Culture"];

type Post = { cat: string; date: string; title: string; img: string };

const posts: Post[] = [
  {
    cat: "Hiring",
    date: "September 21, 2025",
    title: "Inside the Hiring Process at Hypergrowth Companies.",
    img: `${A}/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg`,
  },
  {
    cat: "Future",
    date: "September 14, 2025",
    title: "Top Skills Startups Will Need in 2030.",
    img: `${A}/2uTNEj5aTl2K3NJaEFWMbnrA.jpg`,
  },
  {
    cat: "Growth",
    date: "August 28, 2025",
    title: "How to Hire Executives in Just 35 Days.",
    img: `${A}/aNsAT3jCvt4zglbWCUoFe33Q.jpg`,
  },
  {
    cat: "Culture",
    date: "August 5, 2025",
    title: "Scaling from 50 to 2000+: Lessons from Startups.",
    img: `${A}/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg`,
  },
];

function PostCard({ p }: { p: Post }) {
  return (
    <a href="#" className="group relative block h-[520px] overflow-hidden lg:h-[680px]">
      <img
        src={p.img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div
          className="flex h-[440px] w-[300px] max-w-full flex-col items-center rounded-[48px] p-8 text-center text-white"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <span
            className="rounded-full px-3 py-1.5 text-[12px] leading-[15.6px] tracking-[-0.36px]"
            style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          >
            {p.cat}
          </span>

          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="m-0 text-[12px] leading-[15.6px] tracking-[-0.36px]">{p.date}</p>
            <h3 className="m-0 text-[24px] font-normal leading-[28.8px] tracking-[-0.72px]">
              {p.title}
            </h3>
          </div>

          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[16px] leading-[20.8px] tracking-[-0.48px]"
            style={{ backgroundColor: "rgba(0,0,0,0.16)" }}
          >
            Read
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogContent() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.cat === active);

  return (
    <section data-nav-theme="light" className="w-full bg-white pb-24 pt-[120px] lg:pb-[120px] lg:pt-[160px]">
      <div className="px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-baseline">
          <h1 className="m-0 text-[40px] font-normal leading-[48px] tracking-[-1.2px] text-[#6b85af]">
            Blog
          </h1>
          <div className="flex flex-wrap items-baseline">
            {categories.map((c, i) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="text-[28px] font-normal leading-[48px] tracking-[-1.2px] transition-colors lg:text-[40px]"
                style={{ color: active === c ? "#6b85af" : "#bac4d5" }}
              >
                {c}
                {i < categories.length - 1 ? ", " : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 h-px w-full bg-black/10" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <PostCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
