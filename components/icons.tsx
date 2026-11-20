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

/* =========================================================================
   TENTH HOUSE — LUXURY SHAADI TENT HOUSE BESPOKE SERVICE ICONS
   Intricately designed vector SVGs for Indian wedding & event infrastructure
   ========================================================================= */

/** 01. Royal Tent & Carved Mandap Structure */
export const TentMandapIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* Decorative pinnacle / Kalash finial */}
    <path d="M16 2v3M14.5 3.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="5" r="1.2" fill="currentColor" />
    {/* Royal Canopy Roof with scalloped overhang */}
    <path
      d="M16 5.5C12 7.5 7 10 3 13.5v2c2-1 4-1.2 6-.5 2 .7 4 .7 7-1 3 1.7 5 1.7 7 1 2-.7 4-.5 6 .5v-2C25 10 20 7.5 16 5.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Roof silk drapery ribs */}
    <path d="M16 5.5v7.5M9.5 9.8l1.5 4M22.5 9.8l-1.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    {/* Carved Mandap Pillars */}
    <path d="M6 15.5v12.5M26 15.5v12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 16.5v11.5M22 16.5v11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* Entrance Mandap Arch */}
    <path d="M10 20c2-2.5 4-3.5 6-3.5s4 1 6 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* Mandap Base Plinth */}
    <path d="M2 28h28M4 28v2h24v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    {/* Hanging Marigold Garland Beads */}
    <circle cx="8" cy="18" r="0.9" fill="currentColor" />
    <circle cx="16" cy="17" r="1" fill="currentColor" />
    <circle cx="24" cy="18" r="0.9" fill="currentColor" />
  </svg>
);

/** 02. Grand Crystal Chandelier, Fairy Lights & Floral Illumination */
export const DecorLightingIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* Ceiling chain */}
    <path d="M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 6h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Central Chandelier Stem */}
    <path d="M16 6v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Upper Chandelier Tier */}
    <path d="M16 10c-3.5 0-6.5-1.5-8 1.5v2.5M16 10c3.5 0 6.5-1.5 8 1.5v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* Lower Regal Scroll Arms */}
    <path d="M16 14.5c-6 0-11-2-12 4.5v2M16 14.5c6 0 11-2 12 4.5v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Candle Holders */}
    <path d="M3 21h2M7 14h2M23 14h2M27 21h2M15 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Glowing Candle Flame Tips */}
    <path d="M4 19.5c0-.8.6-1.8 1-2.5.4.7 1 1.7 1 2.5a1 1 0 01-2 0zM8 12.5c0-.8.6-1.8 1-2.5.4.7 1 1.7 1 2.5a1 1 0 01-2 0zM24 12.5c0-.8.6-1.8 1-2.5.4.7 1 1.7 1 2.5a1 1 0 01-2 0zM28 19.5c0-.8.6-1.8 1-2.5.4.7 1 1.7 1 2.5a1 1 0 01-2 0zM16 10.5c0-.8.6-1.8 1-2.5.4.7 1 1.7 1 2.5a1 1 0 01-2 0z" fill="currentColor" />
    {/* Faceted Crystal Drops */}
    <path d="M16 20.5l-1.5 3 1.5 2.5 1.5-2.5-1.5-3zM4 22.5l-1 2 1 1.5 1-1.5-1-2zM28 22.5l-1 2 1 1.5 1-1.5-1-2zM10 20l-1 2 1 1.5 1-1.5-1-2zM22 20l-1 2 1 1.5 1-1.5-1-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Ambient Sparkles */}
    <path d="M28.5 5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8zM2.5 8l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5.5-1.2z" fill="currentColor" />
  </svg>
);

/** 03. Royal Maharaja Throne / High-Back Velvet Wedding Sofa */
export const FurnitureRoyalIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* Ornate Carved Crown Backrest */}
    <path
      d="M16 3c-1.5 1.5-3.5 1.5-5 0 0 3-1.5 4.5-4 4.5 1.5 4 1.5 8.5 2 12.5h14c.5-4 .5-8.5 2-12.5-2.5 0-4-1.5-4-4.5-1.5 1.5-3.5 1.5-5 0z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Crown Crest Jewel */}
    <circle cx="16" cy="6" r="1.2" fill="currentColor" />
    {/* Diamond Tufted Velvet Pattern */}
    <path d="M12 11l4 4 4-4M12 15l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    <circle cx="16" cy="11" r="0.8" fill="currentColor" />
    <circle cx="12" cy="15" r="0.8" fill="currentColor" />
    <circle cx="20" cy="15" r="0.8" fill="currentColor" />
    {/* Scroll Armrests */}
    <path d="M7 16c-2.5 0-4 1.8-4 4.2 0 2 1.5 3.3 3.5 3.3H9M25 16c2.5 0 4 1.8 4 4.2 0 2-1.5 3.3-3.5 3.3H23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Deep Velvet Seat Cushion */}
    <path d="M5.5 22.5h21c1.2 0 2 .8 2 2s-.8 2-2 2h-21c-1.2 0-2-.8-2-2s.8-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Cabriole Legs */}
    <path d="M6 26.5c-.5 1.8-1.5 3-2.5 3.5M26 26.5c.5 1.8 1.5 3 2.5 3.5M16 26.5v3M10 26.5v1.5M22 26.5v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** 04. Royal Banquet Dining Cloche & Catering Hospitality Feast */
