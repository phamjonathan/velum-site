import CtaButton from "./CtaButton";

/**
 * Fixed nav chrome (framer-1y0ydn8-container / framer-390s2b). Styles below are
 * the exact computed values read from the live highflyers.ai DOM:
 *  - outer pill: bg rgba(255,255,255,0.08), opacity 0.8, inset white/24 glow,
 *    blur(8px), radius 100px, padding 6/6/6/24, gap 16
 *  - link pill: bg rgba(108,155,193,0.24), radius 100, ::after 1px white/10
 *  - active "Home": rgba(255,255,255,0.2) highlight, white text
 *  - all text: Inter Tight 400 white; brand 18px/-0.54px, links 16px/-0.48px
 */
const links = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "#", active: false },
  { label: "Blog", href: "#", active: false },
];

export default function Nav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-4">
      <div
        className="pointer-events-auto relative flex items-center gap-4 rounded-[100px] py-[6px] pl-6 pr-[6px] opacity-80"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 8px 4px rgba(255,255,255,0.24)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <a
          href="/"
          className="pr-1 text-[18px] leading-[23.4px] tracking-[-0.54px] text-white"
        >
          highflyers.
        </a>

        {/* blue link pill */}
        <nav
          className="relative flex items-center rounded-[100px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[100px] after:border after:border-white/10"
          style={{ backgroundColor: "rgba(108,155,193,0.24)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative rounded-[100px] px-5 py-3 text-[16px] leading-[20.8px] tracking-[-0.48px] text-white transition-colors ${
                l.active ? "" : "hover:bg-white/10"
              }`}
              style={l.active ? { backgroundColor: "rgba(255,255,255,0.2)" } : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <CtaButton className="hidden sm:flex" />
      </div>
    </div>
  );
}
