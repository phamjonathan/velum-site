import Link from "next/link";

type SiteNavProps = {
  current?: "home" | "about" | "contact";
};

export default function SiteNav({ current }: SiteNavProps) {
  return (
    <nav id="nav">
      <div className="navpill">
        <div className="brand">VELUM</div>
        <span className="nav-div" />
        <div className="links">
          <Link href="/" className={current === "home" ? "current" : undefined}>
            <svg
              className="nav-home"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20h14V9.5" />
            </svg>
            Home
          </Link>
          <Link href="/about" className={current === "about" ? "current" : undefined}>
            About
          </Link>
        </div>
        <span className="nav-div" />
        <Link className="nav-cta" href="/get-in-touch">
          Get in Touch
          <span className="arrowc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </nav>
  );
}
