"use client";

import Marquee from "./Marquee";
import { testimonials, type Testimonial } from "./testimonials";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mr-6 flex h-[560px] w-[340px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[48px] bg-[#f8f8f8] p-6 sm:w-[360px]">
      <div className="flex flex-col items-start gap-9">
        {/* author */}
        <div className="flex items-center gap-3">
          <img src={t.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-[18px] leading-[23.4px] tracking-[-0.54px] text-[#6b85af]">
              {t.name}
            </span>
            <span className="text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
              {t.role}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-left">
          <h6 className="m-0 text-[24px] font-normal leading-[28.8px] tracking-[-0.72px] text-[#6b85af]">
            {t.quote}
          </h6>
          <p className="m-0 text-[16px] font-normal leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
            {t.body}
          </p>
        </div>
      </div>

      {t.logo && (
        <div className="flex justify-center pt-4">
          <img src={t.logo} alt="" className="h-9 w-auto object-contain" />
        </div>
      )}
    </div>
  );
}

export default function Section8Testimonials() {
  return (
    <section className="w-full overflow-hidden bg-white pt-16 pb-24 lg:pt-0 lg:pb-[120px]">
      <Marquee duration={60}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </Marquee>
    </section>
  );
}
