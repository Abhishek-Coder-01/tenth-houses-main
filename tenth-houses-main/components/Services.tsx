"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import { amenities } from "@/lib/data";
import Reveal from "./Reveal";
import { ServiceIcon, crestTiles, ArrowIcon, ShieldIcon, CheckIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const visits = ["Daylight", "Dusk", "Unannounced"];

/* cursor-following spotlight: stores the pointer position as CSS variables */
const track = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Services({ mark = true }: { mark?: boolean }) {
  return (
    <section id="services" className="identity identity-services relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            {mark && <SectionMark meta={sections.services} />}
            <h2 className={`display-sm text-content ${mark ? "mt-4" : "mt-0"}`}>
              A single desk, from first <span className="gold-text italic">question</span> to
              final key
            </h2>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-mute">
              Six disciplines, one point of contact. Nothing is subcontracted to anyone you
              have not met.
            </p>
          </div>
        </Reveal>

        <div className="service-deck mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => (
            <div key={a.title} className="service-layer" style={{ "--card-index": i } as CSSProperties}>
              <div
                onMouseMove={track}
                className="service-card card card-hover group relative h-full overflow-hidden !rounded-[24px] p-7 lg:p-8"
              >
                <span className="service-card__shade" aria-hidden="true" />

                {/* cursor spotlight (gold only) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgb(var(--c-gold) / 0.14), transparent 65%)",
                  }}
                />
                {/* gold edge that draws across the top on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                {/* ghost numeral */}
                <span
                  aria-hidden="true"
                  className="num pointer-events-none absolute -right-1 -top-3 select-none font-serif text-[6.5rem] leading-none text-gold/[0.06] transition-all duration-700 group-hover:-translate-y-1 group-hover:text-gold/[0.13] motion-reduce:transition-none"
                >
                  0{i + 1}
                </span>

                <div className="service-card__body relative flex h-full flex-col">
                  <span
                    className={`tile ${crestTiles[a.icon] ?? "tile-gold"} !h-14 !w-14 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none`}
                    style={{ transitionTimingFunction: EASE }}
                  >
                    <ServiceIcon name={a.icon} className="h-[26px] w-[26px]" />
                  </span>

                  <h3 className="mt-7 font-serif text-[1.45rem] leading-snug text-content">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-mute">{a.copy}</p>

                  {/* footer: always visible (works on touch), arrow nudges on hover */}
                  <div className="mt-auto flex items-center justify-between border-t border-line/10 pt-5 text-[0.8rem]">
                    <span className="inline-flex items-center gap-2 text-mute transition-colors duration-300 group-hover:text-content">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      Included
                    </span>
                    <ArrowIcon className="h-3.5 w-3.5 text-mute/50 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-gold motion-reduce:transition-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* wide banner */}
        <Reveal delay={100}>
          <div className="group relative mt-6 overflow-hidden rounded-[26px] edge">
            <Image
              src="/images/pool.jpg"
              alt="Poolside terrace of a private residence at dusk"
              width={2048}
              height={1366}
              sizes="(max-width: 1400px) 100vw, 1360px"
              className="h-[360px] w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none sm:h-[370px]"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(92deg, rgba(6,11,17,0.95) 0%, rgba(8,22,30,0.86) 42%, rgba(19,74,80,0.55) 76%, rgba(122,80,30,0.36) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center px-7 sm:px-12 lg:px-16">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.52rem] uppercase tracking-[0.2em] text-[#f6e7c6] backdrop-blur">
                  <ShieldIcon className="h-3.5 w-3.5" />
                  The Standard
                </span>
                <h3 className="mt-4 font-serif text-[1.85rem] leading-tight text-white sm:text-[2.35rem]">
                  Every house is visited three times before it is offered.
                </h3>
                <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-white/75">
                  Once in daylight. Once at dusk. Once without the owner present. We only
                  represent what still holds up when nobody is performing for us.
                </p>

                {/* the three visits */}
                <ol className="mt-6 flex flex-wrap gap-2.5">
                  {visits.map((v, i) => (
                    <li
                      key={v}
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-3.5 text-[0.8rem] text-white/90 backdrop-blur transition-colors duration-300 hover:border-[#f6e7c6]/50 hover:bg-white/15"
                    >
                      <span className="num flex h-6 w-6 items-center justify-center rounded-full bg-[#f6e7c6] text-[0.72rem] font-semibold text-[#1a1208]">
                        {i + 1}
                      </span>
                      {v}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}