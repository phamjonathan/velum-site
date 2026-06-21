const A = "/assets";

/**
 * About hero — single viewport: eyebrow, headline, brand wordmark, tagline.
 */
export default function AboutHero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-white">
      <img
        src={`${A}/HopPaAVul86SH5UOaRVQ7jFXvQA.webp`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* glowing orb */}
      <div
        className="pointer-events-none absolute right-[5%] top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full lg:block xl:h-[360px] xl:w-[360px]"
        style={{
          background:
            "radial-gradient(circle at 58% 62%, rgba(120,86,232,0.6) 0%, rgba(150,170,238,0.4) 32%, rgba(255,255,255,0.92) 68%)",
        }}
      />

      <p className="absolute inset-x-0 top-[22%] m-0 text-center text-[16px] leading-[20.8px] tracking-[-0.48px] text-white">
        About us
      </p>

      <h1 className="absolute left-1/2 top-1/2 m-0 max-w-[780px] -translate-x-1/2 -translate-y-1/2 px-6 text-center text-[24px] font-normal leading-[1.2] tracking-[-0.8px] text-white sm:text-[28px] lg:text-[32px] lg:leading-[38.4px] lg:tracking-[-0.96px]">
        Startup &amp; Scaleup Executive Search and Talent Acquistion. AI Talent Advisory.
      </h1>

      <div className="absolute inset-x-0 bottom-[22%] flex flex-col items-center gap-5 px-6 text-center">
        <h2 className="m-0 text-[40px] font-normal leading-none tracking-[-1.2px] text-white sm:text-[44px] lg:text-[48px] lg:leading-[57.6px] lg:tracking-[-1.44px]">
          highflyers.
        </h2>
        <p className="m-0 max-w-[620px] text-[16px] leading-[20.8px] tracking-[-0.48px] text-white">
          Redefining recruitment through boutique expertise and strategic advisory: smart,
          diverse, and fast.
        </p>
      </div>

      <p className="absolute bottom-6 right-10 m-0 text-[14px] leading-[18px] tracking-[-0.42px] text-white/80">
        Scroll to Explore
      </p>
    </section>
  );
}
