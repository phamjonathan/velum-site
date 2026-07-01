"use client";

import Marquee from "./Marquee";
import { Reveal } from "./Reveal";

const LOTTIE = "/lottie";
const LOGO_HEIGHT = 40;
const LOGO_HEIGHT_LARGE = 60;
const LOGO_GAP = 56;

const logos = [
  { src: `${LOTTIE}/logo-onlyfans.png`, alt: "OnlyFans", intrinsicW: 4096, intrinsicH: 1028 },
  { src: `${LOTTIE}/logo-fansly.png`, alt: "Fansly", intrinsicW: 3840, intrinsicH: 1076 },
  {
    src: `${LOTTIE}/logo-fanvue.png`,
    alt: "Fanvue",
    intrinsicW: 690,
    intrinsicH: 362,
    large: true,
  },
  { src: `${LOTTIE}/logo-mym.png`, alt: "MYM", intrinsicW: 200, intrinsicH: 200, large: true },
  { src: `${LOTTIE}/logo-subs.png`, alt: "Subs", intrinsicW: 447, intrinsicH: 447, large: true },
];

function displaySize(intrinsicW: number, intrinsicH: number, large?: boolean) {
  const height = large ? LOGO_HEIGHT_LARGE : LOGO_HEIGHT;
  const width = Math.round((height * intrinsicW) / intrinsicH);
  return { width, height };
}

export default function Section2SocialProof() {
  return (
    <section data-nav-theme="light" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto w-[1280px] max-w-full px-10 py-[160px] md:py-[200px] xl:py-[240px]">
        {/* oversized headline */}
        <Reveal>
          <h1 className="hf-grad m-0 max-w-[1200px] text-left text-[34px] font-normal leading-[1.1] tracking-[-1px] sm:text-[44px] lg:text-[56px] lg:tracking-[-1.6px] xl:text-[64px] xl:leading-[70.4px] xl:tracking-[-1.92px]">
            We don&rsquo;t just manage creators &mdash; we build category-leading brands, with a
            data-driven team that treats every account like a business with real targets.
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
              <div className="flex items-center">
                {logos.map((logo) => {
                  const { width, height } = displaySize(
                    logo.intrinsicW,
                    logo.intrinsicH,
                    logo.large,
                  );

                  return (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      width={width}
                      height={height}
                      className="shrink-0 object-contain"
                      style={{ width, height, marginRight: LOGO_GAP }}
                    />
                  );
                })}
              </div>
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
