import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "../page.css";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Get a free account analysis from Velum. Running $20k+ net monthly or 20+ paid fans a day? Let's grow together.",
};

export default function GetInTouchPage() {
  return (
    <>
      <SiteNav current="contact" />

      <header className="page-hero wrap">
        <span className="eyebrow">Get started</span>
        <h1>
          Let&apos;s grow <em>together</em>.
        </h1>
        <p className="lead">
          Running $20,000+ in net monthly revenue or 20+ paid fans a day? Get a free account analysis and see exactly what Velum can do for you.
        </p>
        <div className="center mt">
          <a
            className="btn"
            href="mailto:jonathan@velumagency.com?subject=Velum%20—%20Account%20Analysis"
          >
            <span className="btn-mail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="btn-div" />
            <span className="btn-label">Email jonathan@velumagency.com</span>
            <span className="btn-go">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>
      </header>

      <main>
        <section className="section wrap">
          <div className="grid">
            <div className="card">
              <h3>1 · Reach out</h3>
              <p>Send us a quick note with your page and your goals. A founder reads every message — no bots, no sales floor.</p>
            </div>
            <div className="card">
              <h3>2 · Free analysis</h3>
              <p>We audit your chatting, pricing, and funnels and show you exactly where revenue is leaking today.</p>
            </div>
            <div className="card">
              <h3>3 · Scale with Velum</h3>
              <p>If it&apos;s a fit, our team runs 24/7 chatting and continuous optimization while your revenue climbs.</p>
            </div>
          </div>

          <div className="prose mt">
            <p>Prefer DMs? Reach us on any of the channels below. We typically reply within one business day.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
