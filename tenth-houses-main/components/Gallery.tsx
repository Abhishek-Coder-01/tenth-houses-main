"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionMark from "./SectionMark";
import { sections } from "@/lib/sections";

const works = [
  { src: "/images/res-1.jpg", title: "Royal Shaadi Tent", place: "Jaipur" },
  { src: "/images/res-2.jpg", title: "Mughal Mandap", place: "Delhi" },
  { src: "/images/res-3.jpg", title: "Garden Baraat", place: "Mumbai" },
  { src: "/images/pool.jpg", title: "Poolside pavilion", place: "Lonavala" },
  { src: "/images/res-4.jpg", title: "Glamping suite", place: "Udaipur" },
  { src: "/images/about.jpg", title: "Private pavilion", place: "Pune" },
  { src: "/images/res-5.jpg", title: "Farmhouse tent", place: "Pune" },
  { src: "/images/cta.jpg", title: "Night residence", place: "Alibag" },
  { src: "/images/res-6.jpg", title: "Palace lawn", place: "Hyderabad" },
];

/*
  Tile sizes are fixed per position so every row closes cleanly (no gaps).
  Desktop = 4 columns. Mobile = 2 columns.

  Full (9):                     Compact (6):
  [ 1  1 ][ 2 ][ 3 ]            [ 1  1 ][ 2 ][ 3 ]
  [ 1  1 ][  4   ]              [ 1  1 ][  4   ]
  [ 5 ][ 6 ][ 7 ][ 8 ]          [   5   ][   6   ]
  [ 5 ][      9      ]
*/
const spansFull = [
  "col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:row-span-2",
  "",
  "",
  "",
  "lg:col-span-3",
];
const spansCompact = [
  "col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
  "col-span-2 lg:col-span-2",
];

