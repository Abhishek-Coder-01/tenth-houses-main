import Link from "next/link";
import { PinIcon, SparkIcon, ArrowIcon } from "./icons";
import { sections } from "@/lib/sections";
import { ThemeSelector } from "./Theme";

const columns = [
  {
    title: "The House",
    links: [
      { label: "Structures", href: sections.structures.href },
      { label: "Our practice", href: sections.about.href },
      { label: "Services", href: sections.services.href },
      { label: "Gallery", href: sections.gallery.href },
    ],
  },
  {
    title: "Collection",
    links: [
      { label: "Marquees", href: sections.structures.href },
      { label: "Pavilions", href: sections.structures.href },
      { label: "Glamping", href: sections.structures.href },
      { label: "Venues", href: sections.structures.href },
    ],
  },
  {
    title: "Desk",
    links: [
      { label: "Private enquiry", href: sections.contact.href },
      { label: "Request a dossier", href: sections.contact.href },
      { label: "Press", href: sections.contact.href },
      { label: "Careers", href: sections.contact.href },
    ],
  },
];

/* ---------- Real brand-colour SVGs ---------- */
function InstagramColor({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="url(#ig-grad)" />
    </svg>
  );
}

function LinkedinColor({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.2 9.8H4.6v8.4h2.6V9.8zM5.9 5.8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM19.4 13.6c0-2.5-1.3-3.9-3.3-3.9-1.3 0-2.1.7-2.5 1.3V9.8h-2.6v8.4h2.6v-4.6c0-1.2.6-2 1.6-2s1.5.8 1.5 2v4.6h2.7v-4.6z"
      />
    </svg>
  );
}

function XColor({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#000" />
      <path
        fill="#fff"
        d="M16.9 5.5h2.2l-4.8 5.5 5.6 7.5h-4.4l-3.4-4.5-3.9 4.5H6l5.2-5.9L5.8 5.5h4.5l3.1 4.1 3.5-4.1zm-.8 11.7h1.2L9.9 6.7H8.6l7.5 10.5z"
      />
    </svg>
  );
}

function WhatsappColor({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#25D366" />
      <path
        fill="#fff"
        d="M12 5.2a6.8 6.8 0 00-5.85 10.27L5.2 18.8l3.4-.9A6.8 6.8 0 1012 5.2zm0 1.25a5.55 5.55 0 11-2.95 10.25l-.2-.12-2 .53.54-1.95-.13-.2A5.55 5.55 0 0112 6.45zm-2.2 2.55c-.12 0-.3.04-.46.22-.16.17-.6.58-.6 1.42s.62 1.65.7 1.76c.09.12 1.2 1.9 2.95 2.58 1.46.58 1.76.46 2.08.43.32-.03 1.02-.42 1.16-.82.15-.4.15-.75.1-.82-.04-.07-.16-.12-.33-.2-.17-.1-1.02-.5-1.18-.56-.16-.06-.27-.09-.39.09-.11.17-.45.56-.55.68-.1.11-.2.13-.37.04-.17-.09-.73-.27-1.39-.86-.51-.46-.86-1.03-.96-1.2-.1-.18-.01-.27.08-.36.08-.08.17-.2.26-.3.09-.1.12-.17.17-.29.06-.11.03-.22-.01-.3-.05-.1-.39-.95-.54-1.3-.14-.34-.28-.29-.39-.3h-.33z"
      />
    </svg>
  );
}

const socials = [
  { label: "Instagram", Icon: InstagramColor, glow: "hover:shadow-[0_10px_30px_-8px_rgba(214,41,118,0.7)]" },
  { label: "LinkedIn", Icon: LinkedinColor, glow: "hover:shadow-[0_10px_30px_-8px_rgba(10,102,194,0.8)]" },
  { label: "X", Icon: XColor, glow: "hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.45)]" },
  { label: "WhatsApp", Icon: WhatsappColor, glow: "hover:shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)]" },
];

/* Theme (palette) icon */
function ThemeIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M12 3a9 9 0 100 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.7 1.8-1.7H17a4 4 0 004-4c0-4.4-4-8-9-8z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="10.5" cy="7.2" r="1" fill="currentColor" />
      <circle cx="15" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="identity identity-footer relative overflow-hidden">
      {/* ambient glows */}
      <div
        className="pointer-events-none absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full opacity-25 blur-[120px]"
        style={{ backgroundImage: "radial-gradient(circle, rgb(var(--c-gold) / 0.45), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[380px] w-[380px] rounded-full opacity-20 blur-[130px]"
        style={{ backgroundImage: "radial-gradient(circle, rgb(var(--c-gold) / 0.4), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1360px] px-6 pt-20 lg:px-10">
        {/* ---------- CTA band ---------- */}
        <div className="relative overflow-hidden rounded-[32px] border border-[#30363d] bg-[#161b22]/90 p-8 backdrop-blur sm:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b36a]/70 to-transparent" />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-[#d6b36a]">
                <SparkIcon className="h-3 w-3" />
                By appointment only
              </div>
              <h3 className="mt-4 font-serif text-[1.9rem] leading-[1.1] text-[#f8fafc] sm:text-[2.4rem]">
                Planning an evening <span className="gold-text italic">worth remembering?</span>
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-[#f8fafc]/65">
                Tell us the date, the guest count and the setting. We will return with a private dossier.
              </p>
            </div>
            <Link
              href={sections.contact.href}
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#f3dda9] px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#1a1306] shadow-[0_18px_40px_-14px_rgba(214,179,106,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request a dossier
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ---------- Main grid ---------- */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
 

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-3 text-[0.52rem] uppercase tracking-[0.2em] text-white/40">A company of</p>
            </div>

            <p className="mt-6 max-w-xs text-[0.88rem] leading-relaxed text-[#f8fafc]/70">
              Tented architecture, marquees and open-air venues. Designed, engineered and
              built by our own crews, in twenty-six cities.
            </p>

            {/* Social — real brand colours */}
            <div className="mt-8">
              <div className="text-[0.56rem] uppercase tracking-[0.21em] text-[#d6b36a]">Follow</div>
              <div className="mt-3 flex gap-3">
                {socials.map(({ label, Icon, glow }) => (
                  <a
                    key={label}
                    href={sections.contact.href}
                    aria-label={label}
                    title={label}
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${glow}`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-[0.56rem] uppercase tracking-[0.21em] text-[#d6b36a]">
                <ThemeIcon className="h-3.5 w-3.5" />
                Theme
              </div>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-3.5 pr-2 backdrop-blur">
                <ThemeIcon className="h-4 w-4 text-[#f3dda9]" />
                <ThemeSelector />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[0.7rem] text-[#f8fafc]/65">
              <PinIcon className="h-3.5 w-3.5 text-[#d6b36a]" />
              New York · Dubai · London
            </div>
          
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.21em] text-[#d6b36a]">
                  <span className="h-px w-4 bg-[#d6b36a]/70" />
                  {col.title}
                </h4>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[0.86rem] text-[#f8fafc]/65 transition-all duration-300 hover:translate-x-0.5 hover:text-[#f8fafc]"
                      >
                        <span className="h-px w-0 bg-[#d6b36a] transition-all duration-300 group-hover:w-3" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 hairline" />

      </div>
    </footer>
  );
}
