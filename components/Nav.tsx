"use client";

import { usePathname } from "next/navigation";
import { useNavTheme } from "@/hooks/useNavTheme";
import CtaButton from "./CtaButton";

/**
 * Fixed nav chrome (framer-1y0ydn8-container / framer-390s2b). Styles below are
 * the exact computed values read from the live highflyers.ai DOM:
 *  - outer pill: bg rgba(255,255,255,0.08), opacity 0.8, inset white/24 glow,
 *    blur(8px), radius 100px, padding 6/6/6/24, gap 16
 *  - link pill: bg rgba(108,155,193,0.24), radius 100, ::after 1px white/10
 *  - active link: rgba(255,255,255,0.2) highlight, white text
 *  - all text: Inter Tight 400 white; brand 18px/-0.54px, links 16px/-0.48px
 *
 * Text colour toggles via `[data-nav-theme]` on page sections (see useNavTheme).
 */
const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const theme = useNavTheme(pathname);
  const light = theme === "light";
  const textClass = light ? "text-[#0f1730]" : "text-white";
  const isContact = pathname.startsWith("/get-in-touch");

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
          className={`pr-1 text-[18px] leading-[23.4px] tracking-[-0.54px] transition-colors duration-300 ${textClass}`}
        >
          highflyers.
        </a>

        {isContact ? (
          <a
            href="/"
            className={`flex items-center gap-2 rounded-[100px] bg-white/20 px-5 py-3 text-[16px] leading-[20.8px] tracking-[-0.48px] transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/30 ${textClass}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12l6-6M5 12l6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </a>
        ) : (
          <>
            <nav
              className="relative flex items-center rounded-[100px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[100px] after:border after:border-white/10"
              style={{ backgroundColor: "rgba(108,155,193,0.24)" }}
            >
              {links.map((l) => {
                const active =
                  l.href === "/" ? pathname === "/" : pathname.startsWith(l.href) && l.href !== "#";
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className={`relative rounded-[100px] px-5 py-3 text-[16px] leading-[20.8px] tracking-[-0.48px] transition-colors duration-300 ${textClass} ${
                      active ? "" : "hover:bg-white/10"
                    }`}
                    style={active ? { backgroundColor: "rgba(255,255,255,0.2)" } : undefined}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            <CtaButton className="hidden sm:flex" theme={theme} />
          </>
        )}
      </div>
    </div>
  );
}
