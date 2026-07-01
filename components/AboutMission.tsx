/**
 * Mission statement — one big solid-blue type block (live renders it at 72px,
 * rgb(107,133,175), left-aligned in a ~980px column).
 */
export default function AboutMission() {
  return (
    <section data-nav-theme="light" className="w-full bg-white px-6 py-[120px] lg:py-[200px]">
      <h2 className="mx-auto m-0 max-w-[980px] text-left text-[28px] font-normal leading-[1.12] tracking-[-1px] text-[#6b85af] sm:text-[40px] lg:text-[72px] lg:leading-[79.2px] lg:tracking-[-2.16px]">
        Velum exists because most creators are leaving money on the table — not from a lack of
        talent, but a lack of operations. We handle the unglamorous machine behind a top page:
        round-the-clock chatting, pricing, funnels, and fan retention, so you can stay focused on
        the part only you can do — creating.
      </h2>
    </section>
  );
}
