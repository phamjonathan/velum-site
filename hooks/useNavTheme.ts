"use client";

import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

/** Vertical sample point — centre of the fixed nav pill (~47px from viewport top). */
const NAV_SAMPLE_Y = 47;

/**
 * Detects which `[data-nav-theme]` section sits behind the fixed nav by sampling
 * scroll position. Re-runs on route changes and resize.
 */
export function useNavTheme(pathname: string): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");

  useEffect(() => {
    function update() {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let next: NavTheme = "dark";

      for (const el of sections) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= NAV_SAMPLE_Y && bottom > NAV_SAMPLE_Y) {
          next = el.dataset.navTheme === "light" ? "light" : "dark";
          break;
        }
      }

      setTheme((prev) => (prev === next ? prev : next));
    }

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("velum-scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("velum-scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return theme;
}
