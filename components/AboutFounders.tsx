const A = "/assets";

type Founder = {
  name: string;
  role: string;
  bio: string;
  bg: string;
  initial: string;
};

const founders: Founder[] = [
  {
    name: "Jonathan",
    role: "Founder",
    bio: "Operating in the industry since 2020, Jonathan built Velum to run creator pages like real businesses. He reads every account personally — no faceless sales floor — pairing hands-on market experience with a data-driven approach that has generated $50M+ for the creators Velum partners with.",
    bg: `${A}/nWdOiFT5Q147p2rHB8SATZmCjtE.webp`,
    initial: "J",
  },
  {
    name: "The Velum Team",
    role: "Operations & Chatting",
    bio: "A vetted team of operators covering every time zone, 24/7. They sound exactly like you, run the pricing, funnels, and PPV strategy behind the scenes, and track live earnings daily — the discreet, professional machine that keeps your DMs converting around the clock.",
    bg: `${A}/24yYgBfAVnE0mrzNW6YrVYlrzo.webp`,
    initial: "V",
  },
];

function FounderCard({ f }: { f: Founder }) {
  return (
    <div className="group relative h-[480px] w-full overflow-hidden rounded-[40px] lg:h-[600px]">
      <img src={f.bg} alt="" className="absolute inset-0 h-full w-full object-cover" />

      {/* glass info chip (expands to reveal the bio on hover) */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 lg:inset-x-10">
        <div
          className="hf-border-line relative overflow-hidden rounded-[28px] p-3"
          style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/30 text-[18px] text-white">
              {f.initial}
            </span>
            <div className="flex flex-col">
              <span className="text-[24px] font-normal leading-[28.8px] tracking-[-0.72px] text-white">
                {f.name}
              </span>
              <span className="text-[16px] font-normal leading-[20.8px] tracking-[-0.48px] text-white">
                {f.role}
              </span>
            </div>
            <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-[20px] leading-none text-white transition-transform group-hover:rotate-45">
              +
            </span>
          </div>

          {/* bio — collapsed by default, expands on hover */}
          <p className="m-0 grid grid-rows-[0fr] overflow-hidden text-[15px] leading-[21px] tracking-[-0.4px] text-white/90 transition-all duration-500 group-hover:mt-4 group-hover:grid-rows-[1fr]">
            <span className="min-h-0 overflow-hidden">{f.bio}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutFounders() {
  return (
    <section data-nav-theme="light" className="w-full bg-white px-6 pb-[80px] lg:pb-[120px]">
      <div className="mx-auto grid w-[1280px] max-w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {founders.map((f) => (
          <FounderCard key={f.name} f={f} />
        ))}
      </div>
    </section>
  );
}
