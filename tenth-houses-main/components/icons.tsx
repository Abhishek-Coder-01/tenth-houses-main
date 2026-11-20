/* A single, colourful inline icon set. Every glyph draws with
   currentColor so the coloured tile behind it sets the hue. */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const TentIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 3.2L3 20h18L12 3.2z" />
    <path d="M12 9.4L8.4 20M12 9.4L15.6 20" />
    <path d="M2 20h20" />
  </svg>
);

/** Parent-brand mark for MSG Group. Three connected nodes represent one group
 * with multiple operating brands; it stays legible at favicon and footer sizes. */
export const MsgGroupIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 7.5l7-3.5 7 3.5v9L12 20l-7-3.5v-9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M5.3 7.7L12 11l6.7-3.3M12 11v8.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="19" cy="7.5" r="1.5" fill="currentColor" />
  </svg>
);

export const KeyIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="7.5" cy="15.5" r="3.6" />
    <path d="M10.2 12.9L20 3.1M17 6.1l2.6 2.6M14.4 8.7l2.2 2.2" />
  </svg>
);

export const PlanIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="8.6" y="8.6" width="6.8" height="6.8" rx="1" />
    <path d="M3 9V4h5M21 15v5h-5M8 3v5.6M16 21v-5.6M3 8h5.6M21 16h-5.6" />
  </svg>
);

export const ShieldIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 3l8 3.4V12c0 5-3.6 7.9-8 9-4.4-1.1-8-4-8-9V6.4L12 3z" />
    <path d="M8.9 12l2.3 2.3 4.2-4.4" />
  </svg>
);

export const SofaIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4.4 12.2V9.4a2 2 0 012-2h11.2a2 2 0 012 2v2.8" />
    <path d="M2.8 12.4h18.4v4.9H2.8z" />
    <path d="M6 17.3v2.1M18 17.3v2.1M6.6 12.2V9.9h10.8v2.3" />
  </svg>
);

export const GlobeIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.7 3 14.3 0 18M12 3c-3 3.7-3 14.3 0 18" />
  </svg>
);

export const ChartIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4 19V5M4 19h16" />
    <path d="M8 15.2l4-5.2 3 3 4.2-6" />
    <circle cx="19.2" cy="7" r="1.3" />
  </svg>
);

export const ArrowIcon = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4.5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} strokeWidth={2} className={className} aria-hidden>
    <path d="M4.5 12.6l4.6 4.6L19.5 6.6" />
  </svg>
);

export const PhoneIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M6.2 3.5h3l1.5 3.7-2 1.4a11.4 11.4 0 005.7 5.7l1.4-2 3.7 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 5.7a2 2 0 012-2.2z" />
  </svg>
);

export const MailIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4" />
    <path d="M3.6 6.6L12 12.8l8.4-6.2" />
  </svg>
);

export const PinIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ClockIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </svg>
);

export const SparkIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 3l1.9 5.3L19 10.2l-5.1 1.9L12 17.4l-1.9-5.3L5 10.2l5.1-1.9L12 3z" />
    <path d="M18.4 16.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
  </svg>
);

export const StarIcon = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9 2.9-6z" />
  </svg>
);

export const QuoteIcon = ({ className = "h-8 w-8" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M9.4 5.2c-3.4 1.7-5.4 4.5-5.4 8.2 0 3.1 1.8 5.4 4.4 5.4 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1.1.2.4-1.7 1.7-3.2 3.4-4.2l-1.9-2.4zM19.6 5.2c-3.4 1.7-5.4 4.5-5.4 8.2 0 3.1 1.8 5.4 4.4 5.4 2.2 0 3.9-1.6 3.9-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1.1.2.4-1.7 1.7-3.2 3.4-4.2l-1.9-2.4z" />
  </svg>
);

export const InstagramIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedinIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3.4" />
    <path d="M7.6 10.4v6.2M7.6 7.5v.1M11.6 16.6v-6.2M11.6 13.1c0-1.6 1-2.7 2.5-2.7s2.3 1 2.3 2.8v3.4" />
  </svg>
);

export const XIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4.4 4.4l15.2 15.2M19.6 4.4L4.4 19.6" />
  </svg>
);

export const WhatsappIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M20.4 11.7a8.5 8.5 0 01-12.6 7.5L3.6 20.4l1.2-4.1A8.5 8.5 0 1120.4 11.7z" />
    <path d="M9.1 8.4c-.7.2-.8 1-.6 1.7.5 1.9 2 3.5 4 4.2.8.3 1.7.1 1.9-.6.1-.5-.6-.9-1.2-1.1-.4-.2-.7-.3-1 .1l-.4.5c-1-.5-1.7-1.2-2.2-2.2l.5-.4c.3-.3.3-.6.1-1-.2-.5-.5-1.3-1.1-1.2z" />
  </svg>
);

export const crestTiles: Record<string, string> = {
  key: "tile-gold",
  plan: "tile-navy",
  shield: "tile-champagne",
  sofa: "tile-navy",
  globe: "tile-gold",
  chart: "tile-navy",
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "key":
      return <KeyIcon className={className} />;
    case "plan":
      return <PlanIcon className={className} />;
    case "shield":
      return <ShieldIcon className={className} />;
    case "sofa":
      return <SofaIcon className={className} />;
    case "globe":
      return <GlobeIcon className={className} />;
    default:
      return <ChartIcon className={className} />;
  }
}
