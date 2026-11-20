"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One scroll clock for the whole site. Lenis drives GSAP; ScrollTrigger only
 * reads scroll state and writes compositor-friendly transform/opacity values. */
export default function ScrollExperience() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href");
      const destination = hash ? document.querySelector(hash) : null;
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination, { offset: -96 });
    };
    const onScrollTop = () => lenis.scrollTo(0, { immediate: false });
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("th-scroll-to-top", onScrollTop);
    const context = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>(".hero-scene");
      const heroMedia = hero?.querySelector<HTMLElement>(".hero-media");
      const structureScene = document.querySelector<HTMLElement>(".structures-scene");
      const structureTrack = structureScene?.querySelector<HTMLElement>(".structures-track");
      const structureWindow = structureScene?.querySelector<HTMLElement>(".structures-window");
      const serviceDeck = document.querySelector<HTMLElement>(".service-deck");
      const serviceLayers = gsap.utils.toArray<HTMLElement>(".service-deck .service-layer");
      const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 720px)").matches;

      document.documentElement.classList.add("motion-enabled");
      document.documentElement.classList.toggle("motion-pinned", desktop);

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const amount = Number(element.dataset.parallax ?? 24);
        gsap.to(element, {
          y: amount,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      if (hero && heroMedia) {
        gsap.to(heroMedia, {
          y: 80,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(hero, {
          opacity: 0.58,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "65% top", scrub: true },
        });
      }

      if (desktop && structureScene && structureTrack && structureWindow) {
        const getTravel = () => Math.max(0, structureTrack.scrollWidth - structureWindow.clientWidth);
        gsap.to(structureTrack, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: structureScene,
            start: "top top",
            end: () => `+=${getTravel()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      if (desktop && serviceDeck && serviceLayers.length) {
        serviceLayers.forEach((layer, index) => {
          gsap.fromTo(
            layer,
            { scale: 1, y: 0 },
            {
              scale: 0.95,
              y: -4,
              ease: "none",
              scrollTrigger: {
                trigger: layer,
                start: `top ${120 + index * 14}px`,
                end: `top ${76 + index * 14}px`,
                scrub: 0.6,
              },
            },
          );
        });
      } else if (!desktop && serviceLayers.length) {
        // Keep the same scroll-led rhythm on phones without pinning the page.
        // Each card rises into view as it enters the viewport.
        serviceLayers.forEach((layer, index) => {
          gsap.fromTo(
            layer,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: layer,
                start: "top 88%",
                end: "top 58%",
                scrub: 0.45,
                once: true,
              },
            },
          );
        });
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
      });

      ScrollTrigger.refresh();
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("th-scroll-to-top", onScrollTop);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      context.revert();
      document.documentElement.classList.remove("motion-enabled", "motion-pinned");
    };
  }, [pathname]);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}
