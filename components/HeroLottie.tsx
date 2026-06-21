"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's bottom marquee is the exact Lottie animation the live site uses
 * (cdn.lottielab.com/l/3nEZbDQHYtsoDu.json — 1440×220, a scrolling row of placed
 * executives + company logos with a central glowing featured card). Rendered
 * with lottie-web; image assets stream from the Lottie CDN. Paused under
 * prefers-reduced-motion.
 */
export default function HeroLottie({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let anim: { destroy: () => void } | undefined;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !ref.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      anim = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: !reduce,
        path: "/hero-marquee.json",
        assetsPath: "/lottie/",
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
      });
    });

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden />;
}
