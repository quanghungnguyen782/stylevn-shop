# LyleAuthentic — UI/UX Audit

Date: 2026-09-19
Scope: full site (sportswear catalog + hàng-hiệu resale catalog), based on direct code inspection — no fabricated findings, no invented metrics.

## 0. Context this audit builds on

A meaningful amount of the "Modern Premium Fashion Editorial" direction requested is **already in place** from earlier work this session, not starting from zero:

- Design tokens already lean warm-off-white / near-black / muted-gray / single terracotta accent, sharp corners (2px radius).
- Fraunces (serif, display) + Inter (sans, body/UI) — already exactly a 2-font system.
- Header, hero, and homepage were already redesigned once this session (split hero layout, hover dropdowns, trust bar).
- Honesty guardrails already exist: no fake "verified authentic" claims, no fake social links, checkout explicitly discloses it's a test environment.

This audit focuses on what's still genuinely missing or inconsistent, rather than re-litigating what already works.

## 1. Critical issues (fix first)

| # | Issue | Where | Why it matters |
|---|---|---|---|
| C1 | **Fabricated contact info** — hotline, email, and street address on `/lien-he` were placeholder values, not real. | `app/lien-he/page.tsx` | Direct violation of the no-fabrication rule. **Fixed during this audit** — replaced with real values (hotline 0983 959 892, lyleauthentic1992@gmail.com, Biển Xanh 49, Vinhomes Ocean Park 2) after confirming with you. |
| C2 | **Search never covers the hàng-hiệu catalog** — `lib/search.ts` only indexes the 370-item sportswear JSON catalog. A customer searching "Gucci" or "túi xách" finds nothing, even though those products exist and are published. | `lib/search.ts` | Directly breaks "product discovery" — one of your named UX checks. |
| C3 | **No way to view your wishlist.** Hearting a product is real (persists to localStorage) but there is no wishlist page or drawer — the only feedback is a count badge in the header. Users can save items and then never see the list again. | `lib/wishlist-context.tsx`, no `app/**/wishlist` route exists | Wishlist becomes a dead-end feature. |
| C4 | **Homepage reuses the same 8 hàng-hiệu products in 3 different sections** (`LuxuryShowcase`, `CollectionStory`'s image, `AuthenticSection`'s image strip all pull from the same `getAllBagProducts().slice(0,8)` call). Combined with `newArrivals`/`flashSale`/`bestSellers` being 3 more distinct-but-visually-identical "grid of 8" sections, the homepage is 15 sections long — longer than a catalog page. | `app/page.tsx` | This is exactly the duplication you flagged in your brief (§18). |
| C5 | **Hàng-hiệu listing page has no sort, no price filter, no product count, no pagination, no breadcrumb** — while the sportswear listing page has all of these. Two catalogs, two very different shopping experiences. | `components/product/BagListingClient.tsx` vs `ProductListingClient.tsx` | Inconsistent, and the weaker of the two is the *luxury* catalog — the one that should feel more premium, not less capable. |
| C6 | **Header's Account icon does nothing** — no `onClick`, no destination. There's no auth system, so this is a dead affordance sitting next to functional Search/Wishlist/Cart icons. | `components/layout/Header.tsx` | A clickable-looking icon that does nothing erodes trust in a "professional" site. |

## 2. Visual / design-system issues

- **Only one accent color** (`--color-accent`, terracotta) serves both "CTA" and "SALE" purposes. Your brief asks for these to be visually distinct (`--color-accent` vs `--color-sale`). Right now a sale badge and a primary "Thêm Vào Giỏ" button read as the same color/urgency.
- **Radius scale has only two steps** (`none`, `sm`=2px) — fine for the flat/sharp aesthetic you want, but not formalized as an explicit rule anywhere, so nothing stops a future component from introducing `rounded-lg` inconsistently.
- **No formal spacing scale documented** — section vertical rhythm (`py-16`, `py-20`, etc.) is applied ad hoc per component rather than from a shared scale.
- **Header nav dropdown is a single-column hover list, not a mega-menu.** Functionally fine for now (11 hàng-hiệu categories fit in one column), but doesn't match the "mega menu" description in your brief, and doesn't scale well if more categories are added later.
- **Generic `Badge` component exists but isn't reused everywhere** — the header's cart/wishlist count bubble is hand-rolled inline markup instead of using `components/ui/Badge.tsx`. Minor inconsistency, easy fix.
- **No "new" badge on sportswear ProductCard** — only discount and low-stock badges exist. Not necessarily wrong (avoids badge clutter, which your brief also warns against), but worth a deliberate decision rather than an oversight.

