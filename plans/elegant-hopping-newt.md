# Mobile Redesign: Solution Section Data Flow Graphic

## Context

The "The Solution" section uses a Blueprint-style data flow visualization (`AUDataFlowVariants.tsx`). On desktop (1024px+), it looks great with SVG connections, animated particles, registration marks, and a title block. On mobile, **all visual interest is stripped away** — it becomes a plain vertical stack of full-width cards with tiny dashed-line connectors. This takes ~1000px of vertical space and looks like an unstyled list rather than an intentional mobile design.

**Goal:** Redesign the mobile graphic to feel like a purposefully designed mobile experience that retains the blueprint aesthetic, reduces vertical space by ~50%, and transitions gracefully to the existing tablet/desktop layouts.

## File to Modify

`src/pages/authority/components/AUDataFlowVariants.tsx` — contains both the `BLUEPRINT_CSS` template literal and the `Blueprint` component JSX. All changes are scoped here.

**Read-only references:**
- `src/shared/hooks/useIsMobile.ts` — import for responsive animations
- `src/pages/authority/authority.css` — design token reference

## Implementation Plan

### 1. Compact Chip Nodes in 2-Column Grid

Replace full-width stacked nodes with compact chips in a `grid-template-columns: 1fr 1fr` layout.

- Reduce node padding: `12px 14px` → `8px 10px`
- Reduce icon size: `28px` → `22px`
- Reduce font size: `13px` → `11px`
- Add `text-overflow: ellipsis` for long names
- Center the odd last child: `.bp-col .bp-node:last-child:nth-child(odd) { grid-column: 1 / -1; max-width: 50%; margin-inline: auto; }`

Sources: 5 nodes = 3 rows (2+2+1 centered). Outputs: 3 nodes = 2 rows (2+1 centered).

### 2. Retain Blueprint Chrome on Mobile

**Registration marks:** Show them on mobile but smaller (`12px` instead of `20px`, positioned at `6px` inset).

**Title block:** Show a simplified single-line version on mobile (just the title text, small and semi-transparent at bottom-right). Hide the detail cells. Restore full grid layout at 1024px.

### 3. Animated Vertical Flow Connectors

Replace the boring `__line` dashed elements with `__flow` elements — a solid subtle track with an animated particle dot traveling down it using `transform: translateY()` (GPU-composited).

Add dimension-line-style tick marks flanking the connector label for blueprint feel.

### 4. Horizontal Platform Block on Mobile

On mobile (`max-width: 767px`), make the platform block horizontal — HyprFlow and HyprStore side by side with a vertical divider. This cuts ~120px of vertical space.

Restore vertical layout at 768px+ (existing behavior).

### 5. Tighten Spacing

- Wrap padding: `32px 16px 48px` → `24px 12px 36px`
- Grid gap: `28px` → `12px`
- Restore at 768px breakpoint

### 6. Mobile-Optimized Animations

Import `useIsMobile(1024)` hook. On mobile:
- Animate nodes with `y: 8` (subtle upward fade) instead of `x: -16/+16` (horizontal slide that conflicts with grid layout)
- Shorter delays and durations for snappier feel

### 7. Breakpoint Transitions

- At **768px**: Restore larger node sizes, vertical platform layout, 2x2 grid for nodes, more padding
- At **1024px**: Full 3-column blueprint with SVG connections (unchanged from current)

## Estimated Impact

| Area | Before | After |
|------|--------|-------|
| Total height | ~1000px | ~500px |
| Visual interest | Low (plain list) | High (blueprint chrome, animated connectors, compact grid) |
| Blueprint feel | Lost on mobile | Retained at smaller scale |

## Verification

1. Run `npm run dev` and test at 320px, 375px, 414px widths
2. Check industry pages (`/property`, `/retail`, `/motor`, `/logistics`) — they use the same component with different source names; verify text truncation looks OK
3. Resize from 320px → 1024px+ to verify smooth breakpoint transitions
4. Verify `prefers-reduced-motion` still works (animations disabled)
5. Use the frontend-design skill during implementation for high design quality
