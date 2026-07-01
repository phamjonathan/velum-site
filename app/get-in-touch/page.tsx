import type { Metadata } from "next";
import GetInTouchForm from "@/components/GetInTouchForm";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: "Get a free account analysis from Velum. Running $20k+ net monthly or 20+ paid fans a day? Let's grow together.",
};

export default function GetInTouch() {
  return (
    <main className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-white">
      {/* scenic background */}
      <img
        src="/assets/aEbtj3NLNHdGNL9ZOUKQR34Nmho.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* centered form card */}
      <div className="relative flex h-full w-full items-center justify-center px-4 pt-[94px]">
        <GetInTouchForm />
      </div>

      {/* minimal footer bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-6 text-[14px] leading-[18px] tracking-[-0.42px] text-white">
        <span>velum.</span>
        <span>2025</span>
      </div>
    </main>
  );
}