## 3. Content issues

- **Shipping cost in the cart summary is a static placeholder** ("Tính ở bước thanh toán") rather than a computed value — acceptable given checkout itself is explicitly a simulated test environment (already disclosed on-screen), but flagging so it isn't mistaken for a bug later.
- **Homepage section copy is otherwise honest** — "Mới Về", "Sale", "Bán Chạy" section headings map to real distinct queries (`getNewArrivals`, `getFlashSaleProducts`, `getBestSellers`); the *data* isn't fabricated, the *page structure* is just repetitive (see C4).
- **`/authenticity` and `/lien-he` (aside from C1) already read honestly** — no invented certification process, explicitly states info is seller-provided pending a real verification process being built. No changes needed there beyond the contact-info fix.
- **Footer copy is accurate** — no fake social links (Zalo only, matching what actually exists), policy links point to real anchored sections on `/lien-he`.

## 4. SEO issues

- Homepage + both PDPs (`/san-pham/[slug]`, `/hang-hieu/[slug]`) correctly call `generateMetadata` and the relevant JSON-LD builders (`productJsonLd`/`bagProductJsonLd` + `breadcrumbJsonLd`). This part is solid.
- **Category and listing pages have no structured data at all** — `/danh-muc/[category]`, `/san-pham`, `/hang-hieu` have plain `<title>`/description metadata but no `BreadcrumbList` or `ItemList` JSON-LD.
- Sitemap and robots.txt both exist and correctly include both catalogs — no changes needed.
- `organizationJsonLd()` doesn't include a `telephone`/`address`/`contactPoint` — now that real contact info exists, this could be added for a minor SEO benefit (optional, not urgent).

## 5. Accessibility issues

- No real gaps found in this pass: icon-only buttons across Header, Drawer, ProductCard, ProductGallery, Pagination all have `aria-label`; decorative images correctly use empty `alt` + `aria-hidden` where a visible text caption already exists alongside them; real product photos use descriptive `alt={product.name}`.
- Not exhaustive — this was a targeted sample, not every icon button in the codebase was checked line-by-line.

## 6. Performance / technical constraints (not fixable by a redesign alone)

- `images.unoptimized: true` is intentional — Render's free-tier ~0.1 vCPU instance can't afford on-demand image resizing. This means no automatic WebP/AVIF conversion or responsive `srcset` generation from Next.js. Source images are served as-is from their original CDNs. This is a hosting-tier constraint, not a code defect — solving it properly requires either a paid Render tier or an external image CDN, both of which are cost decisions for you, not something to silently change.
- Cold-start latency on the free tier was already diagnosed and mitigated this session via an external UptimeRobot ping (unrelated to this redesign, just noting it's a known, already-addressed constraint).

## 7. Data-model constraints (things I will NOT invent)

To avoid fabricating fields that don't exist:

- **Sportswear `Product`** has: id, slug, name, code, brand, category, gender, price, oldPrice, stock, sizes, images, description, tags. **No** color, material, or ratings/reviews field exists.
- **`BagProduct`** (hàng-hiệu) has: id, displayId, slug, name, brand, itemCategory, condition, price, size, accessories, images, publishedAt. **No** oldPrice, stock, description, tags, gender, color, or material — these items are one-off resale pieces with no cart/checkout flow by design (contact is via Zalo instead), and the redesign will preserve that distinction rather than force-fitting a "buy now" button onto listings that were never meant to have one.

## 8. What I will NOT change

- Checkout will stay a simulated flow with its existing on-screen disclaimer — rebuilding real payment processing is a backend project, not a design pass, and is explicitly out of scope here.
- I will not add fake reviews, ratings, customer counts, or a "verified authentic" badge/process that doesn't exist.
- I will not merge the two product data models (sportswear vs. hàng-hiệu) — they're intentionally separate (one static/build-time, one live/Supabase-backed with a completely different fulfillment model).
