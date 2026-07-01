"use client";

import { useState } from "react";
import Dropdown from "./Dropdown";

/**
 * Get-in-Touch contact form — exact structure & styling from the live DOM:
 *  - the <form> IS the frosted card: bg rgba(0,0,0,0.04), backdrop-blur(16px),
 *    radius 40, inset white/40 glow, padding 48/16/16, 360px wide, gap 32
 *  - fields: label (white 14px) + control on a rgba(0,0,0,0.08) / radius-16 field,
 *    white text; First+Last and CompanyName+Size are 2-col rows
 *  - Submit: full-width lavender gradient pill
 * No public backend, so submit is handled client-side (shows a thank-you state).
 */
const fieldClass =
  "w-full rounded-2xl px-4 py-[14px] text-[16px] leading-[20px] text-white placeholder-white/55 outline-none";
const fieldStyle = { backgroundColor: "rgba(0,0,0,0.08)" } as const;
const labelClass = "text-[14px] leading-[18px] tracking-[-0.2px] text-white";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

const sizes = ["< $5k", "$5k–$20k", "$20k–$50k", "$50k–$100k", "$100k+"];

export default function GetInTouchForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="relative flex w-[360px] max-w-[calc(100vw-32px)] flex-col gap-8 rounded-[40px] p-4 pt-12"
      style={{
        backgroundColor: "rgba(0,0,0,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "inset 0 0 24px 8px rgba(255,255,255,0.4)",
      }}
    >
      <h5 className="m-0 text-center text-[32px] font-normal leading-[38.4px] tracking-[-0.96px] text-white">
        Get in Touch
      </h5>

      {sent ? (
        <p className="px-2 pb-6 text-center text-[16px] leading-[22px] text-white">
          Thanks for reaching out — we&rsquo;ll get back to you shortly.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Field label="First Name*">
              <input
                name="First Name"
                type="text"
                required
                placeholder="Enter your first name"
                className={fieldClass}
                style={fieldStyle}
              />
            </Field>
            <Field label="Last Name*">
              <input
                name="Last Name"
                type="text"
                required
                placeholder="Enter your last name"
                className={fieldClass}
                style={fieldStyle}
              />
            </Field>
          </div>

          <Field label="Email Address*">
            <input
              name="Email Address"
              type="email"
              required
              placeholder="name@company.com"
              className={fieldClass}
              style={fieldStyle}
            />
          </Field>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Creator / Page*">
              <input
                name="Creator / Page"
                type="text"
                required
                placeholder="Your page or handle"
                className={fieldClass}
                style={fieldStyle}
              />
            </Field>
            <Field label="Monthly Revenue*">
              <Dropdown name="Monthly Revenue" required placeholder="Please choose" options={sizes} />
            </Field>
          </div>

          <Field label="Leave us a Message*">
            <textarea
              name="Message"
              required
              rows={3}
              placeholder="Write your message here..."
              className={`${fieldClass} resize-none`}
              style={fieldStyle}
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-[100px] py-[15px] text-[16px] leading-[18px] text-white transition-all duration-300 hover:-translate-y-[1px] hover:brightness-[1.05]"
            style={{
              backgroundImage: "linear-gradient(126deg, rgb(178,171,255) 0%, rgb(194,185,255) 100%)",
              boxShadow: "inset 0 0 8px 2px rgba(255,255,255,0.4)",
            }}
          >
            Submit
          </button>
        </>
      )}
    </form>
  );
}
