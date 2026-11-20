
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, MsgGroupIcon } from "./icons";
import { navLinks, normalizePath, sections } from "@/lib/sections";

/* =========================
   WORDMARK
========================= */

export function Wordmark({
  size = "md",
  inverted = false,
}: {
  size?: "sm" | "md";
  inverted?: boolean;
}) {
  const mark = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const text = size === "sm" ? "text-[1.15rem]" : "text-[1.26rem]";

  return (
    <span className="wordmark flex items-center gap-3">

      <span
        className={`wordmark-icon relative flex ${mark} items-center justify-center overflow-hidden rounded-[13px]`}
        style={{ boxShadow: "0 10px 24px -14px rgba(16,26,43,0.85)" }}
      >
        <img
          src="/msg-group-logo.svg"
          alt="MSG Group"
          className="h-full w-full object-contain"
        />
      </span>

      <span className="leading-none">

        <span
          className={`wordmark-title block font-serif ${text} tracking-[0.055em] ${inverted ? "text-white" : "text-content"
            }`}
        >
          TENTH <span className="gold-text italic">HOUSE</span>
        </span>

        <span
          className={`wordmark-tagline kicker mt-1.5 flex items-center gap-1.5 text-[0.44rem] ${inverted ? "text-white/60" : "text-mute/80"
            }`}
        >
          <MsgGroupIcon className="h-3 w-3" />
          MSG Group · Shaadi Tent House
        </span>

      </span>
    </span>
  );
}

/* =========================
   NAVIGATION HELPERS
========================= */

function linkHref(pathname: string, href: string, id: string) {
  return pathname === "/" ? `#${id}` : href;
}

/* =========================
   MAIN NAVBAR
========================= */

export default function Navbar() {
  const pathname = normalizePath(usePathname());
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(isHome ? "top" : "");

  /* SCROLL DETECTION */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ACTIVE SECTION DETECTION */

  useEffect(() => {
    if (!isHome) {
      const match = navLinks.find(
        (link) => normalizePath(link.href) === pathname
      );

      setActive(match?.id ?? "");
      return;
    }

    const observed = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (
      !observed.length ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-42% 0px -48% 0px",
        threshold: [0, 0.15, 0.35],
      }
    );

    observed.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome, pathname]);

  /* ACTIVE LINK */

  const isLinkActive = (id: string, href: string) => {
    if (isHome) return active === id;

    return pathname === normalizePath(href);
  };

  /* CLOSE MENU ON ROUTE CHANGE */

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* ESCAPE KEY */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* NAV LABEL */

  const getNavLabel = (key: string) => {
    switch (key) {
      case "home":
        return "Home";
      case "about":
        return "About Us";
      case "structures":
        return "Structures";
      case "services":
        return "Services";
      case "gallery":
        return "Gallery";
      default:
        return "Contact";
    }
  };

  const contactHref = isHome
    ? "#contact"
    : sections.contact.href;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5">

      {/* =========================
          DESKTOP NAVBAR
      ========================= */}

      <div className="relative mx-auto flex h-[58px] max-w-[1780px] items-center justify-between">

        {/* LEFT: LOGO */}

        <Link
          href="/"
          aria-label="Tenth House Home"
          className="relative z-20 flex shrink-0 items-center rounded-full border border-[#d9e0db] bg-[#f8faf7]/95 px-4 py-2.5 shadow-[0_14px_36px_rgba(42,57,49,0.14)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02]"
        >
          <Wordmark inverted={false} />
        </Link>

        {/* CENTER: NAVIGATION */}

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[#30363d] bg-[#161b22] px-3 py-2 shadow-[0_16px_38px_rgba(1,4,9,0.32)] backdrop-blur-xl xl:flex">

          {navLinks.map((link) => {
            const isActive = isLinkActive(link.id, link.href);

            return (
              <Link
                key={link.href}
                href={linkHref(pathname, link.href, link.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[0.85rem] font-semibold transition-all duration-300 ${isActive
                    ? "bg-[#d8b46a]/20 text-[#f8f3e7]"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {getNavLabel(link.key)}
              </Link>
            );
          })}

        </nav>

        {/* RIGHT: ACTION BUTTONS */}

        <div className="relative z-20 ml-auto flex shrink-0 items-center gap-3">

          {/* DESKTOP CTA */}

          <Link
            href={contactHref}
            className="group hidden items-center gap-2.5 rounded-full border border-[#d8b46a]/60 bg-gradient-to-r from-[#b9803d] to-[#dfbc70] px-6 py-3 text-sm font-bold text-[#1c271f] shadow-[0_12px_28px_rgba(180,133,68,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(180,133,68,0.35)] sm:inline-flex"
          >
            <span className="h-2 w-2 rounded-full bg-white transition-transform duration-300 group-hover:scale-125" />

            Book Now

            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* MOBILE HAMBURGER */}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full border border-[#d8b46a]/30 bg-[#161b22] transition-colors duration-300 hover:bg-[#30363d] xl:hidden"
          >
            <span
              className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""
                }`}
            />

            <span
              className={`h-px w-4 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""
                }`}
            />

            <span
              className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
            />
          </button>

        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================= */}

      <div
        id="mobile-navigation"
        className={`mx-auto mt-3 max-w-[1360px] overflow-hidden rounded-[22px] border border-[#30363d] bg-[#161b22]/95 shadow-[0_15px_40px_rgba(1,4,9,0.38)] backdrop-blur-xl transition-all duration-500 xl:hidden ${open
            ? "visible max-h-[500px] translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-2 opacity-0"
          }`}
      >
        <nav className="flex flex-col p-4">

          {navLinks.map((link) => {
            const isActive = isLinkActive(link.id, link.href);

            return (
              <Link
                key={link.href}
                href={linkHref(pathname, link.href, link.id)}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold transition-colors duration-300 last:border-0 ${isActive
                    ? "text-[#D8B46A]"
                    : "text-white hover:text-[#D8B46A]"
                  }`}
              >
                <span className="flex items-center gap-3">

                  <span
                    className={`h-4 w-1 rounded-full ${isActive
                        ? "bg-[#D8B46A]"
                        : "bg-transparent"
                      }`}
                  />

                  {getNavLabel(link.key)}

                </span>

                <ArrowIcon className="h-3.5 w-3.5 text-white/60" />
              </Link>
            );
          })}

          {/* MOBILE CTA */}

          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-[#d8b46a]/50 bg-gradient-to-r from-[#b47d3e] to-[#d8b46a] px-5 py-3.5 text-sm font-bold text-[#1c271f] transition-all duration-300 hover:brightness-110"
          >
            <span className="h-2 w-2 rounded-full bg-white" />

            Book Now

            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>

        </nav>
      </div>

    </header>
  );
}
