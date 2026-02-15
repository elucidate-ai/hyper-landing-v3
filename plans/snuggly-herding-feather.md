# Mobile-First Rewrite Plan

## Context

The audit (`MOBILE-AUDIT.md`) identified that the entire site is built desktop-first with `max-width` media queries. Most users are on mobile, but the CSS renders desktop layouts by default and patches them with overrides at smaller breakpoints. Multiple sections lack intermediate breakpoints (jumping from 3-4 columns directly to 1), the Data Flow blueprint has hardcoded pixel layouts that break on mobile, and several sections have zero responsive overrides. This plan converts the site to mobile-first and fixes all component-level mobile issues.

---

## Files to Modify

| File | Change Type |
|------|------------|
| `src/pages/authority/authority.css` | Full mobile-first rewrite (all 12 media query blocks) |
| `src/pages/authority/components/AUNav.tsx` | Scroll lock + close-on-click |
| `src/pages/authority/components/AUDataFlowVariants.tsx` | Mobile connector elements + CSS adjustments |
| `src/pages/authority/components/AUComparisonMatrix.tsx` | Horizontal scroll with snap + indicator dots |
| `src/shared/components/ScrollReveal.tsx` | Reduce animation intensity on mobile |
| `src/pages/authority/components/hero-graphics/IsometricBlocks.tsx` | Pause animation when off-screen |

**New file:**
| `src/shared/hooks/useIsMobile.ts` | Shared mobile detection hook (follows `useReducedMotion` pattern) |

---

## Part 1: CSS Mobile-First Conversion (`authority.css`)

### New Breakpoint System

Replace all `max-width` queries with `min-width`:

| Breakpoint | Range | Purpose |
|-----------|-------|---------|
| Default | 0-639px | Mobile (base styles) |
| `min-width: 640px` | 640-767px | Tablet portrait |
| `min-width: 768px` | 768-1023px | Tablet landscape |
| `min-width: 1024px` | 1024px+ | Desktop |

### Grid Layout Summary

| Section | Mobile (default) | 640px | 768px | 1024px |
|---------|-----------------|-------|-------|--------|
| Hero | `1fr` | -- | -- | `1fr 1fr` |
| Problem | `1fr` | -- | `repeat(2, 1fr)` | `repeat(3, 1fr)` |
| Data Flow Visual | `1fr` | -- | -- | `1fr auto 1fr` |
| Data Flow Products | `1fr` | -- | `1fr 1fr` | -- |
| Stats | `1fr` | `1fr 1fr` | -- | `repeat(4, 1fr)` |
| Testimonials | `1fr` | -- | `repeat(2, 1fr)` | `repeat(3, 1fr)` |
| Process | `1fr` | `1fr 1fr` | -- | `repeat(4, 1fr)` |
| Comparison | `1fr` (horiz scroll) | -- | -- | `repeat(3, 1fr)` |
| Security | `1fr` | `repeat(2, 1fr)` | -- | `repeat(3, 1fr)` |

### Section-by-Section Changes

**1. Design Tokens (lines 10-44)**
- Change `--au-section-pad` from `clamp(4rem, 8vw, 7rem)` to `2.5rem` as base
- Add `--au-section-pad: clamp(3rem, 6vw, 5rem)` at 768px
- Add `--au-section-pad: clamp(4rem, 7vw, 7rem)` at 1024px

**2. Nav (lines 92-202)**
- Base: toggle `display: flex`, links `display: none` (vertical panel), links gap `1rem`
- At 768px: toggle `display: none`, links `display: flex` (horizontal), gap `2.5rem`
- Add `min-height: 44px` on mobile nav links for touch targets
- Delete the `@media (max-width: 768px)` block at line 180

**3. Hero (lines 271-470)**
- Base: `min-height: auto`, `grid-template-columns: 1fr`, `gap: 2rem`, diagram `order: -1; max-width: 300px`
- At 640px: diagram `max-width: 360px`, gap `2.5rem`
- At 1024px: `min-height: 100vh`, `grid-template-columns: 1fr 1fr`, gap `4rem`, diagram order/max-width reset
- Delete the `@media (max-width: 900px)` block at line 452

**4. Problem (lines 617-743)**
- Base: `grid-template-columns: 1fr`, cards `margin-right: 0; margin-bottom: -1px`
- At 768px: `repeat(2, 1fr)`, cards `margin-right: -1px; margin-bottom: -1px` (NEW intermediate)
- At 1024px: `repeat(3, 1fr)`, cards `margin-bottom: 0`
- Delete the `@media (max-width: 768px)` block at line 734

**5. Data Flow (lines 748-954)**
- Base: visual `grid-template-columns: 1fr`, products `1fr`, arrows `rotate(90deg)`
- At 768px: products `1fr 1fr`
- At 1024px: visual `1fr auto 1fr`, arrows `transform: none`
- Delete the `@media (max-width: 768px)` block at line 932

**6. Stats (lines 959-1029)**
- Base: `1fr`, `border-right: none`, `border-bottom: 1px solid`, `text-align: left`
- At 640px: `1fr 1fr`, `text-align: center`, re-add right borders, bottom borders on first 2
- At 1024px: `repeat(4, 1fr)`, all right borders, no bottom borders
- Delete both `@media` blocks at lines 1000 and 1015
- **Note:** Stats has the most complex border cascade — test carefully at 1024px breakpoint

