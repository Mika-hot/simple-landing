# monblanproject

A pixel-perfect Next.js 15 single-page application built from a Figma design, implementing an Instagram-style photography profile with dual layout modes, date-range filtering, and a fully tokenised design system.

## 🚀 Live Deployment

The application is deployed and accessible in production via Vercel:
👉 **[https://simple-landing-monblanproject.vercel.app/]**

---

## Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC + streaming SSR; zero-config image optimisation via `next/image`; `next/font` eliminates FOUT |
| Language | TypeScript (strict) | Compile-time correctness across token, component, and hook boundaries |
| Styling | Tailwind CSS v3 | Utility-first layout with `preflight: false` to avoid MUI baseline conflicts |
| Component library | MUI v5 | Accessible, themeable primitives; DateCalendar + Popover for fully custom date picker DOM |
| CSS-in-JS | Emotion | SSR-safe style injection via `useServerInsertedHTML` registry — no hydration flash |
| Date handling | date-fns v3 | Tree-shakeable; `AdapterDateFnsV3` bridges MUI X with the v3 API |
| Icons | MUI Icons Material + inline SVG | MUI icons for stats; inline SVG for view-toggle and date-picker controls (dynamic fill colour) |
| Fonts | Montserrat + Roboto via `next/font` | Zero layout shift; CSS variables surfaced to both Tailwind and Emotion |

---

## Architecture

### Design Tokens — `src/theme/tokens.ts`

Single source of truth for every visual value (colours, shadows, typography scales, radii, spacing). Both `tailwind.config.ts` and `src/theme/MuiThemeProvider.tsx` import this file directly — no hardcoded values exist anywhere in component code. Token keys map 1-to-1 to Figma layer properties extracted from `figma_data.json`.

### SSR Safety — `src/theme/EmotionRegistry.tsx`

Client component wrapping `@emotion/cache` and `useServerInsertedHTML`. Collects all Emotion style sheets produced during SSR and injects them into the `<head>` before the client bundle hydrates, preventing the MUI flash-of-unstyled-content on first paint in App Router.

### State Isolation — `src/hooks/usePostFilters.ts`

All date-filter and layout-mode state lives in one custom hook. `useMemo` gates the filtered post array so downstream components never recompute; `useCallback` stabilises every setter reference, preventing unnecessary re-renders through the `filterBar` slot.

### Atomic Component Hierarchy

```
StatLine          — single metric row: icon + count
  └─ StatGroup    — stacked pair: likes row + comments row
       └─ PostCardColumn  — full data column: header / StatGroup / footer
            └─ GridPostCard  — tile card: image + two PostCardColumns
```

Module-level style constants in `GridPostCard.tsx` are defined outside the component function to guarantee object identity stability across renders — no new object allocation per render cycle.

### Polymorphic PostCard — `src/components/posts/PostCard.tsx`

Compound export `{ Tile: GridPostCard, Row: PostCardRow }` preserves a single stable import path for `PostGrid`. Both variants accept the same `Post` interface; `Tile` adds an optional `priority` prop for above-fold LCP optimisation.

### Custom DatePicker — `src/components/filters/DateRangeFilter.tsx`

MUI's `DatePicker` TextField slot cannot produce the required `[text][×24px][cal24px]` DOM without fighting slot internals. Solution: plain `<div>` input + `DateCalendar` inside a `Popover`. `LocalizationProvider` must live *inside* the `Popover` because MUI Portal renders outside the React tree — providers above the portal are invisible to it.

### Media Optimisation

Every `<Image>` uses `fill` + explicit `sizes` attribute. The first four above-fold tiles receive `priority` to trigger LCP preload. Decorative vectors use `aria-hidden` and `pointer-events-none`.

---

## File Structure

```
src/
  app/
    layout.tsx                  # Root layout: fonts, SSR registry, SEO metadata, viewport
    page.tsx                    # SPA shell: state wiring, filter bar, view toggle, post grid
    globals.css
  theme/
    tokens.ts                   # Design token map (colours, shadows, typography, radii)
    MuiThemeProvider.tsx        # MUI createTheme consuming tokens
    EmotionRegistry.tsx         # App Router SSR emotion cache
  types/
    index.ts                    # Post, LayoutMode, FilterState, ProfileStats
  hooks/
    usePostFilters.ts           # Date filter + layout state; memoised derived data
  components/
    header/
      SiteHeader.tsx            # Profile header: logo, username badge, stats, date filter slot
    filters/
      DateRangeFilter.tsx       # Custom div input + DateCalendar Popover, two pickers
    posts/
      StatLine.tsx              # Atomic: icon + count row
      StatGroup.tsx             # Molecule: likes row + comments row
      PostCardColumn.tsx        # Organism: header / StatGroup / footer column
      GridPostCard.tsx          # Tile card: image + two PostCardColumns
      PostCard.tsx              # Compound export: { Tile, Row }
      PostGrid.tsx              # Responsive grid/list switcher
    ui/
      ViewToggle.tsx            # Grid / Row icon toggle with hover + active states
      LoadMoreButton.tsx        # Pill pagination button
  lib/
    mockPosts.ts                # Seeded mock data + profile stats
public/
  assets/
    Logo.svg
    LeftVector.svg
    RightVector.svg
  favicon.ico
```

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint check
```

---

## Features

- **Date range filter** — From / To custom date pickers with always-visible × and calendar icons; real-time post filtering; min/max constraints link the two pickers
- **Dual layout** — Grid (4-col desktop → 1-col mobile) and Row (data-table) views; initial page size 8 tiles / 9 rows; Load More adds the same batch size
- **Sticky header** — Profile logo, username + start-date badge, follower stats, date filter in one cohesive header row
- **View toggle** — SVG icons with active (#3D8EDA) / inactive (#C8C7C7) / hover states; right-aligned to the post container edge
- **Responsive** — 1 col (mobile) → 2 col (sm) → 4 col (lg) in grid mode; row cards adapt to container width
- **Lighthouse-ready** — SSR styles, `next/font` swap, `next/image` priority, semantic HTML, OpenGraph + Twitter metadata
