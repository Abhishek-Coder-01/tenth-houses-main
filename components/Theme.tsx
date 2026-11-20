"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  toggle: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  /* read the class the inline head script already applied */
  useEffect(() => {
    const stored = localStorage.getItem("th-theme");
    setThemeState(stored === "dark" || stored === "light" ? stored : "system");
    setMounted(true);
  }, []);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    const resolved = next === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : next;
    root.classList.toggle("dark", resolved === "dark");
    root.dataset.theme = next;
    root.style.colorScheme = resolved;
    try {
      localStorage.setItem("th-theme", next);
    } catch {
      /* storage may be blocked — theme still applies for this session */
    }
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      apply(next);
    },
    [apply]
  );

  const toggle = useCallback(() => {
    setThemeState((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      apply(next);
      return next;
    });
  }, [apply]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4.1" fill="url(#sun-core)" />
      <g stroke="url(#sun-rays)" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2" />
        <path d="M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </g>
      <defs>
        <linearGradient id="sun-core" x1="8" y1="8" x2="16" y2="16">
          <stop stopColor="#FFD37A" />
          <stop offset="1" stopColor="#F0873F" />
        </linearGradient>
        <linearGradient id="sun-rays" x1="2" y1="2" x2="22" y2="22">
          <stop stopColor="#FFC24D" />
          <stop offset="1" stopColor="#F2784B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20.2 14.4A8.6 8.6 0 019.6 3.8 8.8 8.8 0 1020.2 14.4z"
        fill="url(#moon-body)"
        stroke="url(#moon-line)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="15.6" cy="8.4" r="0.85" fill="#C9D8FF" opacity="0.9" />
      <circle cx="12.9" cy="11.6" r="0.55" fill="#C9D8FF" opacity="0.7" />
      <defs>
        <linearGradient id="moon-body" x1="4" y1="3" x2="19" y2="20">
          <stop stopColor="#9DC4FF" />
          <stop offset="0.55" stopColor="#7C8CF8" />
          <stop offset="1" stopColor="#6C63E0" />
        </linearGradient>
        <linearGradient id="moon-line" x1="4" y1="3" x2="19" y2="20">
          <stop stopColor="#E5EEFF" />
          <stop offset="1" stopColor="#B3A9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ThemeSelector() {
  const { theme, setTheme, mounted } = useTheme();
  return <div className="flex flex-wrap items-center gap-2" aria-label="Color theme">
    <span className="mr-1 text-xs uppercase tracking-[0.16em] text-mute/75">Theme</span>
    {([["system", "System"], ["light", "Light"], ["dark", "Night"]] as const).map(([value, label]) =>
      <button key={value} type="button" onClick={() => setTheme(value)} aria-pressed={mounted && theme === value}
        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${mounted && theme === value ? "border-gold/70 bg-gold/15 text-gold" : "border-line/20 text-mute hover:border-gold/50 hover:text-content"}`}>
        {label}
      </button>)}</div>;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className={`group relative inline-flex h-9 w-[62px] shrink-0 items-center rounded-full border border-line/15 bg-surface/70 px-1 backdrop-blur transition-colors duration-300 hover:border-gold/50 ${className}`}
    >
      {/* track tint */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 transition-opacity duration-500"
        style={{
          backgroundImage: dark
            ? "linear-gradient(120deg, rgba(124,140,248,0.22), rgba(231,191,122,0.10))"
            : "linear-gradient(120deg, rgba(255,196,88,0.28), rgba(240,135,63,0.16))",
        }}
      />
      {/* knob */}
      <span
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-surface shadow-[0_4px_12px_-4px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: dark ? "translateX(28px)" : "translateX(0px)" }}
      >
        {mounted && dark ? (
          <MoonIcon className="h-[17px] w-[17px]" />
        ) : (
          <SunIcon className="h-[17px] w-[17px]" />
        )}
      </span>
    </button>
  );
}
