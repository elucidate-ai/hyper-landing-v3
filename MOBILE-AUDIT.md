# Mobile Compatibility Audit -- Hyper Landing Page

**Date:** 2026-02-16
**Viewports tested:** 375px (iPhone SE), 768px (iPad portrait)
**Site:** `http://localhost:5173` (Authority landing page)
**Screenshots:** `./mobile-audit-screenshots/`

---

## Executive Summary

The site has a **mobile-first CSS architecture** with `min-width` breakpoints (640px, 768px, 1024px), and many sections correctly collapse to single-column layouts on mobile. However, there are **critical performance issues**, **UX problems**, and **spacing/layout concerns** that significantly degrade the mobile experience. Since most users will be on mobile, these issues need to be addressed urgently.

### Severity Overview

| Severity | Count | Description |
|----------|-------|-------------|
| **CRITICAL** | 4 | Performance blockers, unusable touch targets, broken modal UX |
| **HIGH** | 6 | Missing tablet breakpoints, excessive spacing, nav/menu issues |
| **MEDIUM** | 11 | Typography, animation performance, missing touch states |
| **LOW** | 15+ | Polish, hover states, minor spacing |

---

## CRITICAL Issues (P0 -- Must Fix)

### C1. IsometricBlocks SVG: 60+ Animated Elements on Mobile
**File:** `src/pages/authority/components/hero-graphics/IsometricBlocks.tsx`

The hero graphic renders **~60+ simultaneously animated SVG elements** on mobile with zero performance reduction:
- 26 blocks with spring physics animations (scale, rotate, x, y, opacity)
- 8 data pulse particles with infinite `repeat` animations
- 16 ambient floating particles with infinite opacity animations
- 6 connection lines, 4 annotation texts, 1 animated shadow ellipse
- Continuous assemble -> scatter -> reassemble cycle via nested `setTimeout` chains
- SVG `feGaussianBlur` filters on animated elements (extremely expensive on mobile Safari)

**Impact:** Frame drops, jank, and significant battery drain on mobile devices. The component uses `useIntersectionObserver` but does **NOT** use `useIsMobile()` or `useReducedMotion()` to reduce animation complexity.

**Additionally:** The diagram appears **ABOVE** the headline on mobile (`order: -1` in CSS line 479), meaning the user's first experience is a heavy animated graphic instead of the value proposition headline.

---

### C2. Comparison Dot Navigation: 8x8px Touch Targets
**File:** `authority.css` lines 1430-1438
**Component:** `AUComparisonMatrix.tsx` line 90-95

The comparison section's dot navigation buttons are `width: 8px; height: 8px` with no padding. These are `<button>` elements that users must tap to navigate between comparison cards. At 8x8px, they are **5.5x below** the WCAG/Apple-recommended 44x44px minimum touch target.

---

### C3. Diagnostic Modal: No Body Scroll Lock
**File:** `src/pages/authority/components/AUDiagnosticModal.tsx`

When the diagnostic modal opens, there is no `document.body.style.overflow = 'hidden'` implementation. On mobile:
- The background page scrolls freely behind the modal overlay
- Accidental scroll-then-tap on the overlay dismisses the modal
- No `-webkit-overflow-scrolling: touch` on the modal's internal scroll area (`authority.css` line 549)

---

### C4. Mobile Menu: No Background Overlay
**Observed at:** 375px viewport (screenshot: `375-17-mobile-menu-open.png`)

When the hamburger menu opens, there is no opaque/semi-opaque backdrop. The page content (including the animated isometric blocks) is fully visible and interactive behind the menu items, creating visual confusion and making the menu items hard to read against the background content.

---

## HIGH Issues (P1 -- Should Fix)

### H1. Hero Content Has Zero Left Padding on Mobile
**Observed at:** 375px viewport (screenshots: `375-01-nav-hero.png`, `375-02-hero-cta.png`)

The hero headline, subheadline, and CTA buttons appear flush against the left edge of the screen at 375px. The `--au-gutter` variable uses `clamp(1.25rem, 4vw, 3rem)` but doesn't appear to be applied to the hero content container, or is being overridden.

