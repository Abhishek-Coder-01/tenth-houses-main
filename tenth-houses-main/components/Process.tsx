"use client";

import { useEffect, useRef, useState } from "react";
import { process } from "@/lib/data";
import Reveal from "./Reveal";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

/*
  Pinned, scroll-stepped section.
  When the section reaches the middle of the screen it pins in place.
  Scrolling then reveals step 1 -> 2 -> 3 one by one (and hides them again
  when you scroll back). Only after the last step does the page move on.
*/

const SCREENS_PER_STEP = 0.6; // scroll distance per step, in viewport heights
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-gold"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const n = process.length;
  const [shown, setShown] = useState(0); // how many steps are visible
  const [still, setStill] = useState(false); // reduced motion: no pinning

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setShown(n);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const run = r.height - window.innerHeight; // distance the pin lasts
      // scrolled distance into the pinned range
      const p = run > 0 ? clamp(-r.top / run) : 0;
      // step i appears at p >= 0.04 + i * 0.3  (last step leaves a short hold)
      const count = r.top > 0 ? 0 : clamp(Math.floor((p - 0.04) / 0.3) + 1, 0, n);
      setShown(count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  // Delays apply only on the way in. Going back, everything reverses at once.
  const d = (on: boolean, ms: number) => ({ transitionDelay: on ? `${ms}ms` : "0ms" });
  const fill = (on: boolean) =>
    `block h-full w-full origin-top bg-gradient-to-b from-gold/70 to-gold/30 transition-transform duration-[700ms] ease-out motion-reduce:transition-none md:origin-left md:bg-gradient-to-r ${
      on ? "scale-100" : "scale-y-0 md:scale-x-0 md:scale-y-100"
    }`;

  return (
    <section id="process" className="identity identity-process relative overflow-clip">
      {/* Tall track = the scroll distance the section stays pinned for */}
      <div
        ref={trackRef}
        style={still ? undefined : { height: `${100 + n * SCREENS_PER_STEP * 100}vh` }}
      >
        <div
          className={`${still ? "py-20 lg:py-28" : "sticky top-0 flex h-screen items-center py-10"}`}
        >
          <div className="relative mx-auto w-full max-w-[1360px] px-6 lg:px-10">
            <Reveal>
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <SectionMark meta={sections.process} />
                  <h2 className="display-sm mt-5 max-w-xl text-content">
                    Three steps, <span className="gold-text italic">no surprises</span>
                  </h2>
                </div>
                <p className="max-w-sm text-[0.95rem] leading-relaxed text-mute">
                  The same sequence on every site, from a 60-guest garden dinner to a
                  1,200-seat marquee. Nothing starts before the previous step is signed.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid list-none grid-cols-1 md:mt-16 md:grid-cols-3">
              {process.map((p, i) => {
                const last = i === n - 1;
                const on = shown > i; // this step is visible
                const lineOn = shown > i + 1; // line to the next step is drawn
                const lead = i === 0 ? 0 : 600; // wait for the line to arrive first
                return (
                  <li
                    key={p.step}
                    className="relative pb-8 pl-[4.5rem] last:pb-0 md:pb-0 md:pl-0 md:pr-6"
                  >
                    {/* Station */}
                    <span
                      className={`card num absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center !rounded-full font-serif text-[1.1rem] text-gold transition-all duration-700 motion-reduce:transition-none ${
                        on ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                      style={d(on, lead)}
                      aria-hidden="true"
                    >
                      {p.step}
                    </span>

                    {/* Rail + gate to the next station */}
                    {!last && (
                      <div
                        className="absolute bottom-2 left-6 top-14 flex flex-col items-center md:bottom-auto md:left-[3.75rem] md:right-3 md:top-6 md:-translate-y-1/2 md:flex-row md:gap-3"
                        aria-hidden="true"
                      >
                        <span className="block w-px flex-1 overflow-hidden bg-line/15 md:h-px md:w-auto">
                          <span className={fill(lineOn)} style={d(lineOn, 0)} />
                        </span>
                        <span
                          className={`card hidden items-center gap-1.5 !rounded-full px-3 py-1 text-[0.75rem] text-mute transition-opacity duration-500 motion-reduce:transition-none md:flex ${
                            lineOn ? "opacity-100" : "opacity-0"
                          }`}
                          style={d(lineOn, 300)}
                        >
                          <Check />
                          Signed off
                        </span>
                        <span className="hidden h-px flex-1 overflow-hidden bg-line/15 md:block">
                          <span className={fill(lineOn)} style={d(lineOn, 300)} />
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div
                      className={`transition-all duration-700 motion-reduce:transition-none md:pt-20 ${
                        on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                      style={d(on, lead + 150)}
                    >
                      {/* ===== CARD DESIGN ===== */}
                      <div className="group relative rounded-[22px] md:border md:border-line/10 md:bg-surface/40 md:p-6 md:transition-all md:duration-500 md:hover:-translate-y-1 md:hover:border-gold/35 md:hover:bg-surface/70">
                        {/* ghost numeral */}
                        <span
                          aria-hidden="true"
                          className="num pointer-events-none absolute right-5 top-3 hidden select-none font-serif text-[4.5rem] leading-none text-gold/[0.07] transition-colors duration-500 group-hover:text-gold/[0.14] md:block"
                        >
                          {p.step}
                        </span>

                        <span className="sr-only">Step {i + 1}: </span>
                        <h3 className="relative font-serif text-[1.4rem] leading-snug text-content md:text-[1.55rem]">
                          {p.title}
                        </h3>
                        <p className="relative mt-2.5 max-w-[34ch] text-[0.95rem] leading-relaxed text-mute md:max-w-none">
                          {p.copy}
                        </p>
                        {!last && (
                          <p className="mt-4 flex items-center gap-1.5 text-[0.8rem] text-mute md:hidden">
                            <Check />
                            Signed off before step {i + 2} begins
                          </p>
                        )}
                      </div>
                      {/* ===== /CARD DESIGN ===== */}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}