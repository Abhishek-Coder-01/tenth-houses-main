"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";
import Reveal from "./Reveal";
import { Counter } from "./Marquee";
import { TentIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

/*
  Concept: the page says "we place evenings, we do not rent tents", so the
  three refusals ("No catalogue. No stock tents. No poles...") become the
  one memorable element, set large. Everything else stays quiet.

  Desktop                         Mobile
  [ image  ] [ heading      ]     [ image        ]
  [  quote ] [ story        ]     [ quote card   ]  (in flow, no overlap)
             [ 3 refusals   ]     [ heading ... ]
             [ stats        ]
             [ buttons      ]
*/

const refusals = ["No catalogue.", "No stock tents.", "No poles where you did not ask for them."];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* Tracks visibility once so the reveal stays calm when the section is revisited. */
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
  const [listRef, listOn] = useInView<HTMLUListElement>(0.5);

  return (
    <section
      id="house"
      className="identity identity-about relative overflow-hidden py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(36,59,83,0.22) 0%, transparent 72%)",
        }}
      />

      <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-10">
        {/* Image + quote */}
        <Reveal>
          <div className="relative lg:pb-10">
            <div
              className="edge relative overflow-hidden rounded-[26px] shadow-[var(--shadow-lift)] motion-reduce:![clip-path:none] motion-reduce:!transition-none"
              data-parallax="-26"
            >
              <Image
                src="/images/about.jpg"
                alt="A private pavilion raised by Tenth House"
                width={2000}
                height={1333}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-[360px] w-full object-cover will-change-transform sm:h-[480px] lg:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#060a10]/30 via-transparent to-[#060a10]/40" />
              <span
                className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[0.82rem] text-white backdrop-blur motion-reduce:!opacity-100 motion-reduce:!transition-none"
                style={{
                  opacity: listOn ? 1 : 0,
                  transform: listOn ? "none" : "translateY(-8px)",
                  transition: `opacity 700ms ease 900ms, transform 700ms ${EASE} 900ms`,
                }}
              >
                <TentIcon className="h-3.5 w-3.5" />
                Founded 2009
              </span>
            </div>

            {/* Quote: sits in the flow on mobile, overlaps the image from sm up */}
            <figure data-parallax="14" className="card edge relative z-10 will-change-transform -mt-12 ml-auto mr-3 w-[calc(100%-1.5rem)] max-w-[360px] !rounded-[20px] p-5 shadow-[var(--shadow-lift)] sm:absolute sm:-bottom-2 sm:-right-6 sm:mr-0 sm:mt-0 sm:w-[78%] sm:p-6 lg:-bottom-0">
              <blockquote className="font-serif text-[1.1rem] leading-snug text-content sm:text-[1.15rem]">
                “A tent is only half the work. The other half is knowing where to raise
                it.”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-[0.85rem] text-mute">
                <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
                <span>
                  <span className="text-content">Ishaan Mehra</span>, Principal
                </span>
              </figcaption>
            </figure>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal delay={80}>
            {mark && <SectionMark meta={sections.about} />}
            <h2 className={`display-sm text-content ${mark ? "mt-5" : "mt-0"}`}>
              We do not rent tents.
              <br />
              We place <span className="gold-text italic">evenings</span>.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-[62ch] text-[1rem] leading-[1.75] text-mute">
              Tenth House began as a favour between two riggers, one in Copenhagen and
              one in Kyoto, who kept being asked to raise a tent for a wedding nobody
              else would take on. Seventeen years later we build a small, deliberate
              register of structures a year, and we still answer that same question
              first.
            </p>

            {/* The one memorable element */}
            <ul ref={listRef} className="relative mt-8 space-y-1.5 pl-5">
              {/* gold rule draws downward */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top bg-gold/60 motion-reduce:!scale-y-100 motion-reduce:!transition-none"
                style={{
                  transform: listOn ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 1200ms ${EASE}`,
                }}
              />
              {refusals.map((r, i) => (
                <li
                  key={r}
                  className="font-serif text-[1.3rem] leading-snug text-content sm:text-[1.5rem] motion-reduce:!translate-x-0 motion-reduce:!opacity-100 motion-reduce:!transition-none"
                  style={{
                    opacity: listOn ? 1 : 0,
                    transform: listOn ? "none" : "translateX(-18px)",
                    transition: `opacity 800ms ${EASE} ${300 + i * 260}ms, transform 900ms ${EASE} ${300 + i * 260}ms`,
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[62ch] text-[1rem] leading-[1.75] text-mute">
              A host is introduced to a structure the way a collector is introduced to
              a painting: with the full dossier, the drawings, and as much time as it
              takes.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="relative flex flex-col-reverse pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-full w-px"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, var(--sec-accent), transparent)",
                    }}
                  />
                  <dt className="mt-2 text-[0.85rem] leading-snug text-mute">{s.label}</dt>
                  <dd className="font-serif text-[2rem] leading-none text-content">
                    <Counter value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
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