---

### H2. Navigation Shows Desktop Layout at 768px
**Observed at:** 768px viewport (screenshot: `768-01-nav-hero.png`)

At exactly 768px (iPad portrait), the nav shows the full desktop horizontal link bar (Solutions, Results, Process, Security, BOOK A CALL) instead of the hamburger menu. iPad portrait users should get the mobile navigation since the links are cramped and the CTA button competes for space.

---

### H3. Excessive Vertical Whitespace on Mobile
**Observed at:** Both viewports in full-page screenshots

Multiple sections have large fixed margins/paddings that create excessive whitespace on mobile:

| Element | Size | Location |
|---------|------|----------|
| `--au-section-pad` | `2.5rem` (40px top + 40px bottom per section) | authority.css:33 |
| `.au-problem__header` margin-bottom | `3.5rem` (56px) | authority.css:690 |
| `.au-testimonials__header` margin-bottom | `3rem` (48px) | authority.css:1123 |
| `.au-process__header` margin-bottom | `3.5rem` (56px) | authority.css:1246 |
| `.au-comparison__header` margin-bottom | `3rem` (48px) | authority.css:1372 |
| `.au-security__header` margin-bottom | `3rem` (48px) | authority.css:1592 |
| `.au-problem__transition` margin-top | `4rem` (64px) | authority.css:748 |
| `.au-dataflow__visual` margin-top | `3rem` (48px) | authority.css:851 |
| `.au-final-cta__buttons` margin-bottom | `3rem` (48px) | authority.css:1751 |

The cumulative effect is a very long page with disproportionate empty space between content sections. These should use responsive values (e.g., `clamp(1.5rem, 3vw, 3.5rem)`) or explicit mobile overrides.

---

### H4. Blueprint Diagram Lacks Tablet Breakpoint
**File:** `AUDataFlowVariants.tsx` (inline CSS lines 430-471)

The blueprint data flow diagram only has two states:
- Mobile: single column (`1fr`)
- Desktop at 1024px: 3-column grid (`220px 1fr 200px`)

On tablets (768-1023px), the diagram shows as a single narrow column with substantial wasted horizontal space on either side.

---

### H5. Comparison Cards: No Tablet Breakpoint
**File:** `authority.css` lines 1393-1571

Below 1024px: horizontal scroll carousel. Above 1024px: 3-column grid. On tablets (768-1023px), the carousel pattern is unexpected -- users expect to see a side-by-side comparison at that screen width.

---

### H6. Modal Option Buttons Below 44px Touch Target
**File:** `authority.css` lines 610-621

Modal option buttons (`.au-modal__option`) have `padding: 0.5rem 1rem` with `font-size: 0.8125rem`, resulting in ~32-36px computed height. No `min-height: 44px` is set. These are primary interactive elements users must tap to complete the diagnostic form.

---

## MEDIUM Issues (P2 -- Should Address)

### M1. Double Backdrop-Filter Blur Layers
**File:** `authority.css` lines 111-112, 141

Both the nav (`.au-nav`) and mobile menu (`.au-nav__links`) use `backdrop-filter: blur(20px)`. Two overlapping blur layers compound GPU cost and cause frame drops during scroll on lower-end mobile devices.

### M2. Hero Headline Too Large for Small Screens
**File:** `authority.css` line 362

`font-size: clamp(2.5rem, 4.5vw + 0.5rem, 4rem)` -- the 2.5rem (40px) minimum is very large on 320px screens. Each line only fits 7-8 characters, causing tight word wrapping.

### M3. `white-space: pre-line` on Hero Headline
**File:** `authority.css` line 368

Preserves authored newlines (`\n` in the content string). On narrow screens, this creates awkward line breaks when text wraps at both the explicit newline and the container edge.

### M4. `white-space: nowrap` on Comparison Metrics
**File:** `authority.css` lines 1525, 1535