const pad = (n: number) => String(n).padStart(2, "0");

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// easeOutQuint: fast launch from the pile, very soft landing
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
// deterministic "random" so server / client never mismatch
const seed = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function Gallery({
  compact = false,
  mark = true,
}: {
  compact?: boolean;
  mark?: boolean;
}) {
  const list = compact ? works.slice(0, 6) : works;
  const spans = compact ? spansCompact : spansFull;
  const total = list.length;

  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const tileRefs = useRef<(HTMLLIElement | null)[]>([]);

  const openAt = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) => (cur === null ? cur : (cur + dir + total) % total)),
    [total]
  );

  // Keyboard, scroll lock, focus handling while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps


  // Scroll-driven "pile -> fan-out" reveal.
  // Tiles start stacked and spread into the grid. Keep the easing responsive
  // so the animation follows scroll without building a visible lag.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = tileRefs.current.slice(0, total).filter(Boolean) as HTMLLIElement[];
    const n = tiles.length;
    const STAGGER = 0.5; // share of the timeline used to offset tiles
    let raf = 0;
    let smooth = -1; // smoothed progress (-1 = not initialised)
    let vh = window.innerHeight;
    let vw = window.innerWidth;
    // slot centre of each tile, relative to the grid (unaffected by transforms)
    let slots: { x: number; y: number }[] = [];

    const measure = () => {
      vh = window.innerHeight;
      vw = window.innerWidth;
      slots = tiles.map((t) => ({
        x: t.offsetLeft + t.offsetWidth / 2,
        y: t.offsetTop + t.offsetHeight / 2,
      }));
    };

    const target = () => {
      const top = grid.getBoundingClientRect().top;
      const start = vh * 0.98; // grid top enters the viewport
      const end = vh * 0.1; // fully spread
      return clamp((start - top) / (start - end));
    };

    const render = (p: number) => {
      const gridRect = grid.getBoundingClientRect();
      const gridTop = gridRect.top;
      const gridW = grid.clientWidth;
      const gridLeft = gridRect.left;
      const pileX = vw / 2 - gridLeft; // pile centred on screen
      const pileY = vh * 1.0 - gridTop + 10; // just under the bottom edge
      tiles.forEach((el, i) => {
        // each tile gets its own slice of the progress -> peeling stagger
        const d = (i / Math.max(1, n - 1)) * STAGGER;
        const lp = easeOut(clamp((p - d) / (1 - STAGGER)));
        const k = 1 - lp;
        const slot = slots[i];
        const jx = (seed(i, 1) - 0.5) * gridW * 0.16;
        const jy = -i * 7;
        const rot = (seed(i, 2) - 0.5) * 22;
        const x = (pileX + jx - slot.x) * k;
        const y = (pileY + jy - slot.y) * k;
        el.style.transform =
          lp >= 0.999
            ? ""
            : `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${(rot * k).toFixed(2)}deg) scale(${(0.55 + 0.45 * lp).toFixed(3)})`;
        el.style.opacity = String(clamp(lp * 5, 0, 1));
        el.style.zIndex = String(n - i);
        el.style.pointerEvents = lp > 0.95 ? "" : "none";
      });
    };

    const tick = () => {
      const t = target();
      smooth = smooth < 0 ? t : smooth + (t - smooth) * 0.24;
      if (Math.abs(t - smooth) < 0.0005) smooth = t;
      render(smooth);
      raf = smooth === t ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    // start from "assembled" if the grid is already past the trigger (e.g. reload mid-page)
    smooth = target();
    render(smooth);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      tiles.forEach((el) => {
        el.style.transform = el.style.opacity = el.style.zIndex = el.style.pointerEvents = "";
      });
    };
  }, [total]);

  const current = open !== null ? list[open] : null;

  return (
    <section
      id="gallery"
      className="identity identity-gallery relative overflow-hidden py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            {mark && <SectionMark meta={sections.gallery} />}
            <h2 className={`display-sm text-content ${mark ? "mt-5" : "mt-2"}`}>
              Evenings, held in <span className="gold-text italic">light</span>
            </h2>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-mute">
              A short register of work. Each frame is a structure we designed,
              raised and struck ourselves. Select any frame to view it full size.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <ul
          ref={gridRef}
          className="mt-14 grid grid-flow-dense auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4"
        >
          {list.map((item, i) => (
            <li
              key={item.src}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className={`min-h-0 will-change-transform ${spans[i] ?? ""}`}
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Open image ${pad(i + 1)}: ${item.title}, ${item.place}`}
                className="group relative block h-full w-full overflow-hidden rounded-[18px] text-left outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-[#d6b36a]"
              >
                <Image
                  src={item.src}
                  alt={`${item.title} — ${item.place}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/85 via-transparent to-[#0b1220]/30" />

                {/* Number */}
                <span className="num absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[0.72rem] tracking-[0.08em] text-white backdrop-blur">
                  No. {pad(i + 1)}
                </span>

                {/* Hint */}
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100">
                  <Icon
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                    className="h-4 w-4"
                  />
                </span>

                {/* Caption */}
                <span className="absolute inset-x-0 bottom-0 block px-4 pb-3.5 pt-10">
                  <span className="block text-[0.75rem] text-[#d6b36a]">
                    {item.place}
                  </span>
                  <span className="mt-0.5 block font-serif text-[1.05rem] leading-snug text-white sm:text-[1.15rem]">
                    {item.title}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {current && open !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${pad(open + 1)} of ${pad(total)}: ${current.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#060a12]/95 backdrop-blur-md motion-safe:animate-[lbfade_220ms_ease-out]"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <style>{`@keyframes lbfade{from{opacity:0}to{opacity:1}}`}</style>

          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="num text-[0.85rem] tracking-[0.08em] text-white/80">
              <span className="text-[#d6b36a]">No. {pad(open + 1)}</span>
              <span className="mx-2 text-white/30">/</span>
              {pad(total)}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 pl-4 pr-3.5 text-[0.85rem] font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b36a]"
            >
              Close
              <Icon d="M6 6l12 12M18 6L6 18" className="h-4 w-4" />
            </button>
          </div>

          {/* Image */}
          <div className="relative min-h-0 flex-1 px-4 sm:px-20">
            <div
              key={open}
              className="relative h-full w-full motion-safe:animate-[lbfade_260ms_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={`${current.title} — ${current.place}`}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d6b36a] sm:left-6 sm:h-12 sm:w-12"
            >
              <Icon d="M15 5l-7 7 7 7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d6b36a] sm:right-6 sm:h-12 sm:w-12"
            >
              <Icon d="M9 5l7 7-7 7" />
            </button>
          </div>

          {/* Caption */}
          <div
            className="px-4 pb-5 pt-4 text-center sm:px-8 sm:pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-serif text-[1.3rem] text-white sm:text-[1.6rem]">
              {current.title}
            </div>
            <div className="mt-1 text-[0.85rem] text-[#d6b36a]">{current.place}</div>
          </div>
        </div>
      )}
    </section>
  );
}
