import type { Metadata } from "next";
import BlogContent from "@/components/BlogContent";
import Section9Footer from "@/components/Section9Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on hiring, future skills, growth, and culture from Highflyers.",
};

export default function Blog() {
  return (
    <main className="w-full bg-white">
      <BlogContent />
      <Section9Footer />
    </main>
  );
}
