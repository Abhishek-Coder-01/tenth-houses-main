"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { stats } from "@/lib/data";
import Reveal from "./Reveal";
import { Counter } from "./Marquee";
import { TentIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const refusals = ["No catalogue.", "No stock tents.", "No poles where you did not ask for them."];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

export default function House({ mark = true }: { mark?: boolean }) {
  const [listRef, listOn] = useInView<HTMLUListElement>(0.4);
  const reduceMotion = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const visualProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.6,
  });
  const imageY = useTransform(visualProgress, [0, 1], [-12, 12]);
  const imageScale = useTransform(visualProgress, [0, 1], [1.05, 1.0]);
  const quoteY = useTransform(visualProgress, [0, 1], [12, -8]);

  return (
    <section
      id="house"
      className="identity identity-about house-section relative overflow-hidden py-20 lg:py-28"
    >
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[480px] w-[480px] rounded-full opacity-25 blur-[120px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(36,59,83,0.18) 0%, transparent 72%)",
        }}
      />

      <div className="mx-auto grid max-w-[1240px] items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Image + quote column */}
        <Reveal>
          <div className="relative lg:pb-8">
            {/* Image wrapper */}
            <div
              ref={visualRef}
              className="about-media edge relative overflow-hidden rounded-2xl shadow-[var(--shadow-lift)] motion-reduce:![clip-path:none] motion-reduce:!transition-none"
              data-parallax="-20"
            >
              <motion.div
                style={{
                  y: reduceMotion ? 0 : imageY,
                  scale: reduceMotion ? 1 : imageScale,
                }}
                className="relative h-[320px] w-full will-change-transform sm:h-[420px] lg:h-[520px]"
              >
                <Image
                  src="/images/about.jpg"
                  alt="A private pavilion raised by Tenth House"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#060a10]/20 via-transparent to-[#060a10]/30" />

              {/* Founded badge */}
              <span
                className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-sm motion-reduce:!opacity-100 motion-reduce:!transition-none"
                style={{
                  opacity: listOn ? 1 : 0,
                  transform: listOn ? "none" : "translateY(-6px)",
                  transition: `opacity 600ms ease 700ms, transform 600ms ${EASE} 700ms`,
                }}
              >
                <TentIcon className="h-3.5 w-3.5" />
                Founded 2009
              </span>
            </div>

            {/* Quote card — in flow on mobile, overlaps image on sm+ */}
            <motion.figure
              data-parallax="10"
              style={{ y: reduceMotion ? 0 : quoteY }}
              className="about-quote card edge relative z-10 will-change-transform -mt-10 ml-auto mr-3 w-[calc(100%-1.5rem)] max-w-[340px] !rounded-xl p-5 shadow-[var(--shadow-lift)] sm:absolute sm:-bottom-4 sm:-right-4 sm:mr-0 sm:mt-0 sm:w-[72%] sm:p-6 lg:-bottom-2"
            >
              <blockquote className="font-serif text-base leading-snug text-content sm:text-lg">
                “A tent is only half the work. The other half is knowing where to raise
                it.”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5 text-sm text-mute">
                <span className="h-px w-5 bg-gold/70" aria-hidden="true" />
                <span>
                  <span className="text-content">Ishaan Mehra</span>, Principal
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </Reveal>

        {/* Copy column */}
        <div className="lg:pt-2">
          <Reveal delay={80}>
            {mark && <SectionMark meta={sections.about} />}
            <h2 className={`display-sm text-content ${mark ? "mt-4" : "mt-0"}`}>
              We do not rent tents.
              <br />
              We place <span className="gold-text italic">evenings</span>.
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-[60ch] text-[0.95rem] leading-relaxed text-mute">
              Tenth House began as a favour between two riggers, one in Copenhagen and
              one in Kyoto, who kept being asked to raise a tent for a wedding nobody
              else would take on. Seventeen years later we build a small, deliberate
              register of structures a year, and we still answer that same question
              first.
            </p>
          </Reveal>

          {/* The one memorable element — refusals */}
          <Reveal delay={180}>
            <ul ref={listRef} className="relative mt-7 space-y-2 pl-5">
              {/* Gold rule draws downward */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top bg-gold/50 motion-reduce:!scale-y-100 motion-reduce:!transition-none"
                style={{
                  transform: listOn ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 1000ms ${EASE}`,
                }}
              />
              {refusals.map((r, i) => (
                <li
                  key={r}
                  className="font-serif text-xl leading-snug text-content sm:text-[1.35rem] motion-reduce:!translate-x-0 motion-reduce:!opacity-100 motion-reduce:!transition-none"
                  style={{
                    opacity: listOn ? 1 : 0,
                    transform: listOn ? "none" : "translateX(-12px)",
                    transition: `opacity 700ms ${EASE} ${250 + i * 220}ms, transform 800ms ${EASE} ${250 + i * 220}ms`,
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-7 max-w-[60ch] text-[0.95rem] leading-relaxed text-mute">
              A host is introduced to a structure the way a collector is introduced to
              a painting: with the full dossier, the drawings, and as much time as it
              takes.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={260}>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="about-stat relative flex flex-col-reverse pl-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-full w-px"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, var(--sec-accent), transparent)",
                    }}
                  />
                  <dt className="mt-1.5 text-xs leading-snug text-mute">{s.label}</dt>
                  <dd className="font-serif text-2xl leading-none text-content">
                    <Counter value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/services/" className="btn btn-gold">
                How we work
              </Link>
              <Link href="/#clients" className="btn btn-ghost">
                Read client notes
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
