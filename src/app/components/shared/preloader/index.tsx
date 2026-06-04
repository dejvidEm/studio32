"use client";

import { useEffect, useRef, useState } from "react";
import NavMark from "@/app/components/layout/logo/NavMark";

/**
 * Brand preloader — centered logo with a black → purple → white gradient sweep
 * that ends blended into the white panel, then the panel rolls away.
 */

const GRADIENT_MS = 1800;
const REVEAL_AT = GRADIENT_MS + 120;
const ROLLUP_MS = 950;
const HARD_CAP = 8000;

const GRADIENT_DUR = `${GRADIENT_MS / 1000}s`;

function preloaderGradientDefs() {
  return (
    <defs>
      <linearGradient
        id="preloader-brand-gradient"
        gradientUnits="objectBoundingBox"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#000000">
          <animate
            attributeName="stop-color"
            dur={GRADIENT_DUR}
            fill="freeze"
            values="#000000;#000000;#9B8CFF;#ffffff"
            keyTimes="0;0.2;0.55;1"
          />
        </stop>
        <stop offset="0.42" stopColor="#9B8CFF">
          <animate
            attributeName="stop-color"
            dur={GRADIENT_DUR}
            fill="freeze"
            values="#000000;#9B8CFF;#9B8CFF;#ffffff"
            keyTimes="0;0.35;0.7;1"
          />
          <animate
            attributeName="offset"
            dur={GRADIENT_DUR}
            fill="freeze"
            values="0.15;0.45;0.85;1"
            keyTimes="0;0.35;0.75;1"
          />
        </stop>
        <stop offset="100%" stopColor="#ffffff">
          <animate
            attributeName="stop-color"
            dur={GRADIENT_DUR}
            fill="freeze"
            values="#9B8CFF;#ffffff;#ffffff;#ffffff"
            keyTimes="0;0.5;0.85;1"
          />
        </stop>
        <animate
          attributeName="x1"
          dur={GRADIENT_DUR}
          fill="freeze"
          values="0%;60%;100%"
          keyTimes="0;0.45;1"
        />
        <animate
          attributeName="y1"
          dur={GRADIENT_DUR}
          fill="freeze"
          values="0%;40%;50%"
          keyTimes="0;0.45;1"
        />
        <animate
          attributeName="x2"
          dur={GRADIENT_DUR}
          fill="freeze"
          values="55%;100%;100%"
          keyTimes="0;0.5;1"
        />
        <animate
          attributeName="y2"
          dur={GRADIENT_DUR}
          fill="freeze"
          values="100%;60%;50%"
          keyTimes="0;0.5;1"
        />
      </linearGradient>
    </defs>
  );
}

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const reducedRef = useRef(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("preloader-active");

    reducedRef.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timers: number[] = [];

    const beginReveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      setRevealed(true);
    };

    timers.push(window.setTimeout(beginReveal, reducedRef.current ? 400 : REVEAL_AT));
    timers.push(window.setTimeout(beginReveal, HARD_CAP));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => {
      setMounted(false);
      document.documentElement.classList.remove("preloader-active");
    }, ROLLUP_MS + 80);
    return () => window.clearTimeout(t);
  }, [revealed]);

  if (!mounted) return null;

  const reduced = reducedRef.current;

  return (
    <div
      aria-hidden
      role="presentation"
      className={[
        "preloader-root fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white",
        "will-change-transform [transform-origin:top] [transition-timing-function:cubic-bezier(0.83,0,0.17,1)]",
        reduced ? "transition-opacity duration-500" : "transition-transform",
        revealed ? (reduced ? "opacity-0" : "-translate-y-full") : "",
        revealed && !reduced ? "preloader-root--revealing" : "",
      ].join(" ")}
      style={{ transitionDuration: `${ROLLUP_MS}ms` }}
    >
      <div className="preloader-mark-enter px-6">
        <NavMark
          aria-hidden
          markFill={reduced ? "var(--color-primary)" : "url(#preloader-brand-gradient)"}
          gradientDefs={reduced ? undefined : preloaderGradientDefs()}
          className="preloader-mark h-20 w-auto sm:h-24 md:h-28"
        />
      </div>
    </div>
  );
}
