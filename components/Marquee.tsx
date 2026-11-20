"use client";

import { useEffect, useRef, useState } from "react";
import { locations } from "@/lib/data";
import { PinIcon } from "./icons";

export default function Marquee() {
  const items = [...locations, ...locations];
  return (
    <div className="marquee relative overflow-hidden border-y border-line/10 band py-4">
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((c, i) => (
          <div key={`${c}-${i}`} className="flex items-center gap-10">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <PinIcon className="h-3.5 w-3.5 text-gold/70" />
              <span className="kicker whitespace-nowrap text-[0.58rem] text-mute">{c}</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/60" />
          </div>
        ))}
      </div>
      {/* soft edge fades so the loop never looks cut */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(var(--c-page)) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgb(var(--c-page)) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function Counter({ value }: { value: string }) {
  const [shown, setShown] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.startsWith("$") ? "$" : "";
    const suffix = value.replace(/^\$?[\d.]+/, "");
    let raf = 0;

    const run = () => {
      const start = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = numeric * eased;
        const decimals = value.includes(".") ? 1 : 0;
        setShown(prefix + v.toFixed(decimals) + suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (run(), obs.disconnect())),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="num">
      {shown}
    </span>
  );
}
