# Mobile Fix Plan

## Context

The mobile audit identified 4 critical, 6 high, and 11 medium-severity issues degrading the mobile experience. Since most users visit on mobile devices, these fixes are urgent. This plan addresses **all CRITICAL, HIGH, and MEDIUM issues**, grouped into 7 implementation phases.

**Total issues addressed:** 4 CRITICAL + 6 HIGH + 11 MEDIUM = 21 fixes

---

## Phase 1: Performance — Static IsometricBlocks on Mobile (C1)

**Problem:** 60+ simultaneously animated SVG elements (spring physics, infinite repeats, blur filters) cause frame drops and battery drain on mobile. The diagram renders above the headline, so users see a heavy animation before the value proposition.

**Files:**
- `src/pages/authority/components/hero-graphics/IsometricBlocks.tsx`

**Approach:**
1. Import `useIsMobile` and `useReducedMotion`
2. When `isMobile || prefersReducedMotion`, render a **static assembled state**:
   - All 21 blocks at final `assembled` positions (reuse existing `isoPosition` math)
   - Plain SVG `<g>` elements — no `motion.*` wrappers
   - No DataPulse, AmbientParticles, BreathingWrapper, or phase cycling
   - Keep: connection lines, layer annotations, ground shadow (all static)
   - Keep: color gradients, cube polygon rendering
3. Desktop gets the full animated experience unchanged
4. Follows the pattern in `ScrollReveal.tsx` (lines 31-38) and `AUStatsWall.tsx`

---

## Phase 2: Touch Targets & Modal UX (C2, C3, H6)

### 2a. Comparison dot navigation — 8px to 44px hit area (C2)

**File:** `authority.css` lines 1430-1443

```css
.au-comparison__dot {
  width: 8px;
  height: 8px;
  padding: 18px;                /* was: 0 — creates 44px total hit area */
  background-clip: content-box; /* keeps visual dot at 8px */
  /* ...rest unchanged */
}
```
Also reduce gap from `0.5rem` to `0.25rem` (line 1426) to compensate for larger hit areas.

### 2b. Modal body scroll lock (C3)

**File:** `AUDiagnosticModal.tsx`

Add `useEffect` matching the pattern in `AUNav.tsx` (lines 11-14):
```tsx
useEffect(() => {
  document.body.style.overflow = open ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [open])
```
Also add `-webkit-overflow-scrolling: touch` to `.au-modal` in CSS (line 549).

### 2c. Modal option button touch targets (H6)

**File:** `authority.css` lines 610-621

```css
.au-modal__option {
  padding: 0.625rem 1.25rem;  /* was: 0.5rem 1rem */
  min-height: 44px;            /* add */
  display: inline-flex;        /* add */
  align-items: center;         /* add */
}
```

---

## Phase 3: Mobile Menu Backdrop (C4)

**Files:**
- `AUNav.tsx`
- `authority.css` ~line 132

**Approach:**
1. Add a backdrop `<div>` in `AUNav.tsx` when `open` is true:
```tsx
{open && <div className="au-nav__backdrop" onClick={close} />}
```
2. CSS:
```css
.au-nav__backdrop {
  position: fixed;
  inset: 60px 0 0;
  background: rgba(26, 26, 26, 0.4);
  z-index: 89;
}
```
3. Add `z-index: 90` to `.au-nav__links` to sit above backdrop

---

## Phase 4: Navigation & Hero Layout (H1, H2, M2, M3, M5)

### 4a. Hero headline first on mobile — remove `order: -1` (C1 addendum)

**File:** `authority.css` lines 387-396, 479-488

Remove `order: -1` from both `.au-hero__visual` and `.au-hero__diagram` at mobile. The natural DOM order will place headline + CTA first, diagram second. Desktop (1024px+) already resets to side-by-side grid so no change needed there.

### 4b. Fix hero content left padding (H1)

**File:** `authority.css` line 326-332

`.au-hero__inner` has `padding: clamp(3rem, 6vw, 6rem) 0` — horizontal `0` means no side padding. The hero sits inside `.au-container` which applies `var(--au-gutter)`, so verify the container is present. If the padding issue persists, add `padding-inline: var(--au-gutter)` to `.au-hero__inner`.

### 4c. Move nav breakpoint from 768px to 1024px (H2)

**File:** `authority.css` lines 208-227

