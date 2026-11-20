# Tenth House — Premium Tent House website (Next.js 14)

A private-estate / tented-architecture site with a complete **light + dark theme**,
colourful inline SVG icon set, card-based layout and a floating glass navbar.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build a deployable site

```bash
npm run build      # static export -> ./out
```

`next.config.mjs` uses `output: "export"`, so the finished site is plain
HTML/CSS/JS in `out/`. Serve that folder through an HTTP static host (not
`file://`). The included `site-export-preview/` is the latest prebuilt version;
upload its contents to your static host's root. No Node server is needed for
the exported site. GitHub Pages subdirectory deployments require a matching
Next.js `basePath` and a rebuild.

## What changed

- **Dark + light mode** — CSS-variable token system, `class="dark"` on `<html>`,
  saved in `localStorage` under `th-theme`, light theme on first visit,
  inline head script prevents a flash of the wrong theme.
- **Toggle** — sun / moon switch in the navbar (`components/Theme.tsx`).
- **Reference-inspired colour** — navy `#1e2954`, deep navy `#0e1430`,
  coral `#ef504b`, white and soft gray `#f2f4f8`, plus pastel service cards.
  Theme and motion overrides live in `app/experience.css`.
- **Scroll scenes** — native-scroll horizontal portfolio on spacious desktops;
  native swipe/snap on mobile and shorter screens; overlapping sticky service
  cards, masked heading reveals, image iris, hero parallax and reading progress.
  `components/ScrollExperience.tsx` owns scroll/resize observers and cleans them
  up on route changes. No animation libraries or new runtime dependencies.
- **Accessible fallbacks** — reduced-motion gets a static grid; server-rendered
  content remains visible without JavaScript. Portfolio filter buttons expose
  their pressed state, and offscreen portfolio links are brought into view
  when keyboard-focused.
- **Cards** — gradient hairline borders, lift-on-hover, icon tiles
  (`.card`, `.edge`, `.tile-*` in `app/globals.css`).
- **Navbar** — floating glass bar that condenses on scroll, active-section
  underline, phone pill, theme toggle, coral CTA, animated mobile panel.
- **Icons** — one hand-drawn set (`components/icons.tsx`), all inline SVG,
  all currentColor so each tile sets the hue.
- **Tent-house content** — marquees, pavilions, glamping structures and
  venues; services, three-step build process and enquiry form rewritten.
- **Fonts self-hosted** in `public/fonts` (Cormorant Garamond + Inter),
  so the build needs no network access.

## Structure

```
app/          layout, page, globals.css (theme tokens), fonts.css
components/   Navbar, Hero, Residences, House, Services, Process,
              Clients, Contact, Footer, Marquee, Reveal, Theme, icons
lib/data.ts   all copy + structures in one place
public/       images + fonts
```