export const CateringFeastIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* Cloche Ring Handle */}
    <circle cx="16" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 9.7v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Banquet Cloche Dome */}
    <path d="M4 22c0-7 5.4-10.3 12-10.3s12 3.3 12 10.3H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Dome decorative relief */}
    <path d="M7 19c2.5-3 5.5-4.5 9-4.5s6.5 1.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    {/* Warm Steam / Aroma Whispers */}
    <path d="M12 4.5c-.8.8-.8 2 0 2.8M16 3c-.8 1-.8 2.2 0 3.2M20 4.5c-.8.8-.8 2 0 2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
    {/* Presentation Platter Tray */}
    <path d="M2 22h28M3.5 24h25c1 0 1.8.8 1.5 1.8l-.8 2.2H2.8l-.8-2.2c-.3-1 .5-1.8 1.5-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    {/* Royal Catering Platter Crest */}
    <circle cx="16" cy="26" r="1" fill="currentColor" />
    <path d="M11 26h2M19 26h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/** 05. Concert-Grade DJ Audio Deck, Line-Array Spectrum & Stage Light */
export const SoundAvIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* DJ Turntable Console */}
    <rect x="3" y="10" width="26" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
    {/* Left Turntable Vinyl */}
    <circle cx="10.5" cy="18.5" r="5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="10.5" cy="18.5" r="2.2" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
    <circle cx="10.5" cy="18.5" r="0.8" fill="currentColor" />
    <path d="M14 15l2 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    {/* Equalizer Spectrum Rhythm Bars */}
    <path d="M18.5 22v-3.5M20.5 22v-6M22.5 22v-8M24.5 22v-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    {/* Stage Lighting Beams */}
    <path d="M7 3l3 5M16 2v6M25 3l-3 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
    <circle cx="7" cy="3" r="1.2" fill="currentColor" />
    <circle cx="16" cy="2" r="1.2" fill="currentColor" />
    <circle cx="25" cy="3" r="1.2" fill="currentColor" />
  </svg>
);

/** 06. Royal Wedding Event Coordinator Crest & Star Badge */
export const EventManagementIcon = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    {/* Clipboard Top Clip */}
    <path d="M12 4h8v3h-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 4c0-1.1.9-2 2-2s2 .9 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Main Clipboard Body */}
    <rect x="5" y="5.5" width="22" height="23" rx="3" stroke="currentColor" strokeWidth="1.6" />
    {/* Completed Checklist Tasks */}
    <path d="M9 11.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 11.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 16.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 16.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 21.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 21.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Royal Coordinator Star Crest / Seal of Assurance */}
    <circle cx="23.5" cy="23.5" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.12" />
    <path d="M23.5 20.8l.8 1.8 1.9.3-1.4 1.3.3 1.9-1.6-.9-1.6.9.3-1.9-1.4-1.3 1.9-.3.8-1.8z" fill="currentColor" />
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
  tent: "tile-gold",
  lighting: "tile-coral",
  furniture: "tile-teal",
  catering: "tile-champagne",
  sound: "tile-sky",
  management: "tile-violet",
  key: "tile-gold",
  plan: "tile-coral",
  shield: "tile-teal",
  sofa: "tile-champagne",
  globe: "tile-sky",
  chart: "tile-violet",
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "tent":
    case "key":
      return <TentMandapIcon className={className} />;
    case "lighting":
    case "plan":
      return <DecorLightingIcon className={className} />;
    case "furniture":
    case "shield":
      return <FurnitureRoyalIcon className={className} />;
    case "catering":
    case "sofa":
      return <CateringFeastIcon className={className} />;
    case "sound":
    case "globe":
      return <SoundAvIcon className={className} />;
    case "management":
    case "chart":
    default:
      return <EventManagementIcon className={className} />;
  }
}
