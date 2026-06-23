"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Styled select to replace the native <select> on the contact form — the closed
 * trigger matches the form's frosted fields (rgba(0,0,0,0.08) / radius 16 / white
 * text) and the open panel is a frosted glass menu with hoverable option rows,
 * so the options aren't the unstyleable native dropdown.
 */
export default function Dropdown({
  name,
  options,
  placeholder = "Please choose",
  required = false,
}: {
  name?: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {name && <input type="hidden" name={name} value={value} required={required} />}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-[14px] text-left text-[16px] leading-[20px] outline-none transition-transform duration-300 hover:-translate-y-[1px]"
        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
      >
        <span className={value ? "text-white" : "text-white/55"}>{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-2xl border border-white/12 p-1 shadow-[0_14px_44px_rgba(10,20,40,0.4)]"
          style={{ backgroundColor: "rgba(12,20,38,0.72)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          {options.map((o) => {
            const selected = o === value;
            return (
              <li key={o} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(o);
                    setOpen(false);
                  }}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-[15px] leading-[20px] transition-colors duration-150 ${
                    selected ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  {o}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
