"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { deckHtml } from "./deck-html";
import "../app/deck.css";

export default function Deck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (window as Window & { gsap?: typeof gsap }).gsap = gsap;

    const script = document.createElement("script");
    script.src = "/deck-controller.js";
    script.async = false;
    document.body.appendChild(script);

    return () => {
      script.remove();
      initialized.current = false;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="deck-root"
      dangerouslySetInnerHTML={{ __html: deckHtml }}
    />
  );
}
