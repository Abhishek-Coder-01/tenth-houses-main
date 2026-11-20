"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";
import { StarIcon, PinIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

/*
  Concept: the copy says "said quietly", so one voice is heard at a time.
  One large featured quote, with the other clients as a switcher beneath it.
  This gives clear hierarchy and removes the long stack of identical cards.

  [ Heading + site image ]   [ Large quote            ]
                             [ Name, role, place      ]
                             [ Client 1 | 2 | 3       ]
                             [ 48 structures · 48h · 1,200 guests ]
*/

const stats = [
  { value: "48", label: "structures built" },
  { value: "48h", label: "typical install" },
  { value: "1,200", label: "guests, at most" },
];

const AUTOPLAY_MS = 7000;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* Counts up once when scrolled into view. Shows the real value without JS. */
function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)([\d,]+)(.*)$/);
  const end = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  const hasComma = !!m && m[2].includes(",");
  const fmt = (n: number) => (hasComma ? n.toLocaleString("en-US") : String(n));
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null); // null = final value

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const run = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          const eased = k === 1 ? 1 : 1 - Math.pow(2, -10 * k); // easeOutExpo
          setShown(Math.round(end * eased));
          if (k < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <>{value}</>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {m[1]}
        {shown === null ? m[2] : fmt(shown)}
        {m[3]}
      </span>
    </span>
  );
}

export default function Clients() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = testimonials.length;

  const go = (next: number) => {
    const i = (next + count) % count;
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1);
    }
  };

  return (
    <section
      id="clients"
      className="identity identity-testimonials relative overflow-hidden py-24 lg:py-32"
    >
      <style>{`@keyframes tabprog{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left: heading + site */}
          <div>
            <Reveal>
              <SectionMark meta={sections.testimonials} />
              <h2 className="display-sm mt-5 text-content">
                Said quietly,
                <br />
                over <span className="gold-text italic">years</span>
              </h2>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mute">
                We ask for a note only once the last guest has left and the site is
                bare again. These are reproduced with permission.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div data-parallax="-22" className="edge relative mt-10 overflow-hidden rounded-[22px]">
                <Image
                  ref={imgRef}
                  src="/images/res-7.jpg"
                  alt="Contemporary open-air venue at golden hour"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="h-[260px] w-full object-cover will-change-transform sm:h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060a10]/15 via-transparent to-[#060a10]/85" />

                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 backdrop-blur">
                  <StarIcon className="h-3.5 w-3.5 text-[#f3dda9]" />
                  <span className="text-[0.8rem] text-white">4.9 from 210 reviews</span>
                </div>

                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[0.8rem] text-[#f3dda9]">Now building</div>
                    <div className="mt-0.5 font-serif text-[1.4rem] leading-tight text-white">
                      Newport Coast
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 pb-1 text-[0.8rem] text-white/85">
                    <PinIcon className="h-3.5 w-3.5" />
                    California
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: featured quote + switcher + facts */}
          <div className="flex flex-col">
            <Reveal>
              {/* Quotes share one grid cell so the box never jumps in height */}
              <div className="grid">
                {testimonials.map((t, i) => {
                  const on = i === active;
                  return (
                    <figure
                      key={t.name}
                      id={`quote-${i}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${i}`}
                      aria-hidden={!on}
                      className={`col-start-1 row-start-1 ${on ? "visible" : "invisible"}`}
                      style={{
                        transition: `visibility 0s linear ${on ? "0s" : "0.45s"}`,
                      }}
                    >
                      <blockquote className="font-serif text-[1.3rem] leading-[1.5] text-content sm:text-[1.55rem] lg:text-[1.75rem]">
                        <span aria-hidden="true" className="text-gold">
                          “
                        </span>
                        {t.quote.split(" ").map((w, wi) => (
                          <span
                            key={wi}
                            className="inline-block motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![filter:none] motion-reduce:!transition-none"
                            style={{
                              opacity: on ? 1 : 0,
                              transform: on ? "none" : "translateY(0.5em)",
                              filter: on ? "blur(0)" : "blur(6px)",
                              transition: on
                                ? `opacity 700ms ${EASE} ${120 + Math.min(wi, 40) * 30}ms, transform 800ms ${EASE} ${120 + Math.min(wi, 40) * 30}ms, filter 700ms ${EASE} ${120 + Math.min(wi, 40) * 30}ms`
                                : "opacity 300ms ease, transform 300ms ease, filter 300ms ease",
                            }}
                          >
                            {w}&nbsp;
                          </span>
                        ))}
                        <span aria-hidden="true" className="text-gold">
                          ”
                        </span>
                      </blockquote>
                      <figcaption
                        className="mt-7 flex items-center gap-4 motion-reduce:!transform-none motion-reduce:!opacity-100"
                        style={{
                          opacity: on ? 1 : 0,
                          transform: on ? "none" : "translateY(10px)",
                          transition: on
                            ? `opacity 700ms ${EASE} 450ms, transform 700ms ${EASE} 450ms`
                            : "opacity 250ms ease, transform 250ms ease",
                        }}
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-base text-white"
                          style={{
                            backgroundImage:
                              "linear-gradient(130deg, #243b53 0%, #101a2b 52%, #b58a3a 100%)",
                          }}
                          aria-hidden="true"
                        >
                          {t.name.charAt(0)}
                        </span>
                        <span>
                          <span className="block text-[1rem] font-medium text-content">
                            {t.name}
                          </span>
                          <span className="block text-[0.85rem] text-mute">
                            {t.role}, {t.place}
                          </span>
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </Reveal>

            {/* Switcher */}
            <Reveal delay={100}>
              <div
                role="tablist"
                aria-label="Client notes"
                onKeyDown={onKeyDown}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                {testimonials.map((t, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={t.name}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      id={`tab-${i}`}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      aria-controls={`quote-${i}`}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActive(i)}
                      className={`group relative flex-1 overflow-hidden rounded-[14px] border px-4 py-3 text-left transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b36a] ${
                        on
                          ? "border-gold/50 bg-gold/[0.07]"
                          : "border-line/15 hover:border-line/30"
                      }`}
                    >
                      <span
                        className={`block text-[0.92rem] font-medium ${
                          on ? "text-content" : "text-mute group-hover:text-content"
                        }`}
                      >
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-[0.8rem] text-mute">
                        {t.place}
                      </span>

                      {/* Autoplay progress: fills over AUTOPLAY_MS, then moves on */}
                      {on && (
                        <span
                          key={`bar-${active}`}
                          aria-hidden="true"
                          onAnimationEnd={() => setActive((a) => (a + 1) % count)}
                          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold motion-reduce:hidden"
                          style={{
                            animation: `tabprog ${AUTOPLAY_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Facts */}
            <Reveal delay={180}>
              <dl className="mt-10 grid grid-cols-3 border-t border-line/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse pr-3">
                    <dt className="mt-2 text-[0.82rem] text-mute">{s.label}</dt>
                    <dd className="num font-serif text-[1.7rem] leading-none text-content sm:text-[2rem]">
                      <CountUp value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
