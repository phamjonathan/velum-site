import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutMission from "@/components/AboutMission";
import AboutFounders from "@/components/AboutFounders";
import AboutWhy from "@/components/AboutWhy";
import Section8Testimonials from "@/components/Section8Testimonials";
import Section9Footer from "@/components/Section9Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Velum is a creator-management agency that turns OnlyFans pages into category-leading brands. Operators in the game since 2020.",
};

export default function About() {
  return (
    <main className="w-full bg-white">
      <AboutHero />
      <AboutMission />
      <AboutFounders />
      <AboutWhy />

      <section data-nav-theme="light" className="w-full bg-white pt-[120px] pb-12 lg:pt-[160px] lg:pb-16">
        <h2 className="m-0 px-6 text-center text-[32px] font-normal leading-[1.2] tracking-[-1px] text-[#6b85af] sm:text-[40px] lg:text-[48px] lg:leading-[57.6px] lg:tracking-[-1.44px]">
          Testimonials
        </h2>
      </section>
      <Section8Testimonials />

      <Section9Footer />
    </main>
  );
}
