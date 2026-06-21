import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Renders the children track twice so the loop is
 * seamless, then translates -50%. Pauses on hover; disabled under reduced motion
 * (handled in globals.css).
 */
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className={`hf-marquee-track ${pauseOnHover ? "hf-paused" : ""}`}
        style={
          {
            "--hf-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
