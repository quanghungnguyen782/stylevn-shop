# LyleAuthentic — Design System

This formalizes what already exists in `app/globals.css` and extends it where the audit found gaps. Existing token values are kept as-is (they already fit the "warm off-white / near-black / muted gray / single restrained accent" direction) — this is a systematization pass, not a repaint.

## Colors

```css
:root {
  --color-background: #f7f5f2;   /* was --color-canvas — warm off-white */
  --color-surface: #ffffff;      /* cards, panels on top of background */
  --color-text: #141414;         /* was --color-ink — near-black */
  --color-text-secondary: #6b675f; /* was --color-muted */
  --color-border: #e4e0d9;       /* was --color-line */
  --color-accent: #a8462e;       /* CTAs, primary buttons, active states */
  --color-accent-dark: #7c331f;  /* hover/pressed state for accent */
  --color-sale: #b8823f;         /* NEW — sale badges/pricing only, distinct from CTA accent */
}
```

Rename note: keep the existing `--color-canvas`/`--color-ink`/`--color-muted`/`--color-line` variable names in code (renaming them site-wide is a large mechanical change with no user-facing benefit) — `--color-background`/`--color-text`/etc. above are the *conceptual* names for this document; the implementation adds `--color-sale` as the one new token and leaves the rest aliased as they are today.

**Rule:** `--color-accent` = "act now" (buttons, links, active nav). `--color-sale` = "this is discounted" (sale badges, strikethrough-adjacent sale price). Never use one for the other's job — that's the whole point of separating them.

Contrast check: `#141414` on `#f7f5f2` = ~18.4:1 (AAA). `#ffffff` on `#a8462e` = ~4.6:1 (AA for normal text, AAA for large text/buttons). `#ffffff` on `#b8823f` = ~2.9:1 — **too low for small text on a sale-colored background**; use `--color-sale` for text/badges on the light background instead of white-on-sale-color, or reserve white-on-sale-color for large bold numerals only.

## Typography

Existing 2-font system stays: **Fraunces** (display/serif — logo, hero, section headings) + **Inter** (sans — everything else). No third font.

| Role | Font | Size (desktop) | Weight | Notes |
|---|---|---|---|---|
| Hero heading | Fraunces | clamp-based, ~48-60px | 600 | Already implemented via `clamp()` in Hero.tsx |
| H1 (page title) | Fraunces | 30-32px | 600 | |
| H2 (section heading) | Fraunces | 24-28px | 600 | |
| H3 (subsection) | Inter | 16-18px | 600 | Uppercase + tracking for eyebrow-style labels |
| Body | Inter | 14-15px | 400 | |
| Small / caption | Inter | 12-13px | 400 | Muted color |
| Product title (card) | Inter | 14px | 500 | `line-clamp-1`, already implemented |
| Product title (PDP) | Fraunces | 24-28px | 600 | Matches H1/H2 weight, gives PDP an editorial feel |
| Price (current) | Inter | 15-16px | 600 | Never larger than product title on a card — price should confirm, not shout |
| Price (original/struck) | Inter | 13px | 400 | `text-secondary`, `line-through` |
| Price (sale, PDP) | Inter | 20-24px | 600 | `--color-sale` |
| Button | Inter | 13-14px | 500 | Uppercase, `tracking-wide` — already the convention in `Button.tsx` |
| Navigation | Inter | 13-14px | 400 | Uppercase, `tracking-wide` |

**Rule:** price hierarchy on any card/PDP showing both prices: current price is always heavier weight and darker than the struck-through original price. Never let the discount percentage badge be visually louder than the price itself.

## Spacing scale

Formalizing what's already used ad hoc into an explicit scale (Tailwind default spacing, just documented as the intentional rhythm):

- Section vertical padding: `py-16` (mobile) → `py-20` (desktop) for standard content sections; `py-12`/`py-14` for lighter sections (trust bar, newsletter).
- Card internal padding: `p-3` to `p-4`.
- Grid gaps: `gap-4` (mobile) → `gap-6`/`gap-8` (desktop) for product grids.
- Container: `max-w-[1440px]` (matches the existing `--breakpoint-xl` token) with `px-4` (mobile) / `px-8` (desktop) side padding — already the convention across marketing sections.

**Rule:** don't introduce a new arbitrary padding value (e.g. `py-17`, `px-9`) when an existing step in this scale already fits — consistency matters more than pixel-perfect tuning per section.

## Radius

- `--radius-none: 0px` — default for cards, images, sections.
- `--radius-sm: 2px` — buttons, inputs, small pills/badges.
- **No `md`/`lg`/`full` radius tokens exist, and none should be added** except `rounded-full` for genuinely circular elements (icon buttons, avatar-style thumbnails, carousel dots) — this is what keeps the "very limited rounded corners" rule enforceable rather than aspirational.

## Components

| Component | States/variants | Notes |
|---|---|---|
| `Button` | `primary`, `secondary`, `ghost`, `accent` × `sm`/`md`/`lg` | Existing, no change needed |
| `IconButton` | single style, `h-11 w-11`, circular | Requires `aria-label` always |
| `Badge` | `accent`, `ink`, `muted` tones | **Add a `sale` tone** using `--color-sale`; migrate the header's hand-rolled count-bubble markup to use this component |
| `ProductCard` | hover crossfade, quick-add, wishlist toggle | Sportswear only — keep as-is structurally |
| `BagProductCard` | condition badge, display-id badge, hover zoom | Hàng-hiệu only — no cart actions by design (Zalo contact model) |
| Header dropdown | currently single-column hover list | **Upgrade hàng-hiệu dropdown to a 2-column layout** (categories split into two columns of ~5-6 each) once implemented — still not a heavy image-mega-menu, just enough structure to feel intentional at 11 items |
| Wishlist | toggle exists, **no view surface** | **New**: a wishlist drawer (reuse the existing `Drawer` component pattern from `CartDrawer`) rather than a full page — keeps the interaction model consistent with cart |

## Breakpoints

Unchanged — already well-chosen and referenced throughout: `xs:375px`, `sm:430px`, `md:768px`, `lg:1024px`, `xl:1440px`.

**Rule:** the header/hero split layout switches at `lg`; don't introduce a new one-off breakpoint for a single component without a documented reason (the earlier `lg` vs `md` nav-wrapping bug this session was caused by exactly this kind of one-off breakpoint choice).

## Interaction / motion rules

- Hover transitions: `duration-200` to `duration-300`, `ease-out` — no bounce, no spring physics.
- Image hover zoom: subtle scale (`scale-105`), never above `scale-110`.
- Drawer/modal transitions: slide + fade, `duration-200`-ish, matching the existing `Drawer` component.
- All motion must respect `prefers-reduced-motion` — already handled globally in `app/globals.css` (animation/transition durations forced to `0.01ms`).
- Carousel/hero autoplay: 5-7s per slide (already 5s in `Hero.tsx`) — no change.

## Icons

Existing set (`components/ui/icons.tsx`) is already fully consistent: 20×20 rendered, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth={1.5}`, round caps/joins. **No new icon style should deviate from this** — any new icon (filter, sort, close-variant, etc.) must match these exact parameters.

## What this document deliberately does not do

- It does not introduce a third font, a second accent hue beyond `--color-sale`, a new radius step, or a new breakpoint — the brief explicitly asks for restraint, and every one of those would be a restraint violation.
