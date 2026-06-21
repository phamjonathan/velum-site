import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "../page.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Velum is a creator-management agency that turns OnlyFans pages into category-leading brands. Operators in the game since 2020.",
};

export default function AboutPage() {
  return (
    <>
      <SiteNav current="about" />

      <header className="page-hero wrap">
        <span className="eyebrow">About Velum</span>
        <h1>
          Operators in the game since <em>2020</em>.
        </h1>
        <p className="lead">
          Founded by Jonathan and active in the industry from day one — a trusted partner to leading agencies and creators around the world.
        </p>
      </header>

      <main>
        <section className="section wrap prose">
          <p>
            Velum exists because most creators are leaving money on the table — not from a lack of talent, but a lack of operations. We handle the unglamorous machine behind a top page: round-the-clock chatting, pricing, funnels, and fan retention, so you can stay focused on the part only you can do — creating.
          </p>
          <p>
            We don&apos;t just manage creators. We build category-leading personal brands, with a data-driven team that treats every account like a business with real targets, not a side hustle.
          </p>

          <div className="grid">
            <div className="card">
              <h3>24/7 Chatting</h3>
              <p>Vetted operators across every time zone who sound exactly like you — your DMs are never left cold.</p>
            </div>
            <div className="card">
              <h3>Data-Driven</h3>
              <p>Live earnings dashboards, PPV performance, and spender development tracked daily. No guesswork.</p>
            </div>
            <div className="card">
              <h3>Discreet &amp; Professional</h3>
              <p>Your privacy and brand come first. We operate quietly, securely, and entirely in your voice.</p>
            </div>
            <div className="card">
              <h3>Built to Scale</h3>
              <p>Relationship-led monetization that turns one-time buyers into long-term, recurring revenue.</p>
            </div>
          </div>

          <div className="stat-row">
            <div className="stat">
              <span className="n">$50M+</span>
              <span className="l">Generated for clients</span>
            </div>
            <div className="stat">
              <span className="n">2020</span>
              <span className="l">In the game since</span>
            </div>
            <div className="stat">
              <span className="n">24/7</span>
              <span className="l">Chatting coverage</span>
            </div>
          </div>

          <div className="center mt">
            <Link className="btn" href="/get-in-touch">
              <span className="btn-mail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span className="btn-div" />
              <span className="btn-label">Work with us</span>
              <span className="btn-go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