Both `.au-comparison__metric-label` and `.au-comparison__metric-value` use `white-space: nowrap`. If combined label + value exceeds card width, content overflows.

### M5. Hero Diagram max-width Wastes Space
**File:** `authority.css` lines 394, 486

`.au-hero__visual` and `.au-hero__diagram` both constrain to `max-width: 300px` on mobile. On phones wider than 300px (i.e., all modern phones), this leaves unused horizontal space. The jump to 360px at 640px is abrupt.

### M6. Modal Padding Too Generous on Mobile
**File:** `authority.css` line 550

`padding: 2.5rem` (40px) on `.au-modal` leaves only 240px of content width on 320px screens. Should use `clamp(1.25rem, 4vw, 2.5rem)`.

### M7. No Ultra-Small Screen Adjustments
**File:** `authority.css`

No `@media (max-width: 360px)` overrides for iPhone SE (320px) or Galaxy Fold (280px).

### M8. Fixed `font-size: 16px` on Root Element
**File:** `authority.css` line 39

Hardcoded `font-size: 16px` prevents users from adjusting base font size via browser accessibility settings. Should be `1rem` or omitted.

### M9. `whileHover` Effects Invisible on Touch Devices
**Files:** `AUDataFlow.tsx`, `AUDataFlowVariants.tsx`, `AUProblem.tsx`, `AUTestimonials.tsx`, `AUProcess.tsx`

Framer Motion `whileHover` and CSS `:hover` effects (border changes, translateY lifts, box shadows) don't trigger on touch devices. No `whileTap` or `:active` alternatives are provided.

### M10. Testimonials Section Very Tall on Mobile
**Component:** `AUTestimonials.tsx`

Three testimonials (2-3 sentences each) stack vertically, creating ~1500-2000px of content. A horizontal carousel (like comparison cards) would be more mobile-friendly.

### M11. SVG `overflow: visible` on IsometricBlocks
**File:** `IsometricBlocks.tsx` line 506

The SVG has `overflow: visible` while blocks scatter 220-420px beyond the viewBox during animation. The parent `.au-hero` has `overflow: hidden`, but intermediate containers could expose overflow.

---

## LOW Issues (P3 -- Polish)

| # | Issue | Location |
|---|-------|----------|
| L1 | `transition: all 0.2s ease` on `.au-btn` -- performance anti-pattern | authority.css:251 |
| L2 | Hover `:hover` states stick on mobile after tap (z-index, box-shadow, transforms) | Multiple components |
| L3 | No `touch-action: pan-x` on comparison scroll carousel | authority.css |
| L4 | `scroll-behavior: smooth` can feel janky on mobile Safari | index.css:15 |
| L5 | `text-rendering: optimizeLegibility` causes minor rendering cost on Android | index.css:26 |
| L6 | Dead CSS: `.au-hero__visual` styles unused (component uses `.au-hero__diagram`) | authority.css:387-401 |
| L7 | GSAP counter animation (2s duration) not shortened on mobile | AUStatsWall.tsx |
| L8 | DataFlow infinite arrow animations not disabled on mobile | AUDataFlow.tsx |
| L9 | `useIsMobile` breakpoint at 768px excludes iPads in portrait from mobile optimizations | useIsMobile.ts |
| L10 | No landscape-specific `@media (orientation: landscape)` adjustments | authority.css |
| L11 | Security card watermark `font-size: 7rem` disproportionate on small cards | authority.css:1641 |
| L12 | ~470 lines of inline CSS in a `<style>` tag in DataFlowVariants | AUDataFlowVariants.tsx |
| L13 | No `-webkit-overflow-scrolling: touch` on modal scroll area | authority.css:549 |
| L14 | Comparison card `85vw` width shows only ~28px of next card -- weak scroll affordance | authority.css:1407 |
| L15 | Process/Problem/Security cards lack touch `:active` states | authority.css |

---

## What's Working Well

These aspects of mobile are correctly implemented:

