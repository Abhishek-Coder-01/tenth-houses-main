"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { amenities } from "@/lib/data";
import Reveal from "./Reveal";
import { ServiceIcon, ArrowIcon, ShieldIcon, CheckIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";
import "./services.css";

const visits = ["Daylight", "Dusk", "Unannounced"];

/* cursor spotlight */
const track = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Services({ mark = true }: { mark?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = amenities.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>(".stk-item"));
    const banner = el.querySelector<HTMLElement>(".svc-banner");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1) card pehli baar screen par aaye to fade-up */
    let io: IntersectionObserver | null = null;
    if (reduce) {
      items.forEach((it) => it.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io?.unobserve(en.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      items.forEach((it) => io!.observe(it));
    }

    /* 2) scroll-linked: stack depth + active counter + banner parallax */
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      let current = 0;
      items.forEach((it, i) => {
        const stickyTop = parseFloat(getComputedStyle(it).top) || 0;
        const top = it.getBoundingClientRect().top;
        if (top <= vh * 0.55) current = i;

        // jaise agla card is card par aata hai, ye piche jaakar chhota + dark hota hai
        const next = items[i + 1];
        if (next && !reduce) {
          const dist = next.getBoundingClientRect().top - stickyTop;
          const p = clamp(1 - dist / it.offsetHeight);
          it.style.setProperty("--s", (1 - p * 0.07).toFixed(4));
          it.style.setProperty("--b", (1 - p * 0.5).toFixed(4));
        }
      });
      setActive(current);

      if (banner) {
        const b = banner.getBoundingClientRect();
        banner.style.setProperty("--p", clamp((vh - b.top) / (vh + b.height)).toFixed(4));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="identity identity-services svc-section relative py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* ===== LEFT: sticky heading + live counter ===== */}
          <div className="stk-left self-start lg:sticky lg:top-28">
            <Reveal>
              <div>
                {mark && <SectionMark meta={sections.services} />}
                <h2 className={`display-sm text-content ${mark ? "mt-4" : "mt-0"}`}>
                  A single desk, from first <span className="gold-text italic">question</span>{" "}
                  to final key
                </h2>
                <p className="mt-5 max-w-md text-[0.96rem] leading-relaxed text-mute">
                  Six disciplines, one point of contact. Nothing is subcontracted to anyone you
                  have not met.
                </p>
              </div>
            </Reveal>

            {/* live scroll index (sirf desktop) */}
            <div className="stk-index mt-10 hidden lg:block" aria-hidden="true">
              <div className="stk-count">
                <span className="num stk-count__now" key={active}>
                  {pad(active + 1)}
                </span>
                <span className="stk-count__all">/ {pad(total)}</span>
              </div>
              <div className="stk-track">
                <span
                  className="stk-track__fill"
                  style={{ transform: `scaleY(${(active + 1) / total})` }}
                />
                <ul>
                  {amenities.map((a, i) => (
                    <li key={a.title} className={i === active ? "is-on" : i < active ? "is-done" : ""}>
                      <span className="stk-dot" />
                      {a.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: stacking cards ===== */}
          <div className="stk-stack">
            {amenities.map((a, i) => (
              <div
                key={a.title}
                className="stk-item"
                style={{ "--i": i, "--s": 1, "--b": 1 } as CSSProperties}
              >
                <div className="stk-scale">
                  <article onMouseMove={track} className="stk-card group">
                    <span className="stk-glow" aria-hidden="true" />
                    <span className="stk-spot" aria-hidden="true" />
                    <span className="stk-edge" aria-hidden="true" />
                    <span className="stk-num num" aria-hidden="true">
                      {pad(i + 1)}
                    </span>

                    <div className="stk-body">
                      <div className="stk-top">
                        <span className="stk-icon">
                          <ServiceIcon name={a.icon} className="h-[28px] w-[28px]" />
                        </span>
                        <span className="stk-step">Step {pad(i + 1)}</span>
                      </div>

                      <h3 className="stk-title">{a.title}</h3>
                      <p className="stk-copy">{a.copy}</p>

                      <div className="stk-foot">
                        <span className="stk-badge">
                          <span className="stk-tick">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          Included
                        </span>
                        <span className="stk-more">
                          Details
                          <ArrowIcon className="stk-arrow h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== banner with parallax ===== */}
        <Reveal delay={100}>
          <div className="svc-banner group relative mt-16 overflow-hidden rounded-[26px] edge">
            <div className="svc-parallax absolute inset-0">
              <Image
                src="/images/pool.jpg"
                alt="Poolside terrace of a private residence at dusk"
                width={2048}
                height={1366}
                sizes="(max-width: 1400px) 100vw, 1360px"
                className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(92deg, rgba(6,11,17,0.95) 0%, rgba(8,22,30,0.86) 42%, rgba(19,74,80,0.55) 76%, rgba(122,80,30,0.36) 100%)",
              }}
            />
            <div className="relative flex h-[360px] flex-col justify-center px-7 sm:h-[370px] sm:px-12 lg:px-16">
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