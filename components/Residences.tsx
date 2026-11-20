"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { properties } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowIcon, PinIcon, SparkIcon } from "./icons";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const filters = ["All", "Marquees", "Pavilions", "Glamping", "Venues"] as const;

export default function Residences({ mark = true }: { mark?: boolean }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const list =
    active === "All" ? properties : properties.filter((p) => p.category === active);

  // Pinned horizontal storytelling works on every pointer/device. Reduced
  // motion keeps the rail native and fully scrollable.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // kitna horizontal travel karna hai (cards ki total width - screen)
  useEffect(() => {
    if (!pinned || !trackRef.current) return;
    const measure = () => {
      const el = trackRef.current!;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, list.length]);

  // scroll progress -> smooth spring -> horizontal x
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 38, damping: 32, mass: 1.1, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section id="residences" className="relative">
      {/* outer = scroll length. Isse hi pin hone ka time milta hai */}
      <div
        ref={outerRef}
        style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
        className="relative"
      >
        <div
          className={
            pinned
              ? "sticky top-0 flex h-[100svh] flex-col justify-start overflow-hidden px-0 py-6 sm:justify-center sm:py-10"
              : "py-20"
          }
        >
          {/* Header */}
          <div className="mx-auto w-full max-w-[1360px] px-6 lg:px-10">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                  {mark && <SectionMark meta={sections.structures} />}
                  <h2 className={`display-sm text-content ${mark ? "mt-4" : "mt-0"}`}>
                    Signature <span className="gold-text italic">Structures</span>
                  </h2>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
                    A rotating selection of six — a fraction of what we represent.
                    The remainder never leaves the dossier.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button
                      key={f}
                      aria-pressed={active === f}
                      onClick={() => setActive(f)}
                      className={`chip ${active === f ? "chip-on" : ""}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Track */}
          <div
            className={
              pinned
                ? "mt-4 w-full sm:mt-8 lg:mt-10"
                : "mt-8 w-full overflow-x-auto snap-x snap-mandatory px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            <motion.div
              ref={trackRef}
              style={pinned ? { x } : undefined}
              className={`flex gap-4 will-change-transform sm:gap-6 ${pinned ? "pl-6 pr-6 sm:pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] sm:pr-24" : ""
                }`}
            >
              {list.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 34, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.8, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-[min(420px,52svh)] w-[82vw] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#30363d] bg-[#161b22] shadow-[0_30px_80px_-30px_rgba(1,4,9,0.82)] sm:h-[500px] sm:w-[440px] lg:h-[540px] lg:w-[500px]"
                >
                  {/* full background image */}
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 82vw, 500px"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
                  />

                  {/* gradient: neeche dark taaki text readable ho */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(6,10,16,0.35) 0%, rgba(6,10,16,0) 30%, rgba(6,10,16,0.55) 60%, rgba(6,10,16,0.96) 100%)",
                    }}
                  />

                  {/* top row */}
                  <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
                    <span className="badge">{p.status}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white/90 backdrop-blur-md">
                      <PinIcon className="h-4 w-4" />
                    </span>
                  </div>

                  {/* bottom content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    {/* number pill (screenshot jaisa) */}
                    <span className="inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-full bg-gradient-to-r from-[#c9a24a] to-[#f3dda9] px-3 text-[0.78rem] font-bold text-[#1a1306] shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <h3 className="font-serif text-[2rem] font-bold leading-[1.05] tracking-tight text-white">
                        {p.name}
                      </h3>
                      <div className="num shrink-0 pb-1 font-serif text-[1.05rem] text-[#f3dda9]">
                        {p.price}
                      </div>
                    </div>

                    <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/60">
                      {p.category} · {p.location}
                    </p>

                    <p className="mt-3 line-clamp-2 text-[0.92rem] leading-[1.6] text-white/80">
                      {p.blurb}
                    </p>

                    {/* hover pe khulta hai: specs + link */}
                    <div className="structure-specs grid grid-rows-[0fr] opacity-0 transition-opacity duration-500 ease-out group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                          <div className="num flex items-center gap-2.5 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-white/75">
                            <span>{p.beds} bd</span>
                            <span className="h-3 w-px bg-white/25" />
                            <span>{p.baths} ba</span>
                            <span className="h-3 w-px bg-white/25" />
                            <span>{p.area}</span>
                          </div>
                          <Link
                            href="/contact/"
                            className="group/link flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#f3dda9]"
                          >
                            View details
                            <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* last CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 34, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="card flex h-[min(420px,52svh)] w-[82vw] shrink-0 snap-center flex-col items-center justify-center gap-5 !rounded-[24px] px-8 text-center sm:h-[500px] sm:w-[380px] lg:h-[520px]"
              >
                <SparkIcon className="h-6 w-6 text-gold" />
                <p className="font-serif text-2xl text-content">
                  Thirty-four further residences
                </p>
                <p className="text-[0.85rem] text-mute">Available by private dossier only.</p>
                <Link href="/contact/" className="btn btn-ghost">
                  Request the full portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* progress bar (sirf desktop) */}
          {pinned && (
            <div className="mx-auto mt-8 w-full max-w-[1360px] px-6 lg:px-10">
              <div className="h-px w-full bg-white/10">
                <motion.div
                  style={{ scaleX: barScale }}
                  className="h-full origin-left bg-gradient-to-r from-[#c9a24a] to-[#f3dda9]"
                />
              </div>
              <div className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.2em] text-mute">
                Scroll to explore ↗
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