Move the `@media (min-width: 768px)` block that hides `.au-nav__toggle` and shows `.au-nav__links` horizontally to `@media (min-width: 1024px)`. iPad portrait users get the hamburger menu.

### 4d. Hero headline sizing for small screens (M2)

**File:** `authority.css` line 362

Change: `font-size: clamp(2.5rem, 4.5vw + 0.5rem, 4rem)` → `clamp(2rem, 4.5vw + 0.5rem, 4rem)`

Drops the minimum from 40px to 32px, giving ~9-10 characters per line on 320px instead of 7-8.

### 4e. Remove `white-space: pre-line` on hero headline (M3)

**File:** `authority.css` line 368

Remove `white-space: pre-line`. On narrow screens, explicit `\n` newlines plus natural word-wrap creates awkward double-breaks. Let the browser handle line breaking naturally. If specific desktop line breaks are desired, add `white-space: pre-line` back at the 1024px breakpoint only.

### 4f. Hero diagram max-width (M5)

**File:** `authority.css` lines 387-396, 479-488, 490-497

Change `max-width: 300px` → `max-width: clamp(280px, 80vw, 360px)` for both `.au-hero__visual` and `.au-hero__diagram`. Remove the 640px breakpoint override that bumps to 360px (the clamp handles it).

---

## Phase 5: Spacing & Breakpoints (H3, H4, H5)

### 5a. Reduce section header margins on mobile (H3)

**File:** `authority.css`

Convert fixed margins to responsive `clamp()`:

| Selector | Line | Current | New |
|----------|------|---------|-----|
| `.au-problem__header` | 690 | `3.5rem` | `clamp(2rem, 5vw, 3.5rem)` |
| `.au-testimonials__header` | 1123 | `3rem` | `clamp(1.75rem, 4vw, 3rem)` |
| `.au-process__header` | 1246 | `3.5rem` | `clamp(2rem, 5vw, 3.5rem)` |
| `.au-comparison__header` | 1372 | `3rem` | `clamp(1.75rem, 4vw, 3rem)` |
| `.au-security__header` | 1592 | `3rem` | `clamp(1.75rem, 4vw, 3rem)` |
| `.au-problem__transition` | 748 | `4rem` | `clamp(2.5rem, 5vw, 4rem)` |
| `.au-dataflow__visual` | 851 | `3rem` | `clamp(2rem, 4vw, 3rem)` |
| `.au-final-cta__buttons` | 1751 | `3rem` | `clamp(2rem, 4vw, 3rem)` |

### 5b. Blueprint diagram tablet breakpoint (H4)

**File:** `AUDataFlowVariants.tsx` inline `<style>` tag

Add `768px` breakpoint between mobile (base) and desktop (1024px):
```css
@media (min-width: 768px) {
  .bp-wrap { padding: 48px 32px 56px; }
  .bp-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}
```

### 5c. Comparison cards tablet breakpoint (H5)

**File:** `authority.css` ~line 1393

At 768px, switch from carousel to 2-column grid:
```css
@media (min-width: 768px) {
  .au-comparison__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    overflow-x: visible;
  }
  .au-comparison__card { width: auto; scroll-snap-align: unset; }
  .au-comparison__dots { display: none; }
}
```

---

## Phase 6: Typography, Overflow & Accessibility (M4, M7, M8, M11)

### 6a. Fix `white-space: nowrap` on comparison metrics (M4)

**File:** `authority.css` lines 1525, 1535

Remove `white-space: nowrap` from `.au-comparison__metric-label` and `.au-comparison__metric-value`. Replace with `overflow-wrap: break-word` to prevent overflow on narrow cards.

### 6b. Ultra-small screen adjustments (M7)

**File:** `authority.css`

Add a new `@media (max-width: 360px)` block at the end of the file:
```css
@media (max-width: 360px) {
  [data-page="authority"] {
    --au-gutter: 1rem;
  }
  [data-page="authority"] .au-hero__title {
    font-size: 1.75rem;
  }
  [data-page="authority"] .au-modal {
    padding: 1.25rem;
  }
  [data-page="authority"] .au-comparison__card {
    width: 92vw;
  }
}
```

### 6c. Fix hardcoded `font-size: 16px` (M8)

**File:** `authority.css` line 39

Change `font-size: 16px` → `font-size: 1rem`. Allows users to adjust base font size via browser accessibility settings.

