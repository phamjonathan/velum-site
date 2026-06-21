"use client";

import Marquee from "./Marquee";
import { Reveal } from "./Reveal";

const A = "/assets";

const logos = [
  { src: `${A}/91b55f60ae1704d6.png`, square: true },
  { src: `${A}/73f846b5cd49dbe1.png`, square: true },
  { src: `${A}/877a49fb6596307c.png`, square: true },
  { src: `${A}/7b5a754945d28340.png`, square: true },
  { src: `${A}/ff1e54559ba0acd2.png`, square: true },
  { src: `${A}/ebfa9ca225bdad8f.png`, square: true },
  { src: `${A}/739595eaf9bbd39a.png`, square: true },
  { src: `${A}/4ed44ac05f14faf2.png`, square: false },
];

export default function Section2SocialProof() {
  return (
    <section data-nav-theme="light" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto w-[1280px] max-w-full px-10 py-[160px] md:py-[200px] xl:py-[240px]">
        {/* oversized headline */}
        <Reveal>
          <h1 className="hf-grad m-0 max-w-[1200px] text-left text-[34px] font-normal leading-[1.1] tracking-[-1px] sm:text-[44px] lg:text-[56px] lg:tracking-[-1.6px] xl:text-[64px] xl:leading-[70.4px] xl:tracking-[-1.92px]">
            At Highflyers, We Envision a Future Where Businesses Unlock Their Full Potential by
            Building High-Performing Teams Ready for Tomorrow&rsquo;s Challenges.
          </h1>
        </Reveal>

        {/* trusted by */}
        <div className="mt-[120px] flex flex-col items-center gap-6 xl:mt-[160px]">
          <Reveal>
            <p className="m-0 text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
              Trusted By
            </p>
          </Reveal>

          <div className="w-full max-w-[820px]">
            <Marquee duration={32}>
              {logos.map((l, i) => (
                <div
                  key={i}
                  className="flex h-[120px] w-[150px] shrink-0 items-center justify-center"
                >
                  <img
                    src={l.src}
                    alt=""
                    className={
                      l.square
                        ? "h-[110px] w-auto object-contain"
                        : "h-[34px] w-auto object-contain"
                    }
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* corner label */}
      <p className="absolute bottom-6 right-10 m-0 text-[16px] leading-[20.8px] tracking-[-0.48px] text-[#bdbdbd]">
        Our process
      </p>
    </section>
  );
}