- Mobile-first CSS architecture with `min-width` breakpoints (640px, 768px, 1024px)
- Problem cards collapse to single column
- Stats wall stacks to single column
- Security cards stack to single column
- Process steps stack to single column
- Comparison cards use scroll-snap horizontal carousel
- CTA buttons stack vertically on mobile with full-width stretch
- Nav hamburger menu appears below 768px
- ScrollReveal correctly caps animation intensity on mobile (reduced y offset, shorter duration/delay)
- Reduced motion support via `prefers-reduced-motion` media query
- Touch targets on nav links and CTA buttons meet 44px minimum (`min-height: 44px/48px`)
- Global CSS reset prevents image/SVG overflow (`max-width: 100%`)
- Responsive gutter uses `clamp(1.25rem, 4vw, 3rem)`
- Body scroll lock on mobile nav menu (in `AUNav.tsx`)
- `overflow-wrap: break-word` on all headings (index.css)

---

## Recommended Fix Priority

### Immediate (Performance + Usability)
1. **Reduce/disable IsometricBlocks animations on mobile** -- biggest performance win. Use `useIsMobile()` to show a static or simplified graphic on phones.
2. **Enlarge comparison dot touch targets** to 44px minimum hit area (can keep 8px visual size with padding).
3. **Add body scroll lock to diagnostic modal** (`document.body.style.overflow = 'hidden'`).
4. **Add semi-opaque background overlay to mobile menu**.

### Short-term (Layout + Spacing)
5. **Fix hero content left padding** to ensure gutter is applied.
6. **Reduce section header margins on mobile** using responsive values.
7. **Add tablet breakpoint (768px) for blueprint diagram and comparison cards**.
8. **Increase modal option button touch targets** to 44px minimum.

### Medium-term (UX + Polish)
9. **Address typography sizing for ultra-small screens** (<360px).
10. **Replace `whileHover` with `whileTap` on touch devices** for interactive feedback.
11. **Consider testimonials carousel** on mobile instead of vertical stack.
12. **Reduce `backdrop-filter: blur()` intensity** on mobile or remove second blur layer.

---

## Screenshots Reference

All screenshots are in `./mobile-audit-screenshots/`:

### 375px (iPhone SE)
| File | Description |
|------|-------------|
| `375-full-page.png` | Full page -- shows overall layout and spacing gaps |
| `375-01-nav-hero.png` | Nav hamburger + hero (diagram above text, no left padding) |
| `375-02-hero-cta.png` | Hero text and CTA area |
| `375-03-below-hero.png` | Hero CTAs + problem section start |
| `375-04-problem-cards.png` | Problem cards -- single column, working correctly |
| `375-05-problem-bridge.png` | Problem bridge text + third card |
| `375-06-solution-header.png` | Solution section header + data sources list |
| `375-07-dataflow-diagram.png` | Data flow (HyperFlow/HyperStore + outputs) |
| `375-08-product-cards.png` | Product cards + stats start |
| `375-09-stats.png` | Stats wall + testimonials heading (large gap visible) |
| `375-10-testimonials.png` | Testimonial cards stacked |
| `375-11-process.png` | Process section heading |
| `375-12-process-cards.png` | Process step cards -- single column |
| `375-13-comparison.png` | Comparison cards with horizontal scroll + dots |
| `375-14-security.png` | Security cards -- single column |
| `375-15-security-cta.png` | Security cards continued |
| `375-16-cta.png` | Final CTA section |
| `375-17-mobile-menu-open.png` | **Mobile menu open -- no backdrop overlay** |

### 768px (iPad Portrait)
| File | Description |
|------|-------------|
| `768-full-page.png` | Full page -- desktop nav visible, spacing issues |
| `768-01-nav-hero.png` | **Desktop nav at tablet width**, hero flush left |
| `768-03-problem-area.png` | Problem bridge + solution section |
| `768-04-stats-testimonials.png` | Data flow diagram at tablet |
| `768-05-stats.png` | Testimonials (2-col with orphaned 3rd) + process |
| `768-06-process.png` | Process cards (2-col) + comparison carousel |