**7. Testimonials (lines 1034-1133)**
- Base: `1fr`, cards `margin-right: 0; margin-bottom: -1px`
- At 768px: `repeat(2, 1fr)` (NEW intermediate)
- At 1024px: `repeat(3, 1fr)`
- Delete the `@media (max-width: 768px)` block at line 1124

**8. Process (lines 1138-1272)**
- Base: `1fr`, gap `0.75rem`, step padding `1.5rem 1.25rem`
- At 640px: `1fr 1fr`, gap `1rem`, step padding `2rem 1.5rem`
- At 1024px: `repeat(4, 1fr)`
- Delete both `@media` blocks at lines 1256 and 1263

**9. Comparison (lines 1277-1453)**
- Mobile: horizontal scroll with `scroll-snap-type: x mandatory`, cards at `85vw` width
- At 1024px: standard `repeat(3, 1fr)` grid
- Add scroll indicator dot styles (hidden on desktop, flex on mobile)
- Delete the `@media (max-width: 768px)` block at line 1444

**10. Security (lines 1458-1557)**
- Base: `1fr`
- At 640px: `repeat(2, 1fr)`
- At 1024px: `repeat(3, 1fr)`
- Delete both `@media` blocks at lines 1547 and 1553

**11. Final CTA (lines 1559-1649) — NEW responsive rules**
- Base: buttons `flex-direction: column; align-items: stretch`, badges `gap: 1rem; flex-direction: column`
- At 640px: buttons `flex-direction: row`, badges `flex-direction: row; gap: 2rem`

**12. Keep `@media (prefers-reduced-motion)` block at line 1654 unchanged**

### Conversion Order
1. Design tokens (foundation — affects all sections)
2. Nav → Hero → Problem → Stats → Process → Security (structural, top-to-bottom)
3. Testimonials → Comparison → Data Flow (card-heavy sections)
4. Final CTA (new rules)
5. Cleanup: `grep "max-width" authority.css` should return zero width-based results

---

## Part 2: Component Changes

### 2A. New Hook: `src/shared/hooks/useIsMobile.ts`

Create a `useIsMobile(breakpoint = 768)` hook following the exact pattern of the existing `useReducedMotion` hook. Uses `window.matchMedia` with event listener. ~15 lines.

### 2B. Navigation Scroll Lock (`AUNav.tsx`)

- Add `useEffect` that sets `document.body.style.overflow = 'hidden'` when `open` is true, restores on close/unmount
- Add `close` callback and attach `onClick={close}` to all nav links and CTA so menu closes on navigation
- ~12 lines of changes, no new imports beyond adding `useEffect`

### 2C. Blueprint Mobile Connectors (`AUDataFlowVariants.tsx`)

- Add two `<div className="bp-mobile-connector">` elements in the JSX between the three grid columns (sources → platform → outputs)
- Each connector has a dashed vertical line + label ("DATA SYNC", "QUERY LAYER")
- Add CSS to `BLUEPRINT_CSS` string: connectors hidden on desktop, shown on mobile as `flex-direction: column` with dashed borders
- Reduce mobile padding: `padding: 32px 16px 48px`
- ~45 lines total (15 JSX + 30 CSS in the inline string)

### 2D. Comparison Horizontal Scroll (`AUComparisonMatrix.tsx`)

- Add `useRef` for scroll container, `useState` for active index, `onScroll` handler
- Add scroll indicator dots JSX below the cards container (3 dots with active state)
- CSS handles the scroll-snap behavior + dot styling (in authority.css)
- ~25 lines of component changes

### 2E. ScrollReveal Mobile Optimization (`ScrollReveal.tsx`)

- Import `useIsMobile` hook
- On mobile: cap Y offset at 16px, duration at 0.4s, delay at 0.05s
- Result: snappier, lighter animations that reduce jank on mobile
- ~10 lines of changes

### 2F. IsometricBlocks Visibility Pause (`IsometricBlocks.tsx`)

- Import `useIntersectionObserver` (already exists in `src/shared/hooks/`)
- Add `useRef` on container, gate the animation `useEffect` on `isVisible`
- Stops unnecessary animation CPU usage when hero is scrolled past
- ~10 lines of changes

---

## Implementation Sequence

1. Create `useIsMobile` hook (dependency for steps 5-6)
2. Fix `AUNav.tsx` — scroll lock + close-on-click
3. Convert `authority.css` — mobile-first rewrite (the bulk of the work)
4. Fix `AUDataFlowVariants.tsx` — mobile connectors
5. Fix `AUComparisonMatrix.tsx` — horizontal scroll
6. Fix `ScrollReveal.tsx` — mobile animation reduction
7. Fix `IsometricBlocks.tsx` — visibility pause

---

## Verification

1. **Build check:** `npm run build` — ensure no TypeScript or CSS errors
2. **Visual check at 375px:** Use browser DevTools device toolbar (iPhone SE/14) — verify each section renders single-column with appropriate spacing
3. **Visual check at 768px:** iPad portrait — verify intermediate breakpoints (2-column grids)
4. **Visual check at 1024px+:** Desktop — verify no regressions from original layout
5. **Nav test:** Open mobile menu → verify body scroll is locked → click a link → verify menu closes and scroll restores
6. **Comparison swipe test:** On mobile viewport, swipe between comparison cards → verify snap behavior and dot indicator updates
7. **Blueprint test:** On mobile, verify vertical connectors appear between data sources → platform → outputs
8. **Animation test:** Scroll through page on mobile — verify animations are snappy (16px offset, 0.4s max)
9. **`grep "max-width" authority.css`** — should return only the `prefers-reduced-motion` query (no width-based `max-width` queries remaining)