### 6d. Constrain SVG overflow on IsometricBlocks (M11)

**File:** `IsometricBlocks.tsx` line 506

Change `overflow: visible` → `overflow: hidden` on the SVG element. Since we're showing a static version on mobile (Phase 1), the scatter animation overflow is only relevant on desktop where the parent `.au-hero` already has `overflow: hidden`. Adding it to the SVG itself is a safety net.

---

## Phase 7: Touch States & Mobile UX (M1, M6, M9, M10)

### 7a. Remove double backdrop-filter blur (M1)

**File:** `authority.css` line 141

Remove `backdrop-filter: blur(20px)` and `-webkit-backdrop-filter: blur(20px)` from `.au-nav__links`. The parent `.au-nav` already has it, and the menu panel's 98% opacity background is effectively opaque.

### 7b. Modal padding responsive (M6)

**File:** `authority.css` line 550

Change `padding: 2.5rem` → `padding: clamp(1.5rem, 5vw, 2.5rem)`.

### 7c. Add touch/active states (M9)

Two types of hover effects need touch alternatives:

**Framer Motion `whileHover` — add `whileTap`:**
- `AUDataFlow.tsx` lines 58, 102: Add `whileTap={{ borderColor: '#1a3a5c', y: -1 }}` to the source and output node `motion.div` elements

**CSS `:hover` — add `:active` states:**
- `authority.css`: For each hover rule, add a matching `:active` rule:
  - `.au-problem__card:active` — same as hover (background change)
  - `.au-testimonial:active` — same as hover (box-shadow)
  - `.au-process__step:active` — scaled-down version of hover (translateY -1px, lighter shadow)
  - `.bp-node:active` in `AUDataFlowVariants.tsx` inline CSS — same as hover

### 7d. Testimonials horizontal carousel on mobile (M10)

**Files:**
- `AUTestimonials.tsx`
- `authority.css` testimonials section (~lines 1117-1200)

On mobile (<768px), convert from vertical stack to horizontal scroll carousel, reusing the same pattern as comparison cards:

**CSS changes:**
```css
/* Mobile-first: horizontal carousel */
.au-testimonials__grid {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 0;
}
.au-testimonials__grid::-webkit-scrollbar { display: none; }

.au-testimonial {
  flex: 0 0 85vw;
  scroll-snap-align: start;
}

/* 768px+: back to grid */
@media (min-width: 768px) {
  .au-testimonials__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    scroll-snap-type: none;
  }
  .au-testimonial {
    flex: initial;
    scroll-snap-align: unset;
  }
}
```

Add dot navigation in `AUTestimonials.tsx` (reuse the same scroll + dot pattern from `AUComparisonMatrix.tsx`): a `useRef` for the scroll container, `onScroll` handler to track active index, and dot buttons below.

---

## Files Modified Summary

| File | Phases |
|------|--------|
| `IsometricBlocks.tsx` | 1, 6d |
| `AUDiagnosticModal.tsx` | 2b |
| `AUNav.tsx` | 3 |
| `AUDataFlow.tsx` | 7c |
| `AUDataFlowVariants.tsx` | 5b, 7c |
| `AUTestimonials.tsx` | 7d |
| `authority.css` | 2a, 2c, 3, 4a-f, 5a, 5c, 6a-c, 7a, 7b, 7c, 7d |

---

## Verification

After each phase, verify with `agent-browser` at 375px and 768px:

1. **Phase 1:** 375px → static diagram, no animation. 1024px → full animation intact.
2. **Phase 2:** Open modal → body doesn't scroll behind it. Dot touch targets feel tappable. Modal option buttons ≥ 44px tall.
3. **Phase 3:** 375px hamburger → dark backdrop behind menu, tapping backdrop closes it.
4. **Phase 4:** 375px → headline appears above diagram, hero has left padding. 768px → hamburger menu (not desktop nav). Check headline wrapping on 320px.
5. **Phase 5:** 375px full-page → less whitespace between sections. 768px → blueprint 2-col, comparison 2-col grid.
6. **Phase 6:** 320px → ultra-small overrides apply, no text overflow on comparison metrics.
7. **Phase 7:** 375px → testimonials swipe horizontally with dots. Tap cards → `:active` state visible. No double blur on nav.

Final: `npm run build` to verify no TypeScript or build errors.
