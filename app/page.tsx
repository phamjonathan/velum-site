import type { Metadata } from "next";
import Section1Hero from "@/components/Section1Hero";
import Section2SocialProof from "@/components/Section2SocialProof";
import Section3About from "@/components/Section3About";
import Section4SocialProof from "@/components/Section4SocialProof";
import Section5Features from "@/components/Section5Features";
import Section7Testimonials from "@/components/Section7Testimonials";
import Section8Testimonials from "@/components/Section8Testimonials";
import Section9Footer from "@/components/Section9Footer";

export const metadata: Metadata = {
  title: "Velum — Best OnlyFans Management & Agency",
  description:
    "World-leading OnlyFans management & agency for creators ready for real growth. Stop Searching. Start Growing.",
};

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Section1Hero />
      <Section2SocialProof />
      <Section3About />
      <Section4SocialProof />
      <Section5Features />
      <Section7Testimonials />
      <Section8Testimonials />
      <Section9Footer />
    </main>
  );
}
