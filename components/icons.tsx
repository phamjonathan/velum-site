import type { SVGProps } from "react";

/** Envelope / "Get in Touch" glyph — exact paths from the live page (id svg-1746029714_974). */
export function MailIcon({ fill = "currentColor", ...props }: SVGProps<SVGSVGElement> & { fill?: string }) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <path
        d="M7.78949 4.90749C10.9241 4.635 14.0765 4.635 17.2111 4.90749L18.7214 5.03877C19.7267 5.12617 20.5878 5.72584 21.034 6.58361C21.091 6.69335 21.0483 6.82621 20.9431 6.89132L14.6771 10.7702C13.3333 11.6022 11.6387 11.6196 10.278 10.8156L3.9702 7.0882C3.86829 7.02798 3.82151 6.90402 3.86744 6.79492C4.27559 5.82536 5.19322 5.13318 6.27925 5.03877L7.78949 4.90749Z"
        fill={fill}
      />
      <path
        d="M3.8623 8.76676C3.70634 8.6746 3.50734 8.77377 3.48916 8.95402C3.23542 11.4697 3.29683 14.0091 3.67339 16.5132C3.8719 17.8333 4.94931 18.8454 6.27926 18.961L7.78949 19.0923C10.9241 19.3647 14.0765 19.3647 17.2111 19.0923L18.7214 18.961C20.0513 18.8454 21.1287 17.8333 21.3272 16.5132C21.7148 13.9361 21.7685 11.3216 21.4885 8.73415C21.4688 8.55264 21.2665 8.45529 21.1112 8.55139L15.4667 12.0456C13.6485 13.1712 11.3559 13.1948 9.51493 12.1069L3.8623 8.76676Z"
        fill={fill}
      />
    </svg>
  );
}

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 5v14M12 19l6-6M12 19l-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The exact "Get in Touch" arrow glyph from the live page — a down-arrow path
   (viewBox 0 0 13.334 16.001) rotated -90° so it points right. */
export function CtaArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="13.334"
      height="16.001"
      viewBox="0 0 13.334 16.001"
      className={className}
      style={{ transform: "rotate(-90deg)" }}
    >
      <path
        d="M 13.139 9.805 L 7.139 15.805 C 7.014 15.93 6.844 16.001 6.667 16.001 C 6.49 16.001 6.32 15.93 6.195 15.805 L 0.195 9.805 C -0.065 9.545 -0.065 9.122 0.195 8.862 C 0.456 8.601 0.878 8.601 1.139 8.862 L 6 13.724 L 6 0.667 C 6 0.298 6.299 0 6.667 0 C 7.035 0 7.334 0.298 7.334 0.667 L 7.334 13.724 L 12.195 8.862 C 12.456 8.601 12.878 8.601 13.139 8.862 C 13.399 9.122 13.399 9.545 13.139 9.805 Z"
        fill="white"
      />
    </svg>
  );
}

/* The four thin quarter-arc corner strokes (#A4C1D8) the hero draws around its
   dotted accent — exact arcs from the live page. */
export function CornerArc({ d, ...props }: SVGProps<SVGSVGElement> & { d: string }) {
  return (
    <svg width="18" height="18" viewBox="-1 -1 18 18" fill="none" {...props}>
      <path d={d} stroke="#A4C1D8" strokeLinecap="round" />
    </svg>
  );
}
