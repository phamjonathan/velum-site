import { CtaArrow } from "./icons";

/**
 * The frosted "Get in Touch" pill (framer-12vx0dh) — exact computed styles &
 * hover behaviour from the live DOM:
 *  - 169×50, gradient glass fill, inset white/40 glow, 1px white/16 border, blur
 *  - a 50×50 lavender circle (linear-gradient(45deg,#9492ff,#e2d4ff)) flush-right
 *    holding the white arrow glyph
 *  - on hover the circle's width animates 50px → full, so the lavender gradient
 *    sweeps across the whole pill; the arrow stays pinned right, text stays white
 */
export default function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      className={`group relative flex h-[50px] w-[169px] items-center overflow-clip rounded-[100px] pl-6 pr-16 transition-transform duration-300 hover:-translate-y-[1px] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(105deg, rgba(109,155,192,0.16) 0%, rgba(255,255,255,0.08) 100%)",
        boxShadow:
          "inset 0 0 8px 2px rgba(255,255,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.16)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* lavender circle that expands to fill the pill on hover */}
      <span
        className="absolute right-0 top-0 h-[50px] w-[50px] rounded-full transition-[width] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        style={{
          backgroundImage: "linear-gradient(45deg, rgb(148,146,255) 0%, rgb(226,212,255) 100%)",
        }}
        aria-hidden
      />

      <span className="relative z-10 whitespace-nowrap text-[16px] leading-[20.8px] tracking-[-0.48px] text-white">
        Get in Touch
      </span>

      {/* arrow pinned to the right cap */}
      <span className="absolute right-[17px] top-1/2 z-20 -translate-y-1/2" aria-hidden>
        <CtaArrow />
      </span>
    </a>
  );
}
