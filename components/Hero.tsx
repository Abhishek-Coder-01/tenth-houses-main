"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon, TentIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const SLIDE_MS = 7000;

const slides = [
  { src: "/images/hero.jpg", alt: "A lantern-lit marquee in a private garden", label: "The garden marquee", place: "Alibag, private estate" },
  { src: "/images/cta.jpg", alt: "An illuminated poolside residence at night", label: "The pool house", place: "Lonavala, villa lawn" },
  { src: "/images/about.jpg", alt: "A considered interior with floor-to-ceiling windows", label: "The private pavilion", place: "Pune, farmhouse grounds" },
];

const stats = [
  { value: 1900, suffix: "", label: "events built" },
  { value: 48, suffix: "", label: "structures" },
  { value: 26, suffix: "", label: "cities" },
];

/* Counts up once, then stays put. Respects reduced motion. */
function useCountUp(target: number, start: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div>
      <div className="num font-serif text-[1.7rem] leading-none text-white sm:text-[2rem]">
        {n.toLocaleString("en-US")}
        {suffix}
      </div>
      <div className="kicker mt-2 text-[0.5rem] text-white/60">{label}</div>
    </div>
  );
}

function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m9 6 9 6-9 6V6Z" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % slides.length) + slides.length) % slides.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* Automatic rotation, controlled by the play/pause button. */
  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [next, playing, reduced]);

  /* Keyboard arrows while the hero is on screen */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const upcoming = [1, 2].map((o) => (index + o) % slides.length);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured venues"
      className="hero-scene grain relative min-h-[100svh] w-full overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes heroRise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroMask { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes heroDrift { 0%,100% { transform: translateY(0); opacity: .9; } 50% { transform: translateY(10px); opacity: .4; } }
        .hero-rise { opacity: 0; animation: heroRise 900ms cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-line { animation: heroMask 1100ms cubic-bezier(.7,0,.2,1) both; }
        .hero-caption { animation: heroRise 700ms cubic-bezier(.2,.7,.2,1) both; }
        .hero-glass { background: linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.04)); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 24px 60px -24px rgba(0,0,0,.7); }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-line, .hero-caption { animation: none; opacity: 1; clip-path: none; transform: none; }
        }
      `}</style>

      {/* Image stage: cross-fade + slow zoom */}
      <div className="hero-media absolute inset-0" aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity duration-[1800ms] ease-out"
              style={{ opacity: active ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={85}
                className="object-cover"
                style={{
                  transform: reduced ? "scale(1)" : active ? "scale(1.08)" : "scale(1)",
                  transformOrigin: i % 2 === 0 ? "30% 60%" : "70% 40%",
                  transition: `transform ${active ? SLIDE_MS + 2500 : 0}ms linear`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Legibility layers */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,15,0.9)_0%,rgba(5,12,19,0.7)_34%,rgba(5,12,19,0.16)_72%,rgba(5,12,19,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,8,13,0.88)_0%,transparent_38%,rgba(3,8,13,0.3)_100%)]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(var(--c-gold)/0.16),transparent_65%)] blur-2xl" />

      <div className="hero-content relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-28 pt-36 sm:px-8 sm:pb-32 lg:px-12 lg:pb-28">
        <div className="max-w-[720px]">
          <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "100ms" }}>
            <SectionMark meta={sections.home} invert />
            <span className="pill-label border-white/25 bg-black/25 text-goldsoft backdrop-blur-md">Private tented architecture</span>
          </div>

          <h1 className="display mt-7 text-white">
            <span className="hero-line block" style={{ animationDelay: "250ms" }}>
              Make room for
            </span>
            <span className="hero-line block" style={{ animationDelay: "450ms" }}>
              <span className="gold-text italic">the remarkable.</span>
            </span>
          </h1>

          <p className="hero-rise mt-7 max-w-[500px] text-[1rem] leading-relaxed text-white/75 sm:text-[1.08rem]" style={{ animationDelay: "700ms" }}>
            Singular marquees, pavilions and open-air venues for evenings that deserve more than an ordinary setting.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-3.5" style={{ animationDelay: "850ms" }}>
            <Link href="#residences" className="btn btn-gold group">
              Explore the collection
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="btn border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--c-gold))]"
            >
              Check your date
            </Link>
          </div>

          <div className="hero-rise mt-12 flex flex-wrap items-end gap-8 border-t border-white/20 pt-5 sm:gap-12" style={{ animationDelay: "1000ms" }}>
            {stats.map((s) => (
              <Stat key={s.label} {...s} start={ready} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar: caption + progress controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/12 bg-gradient-to-t from-black/60 to-transparent">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-6 py-4 sm:px-8 lg:px-12">
          <div key={index} className="hero-caption flex min-w-0 items-center gap-2.5 text-white/80">
            <TentIcon className="h-3.5 w-3.5 shrink-0 text-goldsoft" />
            <span className="kicker truncate text-[0.52rem]">{slides[index].label}</span>
            <span className="hidden truncate text-[0.72rem] text-white/50 sm:inline">{slides[index].place}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {slides.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show ${slide.label}`}
                    onClick={() => setIndex(i)}
                    className="group relative h-6 w-10 sm:w-14"
                  >
                    <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition group-hover:bg-white/45">
                      {active && (
                        <span className="absolute inset-0 rounded-full bg-[rgb(var(--c-gold))]" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="num hidden text-[0.62rem] tracking-[0.2em] text-white/65 sm:inline">
              0{index + 1} / 0{slides.length}
            </span>
            <div className="ml-1 flex items-center gap-1.5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--c-gold))]"
              >
                <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={!playing}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--c-gold))]"
              >
                {playing ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md transition hover:border-gold/70 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--c-gold))]"
              >
                <ArrowIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="kicker text-[0.48rem] text-white/55">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/80 to-transparent" style={reduced ? undefined : { animation: "heroDrift 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
