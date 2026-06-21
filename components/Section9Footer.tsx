import CtaButton from "./CtaButton";

const A = "/assets";

const navLinks = ["Home", "About", "Blog"];
const socialLinks = ["LinkedIn", "X (Twitter)", "Instagram"];

export default function Section9Footer() {
  return (
    <footer className="w-full bg-white">
      {/* scenic CTA panel */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${A}/1788ec6f551d13c5.webp`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative flex flex-col items-center gap-8 px-6 pb-24 pt-[120px] text-center lg:pb-[120px] lg:pt-[160px]">
          <p className="m-0 text-[16px] font-normal leading-[19.2px] tracking-[-0.48px] text-white">
            Stop Searching. Start Growing.
          </p>
          <h2 className="m-0 select-none whitespace-nowrap text-[64px] font-normal leading-none tracking-[-2px] text-white sm:text-[110px] lg:text-[200px] lg:leading-[240px] lg:tracking-[-6px]">
            highflyers.
          </h2>
          <CtaButton />
        </div>
      </div>

      {/* white footer */}
      <div className="px-6 pb-6 pt-20">
        <div className="mx-auto w-[1280px] max-w-full">
          <div className="flex flex-col gap-16 md:flex-row md:justify-between">
            {/* brand */}
            <div className="text-[40px] font-normal leading-[48px] tracking-[-1.2px] text-[#5a7ab5]">
              highflyers.
            </div>

            {/* nav + social */}
            <div className="flex flex-col gap-12 md:flex-row md:gap-24">
              <nav className="flex flex-col">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-[40px] font-normal leading-[48px] tracking-[-1.2px] text-[#6f8fc8] transition-opacity hover:opacity-70"
                  >
                    {l}
                  </a>
                ))}
              </nav>
              <nav className="flex flex-col">
                {socialLinks.map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-[40px] font-normal leading-[48px] tracking-[-1.2px] text-[#6f8fc8] transition-opacity hover:opacity-70"
                  >
                    {l}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* legal row */}
          <div className="mt-24 flex flex-col items-center gap-3 text-[14px] leading-[18px] tracking-[-0.42px] sm:flex-row sm:justify-between">
            <span className="text-[#bdbdbd]">All Right Reserved©</span>
            <div className="flex gap-6">
              <a href="#" className="text-black hover:opacity-70">
                Privacy Policy
              </a>
              <a href="#" className="text-black hover:opacity-70">
                Impressum
              </a>
            </div>
            <span className="text-[#bdbdbd]">2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
