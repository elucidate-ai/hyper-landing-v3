# Mobile-First Comparison Table Redesign

## Context

The current mobile comparison layout (≤767px) crams 3 approach columns side-by-side in tiny cards, resulting in 9px font sizes, truncated values (e.g. "Guaranteed or you don't pay"), and poor readability. This plan replaces the mobile layout with a **tab-based approach switcher** — the standard mobile pattern for comparison/pricing tables — while leaving the desktop table untouched.

## Approach: Tab-Based Switcher

**Why tabs over alternatives:**
- **vs Stacked cards:** 3 approaches × 6 metrics = ~1200px of scrolling with no ability to compare
- **vs Swipeable cards:** The page already has a horizontal scroll carousel (testimonials) — a second swipe pattern creates UX confusion
- **vs Accordions:** 6 taps minimum to see everything; fragments the mental model

**The design:** A segmented control at top with 3 tabs (Hypr highlighted as navy, others neutral). Tapping a tab reveals that approach's 6 metrics as a full-width vertical list with generous typography. Animated transitions between panels using Framer Motion.

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/authority/components/AUComparisonMatrix.tsx` | Replace mobile JSX (lines 77-113) with tab-based layout |
| `src/pages/authority/authority.css` | Replace mobile CSS (lines 2088-2233) with new tab styles |

## Implementation Details

### 1. Component Changes (`AUComparisonMatrix.tsx`)

**Add imports:**
- `useState` from React
- `motion`, `AnimatePresence` from Framer Motion (pattern from `AUContactModal.tsx`)
- `useReducedMotion` from shared hooks

**Add state:**
```tsx
const [activeTab, setActiveTab] = useState(() => {
  const hlIndex = approaches.findIndex(a => a.highlighted)
  return hlIndex >= 0 ? hlIndex : 0
})
const reducedMotion = useReducedMotion()
```

**Replace mobile JSX with:**
- Segmented control (`role="tablist"`) with 3 tab buttons
- `AnimatePresence mode="wait"` wrapping a `motion.div` panel (`role="tabpanel"`)
- Panel shows: tagline header + `<ul>` of 6 metric items (icon + label + full-width value)
- Keyboard nav handler for arrow keys (roving tabindex pattern)

### 2. CSS Changes (`authority.css`)

**Remove:** All existing `.au-comparison__mobile-*` classes (lines 2088-2233)

**Add new classes:**
- `.au-comparison__tabs` — flex container with `var(--au-border-light)` background, 2px gap, 2px padding
- `.au-comparison__tab` — `flex: 1`, 44px min-height touch target, transparent default
- `.au-comparison__tab--active` — white bg with subtle shadow; when `--hl`: navy bg with white text
- `.au-comparison__tab-badge` — "Recommended" in mono uppercase (only on active highlighted tab)
- `.au-comparison__panel` — bordered card; `--hl` variant gets navy top border
- `.au-comparison__panel-header` — tagline in mono on light bg
- `.au-comparison__metric-list` / `__metric-item` — full-width list with icon + label + value per row
- `.au-comparison__metric-value` — **1rem font** (up from 0.8125rem cramped columns); navy + bold for highlighted

### 3. Animations
- Panel switch: 200ms fade+slide (`y: 8` in, `y: -8` out) via `AnimatePresence`
- Easing: `[0.25, 0.1, 0.25, 1]` — same as `ScrollReveal` and `AUContactModal`
- Respects `prefers-reduced-motion` via `useReducedMotion()` hook

### 4. Accessibility
- Full WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"` with `aria-selected`/`aria-controls`, `role="tabpanel"` with `aria-labelledby`
- Roving tabindex + arrow key navigation (Left/Right/Home/End)
- 44px minimum touch targets
- Focus ring via existing global rule
- Color contrast: all combinations exceed WCAG AA

### 5. Design System Consistency
- Uses existing CSS variables throughout (--au-navy, --au-bg-alt, --au-border-light, --au-radius, etc.)
- Typography: Plus Jakarta Sans for values, Inter for labels, IBM Plex Mono for taglines
- Border radius: `var(--au-radius)` (2px) — no rounded corners
- Navy highlight treatment matches desktop table column

## Verification
1. Run dev server (`npm run dev`) and test on mobile viewports: 320px, 375px, 414px
2. Verify tab switching works with tap and keyboard (arrow keys, Enter/Space)
3. Verify "Recommended" badge appears only on highlighted tab when active
4. Verify long values like "Guaranteed or you don't pay" display without truncation
5. Verify desktop table is completely unaffected (resize to >768px)
6. Test all industry routes (`/retail`, `/property`, `/motor`, `/logistics`) — they use the same component with different data via ContentContext
7. Check `prefers-reduced-motion` — animations should be disabled
8. Use the **frontend-design skill** during implementation for high design quality
