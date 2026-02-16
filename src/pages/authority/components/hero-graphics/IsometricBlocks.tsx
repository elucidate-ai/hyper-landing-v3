import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../../../shared/hooks/useIntersectionObserver'
import { useIsMobile } from '../../../../shared/hooks/useIsMobile'
import { useReducedMotion } from '../../../../shared/hooks/useReducedMotion'

/* ------------------------------------------------------------------ */
/*  Block data                                                         */
/* ------------------------------------------------------------------ */

interface BlockDef {
  col: number
  row: number
  stack: number
  label?: string
  shade: number
  /** Accent blocks glow */
  accent?: boolean
}

const BLOCKS: BlockDef[] = [
  // Ground layer — Data Sources (4x3)
  { col: 0, row: 0, stack: 0, label: 'PG', shade: 0.0 },
  { col: 1, row: 0, stack: 0, label: 'MySQL', shade: 0.12 },
  { col: 2, row: 0, stack: 0, label: 'Mongo', shade: 0.25 },
  { col: 3, row: 0, stack: 0, label: 'S3', shade: 0.38 },
  { col: 0, row: 1, stack: 0, label: 'Kafka', shade: 0.5 },
  { col: 1, row: 1, stack: 0, label: 'GCS', shade: 0.62 },
  { col: 2, row: 1, stack: 0, label: 'API', shade: 0.75 },
  { col: 3, row: 1, stack: 0, label: 'SFTP', shade: 0.88 },
  { col: 0, row: 2, stack: 0, label: 'Redis', shade: 0.3 },
  { col: 1, row: 2, stack: 0, label: 'CSV', shade: 0.45 },
  { col: 2, row: 2, stack: 0, shade: 0.6 },

  // Layer 1 — Ingestion & Transform (3x2)
  { col: 0, row: 0, stack: 1, label: 'dbt', shade: 0.15, accent: true },
  { col: 1, row: 0, stack: 1, label: 'Spark', shade: 0.35, accent: true },
  { col: 2, row: 0, stack: 1, label: 'DAG', shade: 0.55, accent: true },
  { col: 0, row: 1, stack: 1, label: 'CDC', shade: 0.7, accent: true },
  { col: 1, row: 1, stack: 1, label: 'ELT', shade: 0.4, accent: true },
  { col: 2, row: 1, stack: 1, shade: 0.2 },

  // Layer 2 — Warehouse (2x2)
  { col: 0, row: 0, stack: 2, label: 'DWH', shade: 0.1, accent: true },
  { col: 1, row: 0, stack: 2, label: 'Lake', shade: 0.5, accent: true },
  { col: 0, row: 1, stack: 2, label: 'Marts', shade: 0.65, accent: true },
  { col: 1, row: 1, stack: 2, shade: 0.3 },

  // Top — Analytics capstone
  { col: 0, row: 0, stack: 3, label: 'BI', shade: 0.05, accent: true },
]

/* ------------------------------------------------------------------ */
/*  Isometric math                                                     */
/* ------------------------------------------------------------------ */

const TILE_W = 48
const TILE_H = 24
const BLOCK_H = 30

function isoPosition(col: number, row: number, stack: number) {
  return {
    x: (col - row) * TILE_W,
    y: (col + row) * TILE_H - stack * BLOCK_H,
  }
}

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const n = parseInt(hex.replace('#', ''), 16)
    return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
  }
  const ca = parse(a)
  const cb = parse(b)
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t)
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t)
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t)
  return `rgb(${r},${g},${bl})`
}

function faceColors(shade: number, accent: boolean) {
  if (accent) {
    const top = lerpColor('#3a7cc0', '#2a5a8c', shade)
    const left = lerpColor('#1e4f7a', '#1a3a5c', shade * 0.6 + 0.2)
    const right = lerpColor('#14375a', '#0d2238', shade * 0.5 + 0.3)
    return { top, left, right }
  }
  const top = lerpColor('#9aacbd', '#6d8da8', shade * 0.5)
  const left = lerpColor('#4a6a84', '#2a4a64', shade * 0.6 + 0.2)
  const right = lerpColor('#2a4a64', '#1a3048', shade * 0.5 + 0.3)
  return { top, left, right }
}

/* ------------------------------------------------------------------ */
/*  Cube polygons                                                      */
/* ------------------------------------------------------------------ */

function CubePolygons({ shade, label, accent, stack }: { shade: number; label?: string; accent?: boolean; stack?: number }) {
  const colors = faceColors(shade, !!accent)
  const w = TILE_W
  const h = TILE_H
  const bh = BLOCK_H

  const topFace = `0,${-h} ${w},0 0,${h} ${-w},0`
  const leftFace = `${-w},0 0,${h} 0,${h + bh} ${-w},${bh}`
  const rightFace = `${w},0 0,${h} 0,${h + bh} ${w},${bh}`

  // Source blocks (stack 0) get subtle table-row lines on the left face
  const isSource = stack === 0

  return (
    <g>
      <polygon points={leftFace} fill={colors.left} stroke="#0a1a2e" strokeWidth="0.5" strokeLinejoin="round" />
      <polygon points={rightFace} fill={colors.right} stroke="#0a1a2e" strokeWidth="0.5" strokeLinejoin="round" />
      <polygon points={topFace} fill={colors.top} stroke="#0a1a2e" strokeWidth="0.5" strokeLinejoin="round" />
      {/* Shine on top face */}
      <polygon points={topFace} fill="url(#top-shine)" opacity={accent ? 0.3 : 0.15} />
      {/* Data-table row lines on source blocks */}
      {isSource && label && (
        <g opacity={0.15}>
          {[0.3, 0.5, 0.7].map((t, i) => {
            const y1 = h + bh * t
            const y2 = y1
            return (
              <line
                key={i}
                x1={-w + 6}
                y1={y1}
                x2={-2}
                y2={y2}
                stroke="#c0d0dd"
                strokeWidth="0.5"
              />
            )
          })}
        </g>
      )}
      {label && (
        <text
          x={0}
          y={3}
          textAnchor="middle"
          fill={accent ? '#d0e4f5' : '#c0d0dd'}
          fontSize="8"
          fontWeight={700}
          fontFamily="'IBM Plex Mono', monospace"
          style={{ letterSpacing: '0.06em', pointerEvents: 'none' }}
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Data pulse particles — flow upward between layers                  */
/* ------------------------------------------------------------------ */

interface PulseConfig {
  startCol: number
  startRow: number
  startStack: number
  endStack: number
  delay: number
  duration: number
}

const PULSES: PulseConfig[] = [
  { startCol: 0, startRow: 0, startStack: 0, endStack: 3, delay: 0, duration: 2.5 },
  { startCol: 1, startRow: 0, startStack: 0, endStack: 2, delay: 0.8, duration: 2 },
  { startCol: 2, startRow: 0, startStack: 0, endStack: 1, delay: 1.6, duration: 1.5 },
  { startCol: 0, startRow: 1, startStack: 0, endStack: 2, delay: 0.4, duration: 2 },
  { startCol: 1, startRow: 1, startStack: 0, endStack: 2, delay: 1.2, duration: 2 },
  { startCol: 1, startRow: 0, startStack: 1, endStack: 3, delay: 2, duration: 1.8 },
  { startCol: 0, startRow: 1, startStack: 1, endStack: 2, delay: 2.5, duration: 1.2 },
  { startCol: 2, startRow: 1, startStack: 0, endStack: 1, delay: 3, duration: 1.5 },
]

function DataPulse({ config, svgCenter }: { config: PulseConfig; svgCenter: { x: number; y: number } }) {
  const start = isoPosition(config.startCol, config.startRow, config.startStack)
  const end = isoPosition(config.startCol, config.startRow, config.endStack)

  const sx = svgCenter.x + start.x
  const sy = svgCenter.y + start.y
  const ex = svgCenter.x + end.x
  const ey = svgCenter.y + end.y

  return (
    <motion.circle
      r={2.5}
      fill="#5aadee"
      filter="url(#pulse-glow)"
      initial={{ cx: sx, cy: sy, opacity: 0 }}
      animate={{
        cx: [sx, (sx + ex) / 2, ex],
        cy: [sy, (sy + ey) / 2 - 10, ey],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'easeInOut',
        times: [0, 0.4, 0.7, 1],
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Floating ambient particles                                         */
/* ------------------------------------------------------------------ */

interface AmbientDot {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function useAmbientDots(count: number): AmbientDot[] {
  return useMemo(() => {
    const dots: AmbientDot[] = []
    for (let i = 0; i < count; i++) {
      dots.push({
        x: 40 + Math.random() * 400,
        y: 40 + Math.random() * 400,
        size: 1 + Math.random() * 1.5,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })
    }
    return dots
  }, [count])
}

function AmbientParticles({ dots }: { dots: AmbientDot[] }) {
  return (
    <g>
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.size}
          fill="#5aadee"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated block wrapper                                             */
/* ------------------------------------------------------------------ */

function scatterOffset(i: number) {
  const angle = ((i * 137.5 + 40) % 360) * (Math.PI / 180)
  const dist = 220 + (i % 4) * 50
  return {
    x: Math.cos(angle) * dist * 0.7,
    y: -Math.abs(Math.sin(angle)) * dist - 80,
  }
}

function AnimatedBlock({
  block,
  index,
  svgCenter,
  phase,
}: {
  block: BlockDef
  index: number
  svgCenter: { x: number; y: number }
  phase: 'assembling' | 'assembled' | 'scattering'
}) {
  const pos = isoPosition(block.col, block.row, block.stack)
  const finalX = svgCenter.x + pos.x
  const finalY = svgCenter.y + pos.y
  const scatter = scatterOffset(index)
  // Stagger: bottom-up by stack, then by grid position
  const staggerDelay = block.stack * 0.25 + index * 0.06

  const variants = {
    offscreen: {
      x: finalX + scatter.x,
      y: finalY + scatter.y,
      opacity: 0,
      scale: 0.6,
      rotate: (index % 2 === 0 ? 1 : -1) * (10 + (index % 5) * 4),
    },
    assembled: {
      x: finalX,
      y: finalY,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
        mass: 0.9,
        delay: staggerDelay,
      },
    },
    scatterOut: {
      x: finalX + scatter.x * 1.3,
      y: finalY + scatter.y * 1.4,
      opacity: 0,
      scale: 0.5,
      rotate: (index % 2 === 0 ? -1 : 1) * 15,
      transition: {
        type: 'tween' as const,
        duration: 0.6,
        ease: [0.55, 0, 1, 0.45] as [number, number, number, number],
        delay: (BLOCKS.length - 1 - index) * 0.03,
      },
    },
  }

  const currentVariant =
    phase === 'scattering' ? 'scatterOut' : 'assembled'

  return (
    <motion.g
      initial="offscreen"
      animate={currentVariant}
      variants={variants}
      style={{ originX: '0px', originY: '0px' }}
    >
      <CubePolygons shade={block.shade} label={block.label} accent={block.accent} stack={block.stack} />
    </motion.g>
  )
}

/* ------------------------------------------------------------------ */
/*  Connection lines between layers                                    */
/* ------------------------------------------------------------------ */

function ConnectionLines({ svgCenter, visible }: { svgCenter: { x: number; y: number }; visible: boolean }) {
  // Draw faint vertical connection lines from ground to layer 1
  const connections = [
    { col: 0, row: 0, fromStack: 0, toStack: 1 },
    { col: 1, row: 0, fromStack: 0, toStack: 1 },
    { col: 2, row: 0, fromStack: 0, toStack: 1 },
    { col: 0, row: 0, fromStack: 1, toStack: 2 },
    { col: 1, row: 0, fromStack: 1, toStack: 2 },
    { col: 0, row: 0, fromStack: 2, toStack: 3 },
  ]

  return (
    <g>
      {connections.map((c, i) => {
        const from = isoPosition(c.col, c.row, c.fromStack)
        const to = isoPosition(c.col, c.row, c.toStack)
        return (
          <motion.line
            key={i}
            x1={svgCenter.x + from.x}
            y1={svgCenter.y + from.y}
            x2={svgCenter.x + to.x}
            y2={svgCenter.y + to.y}
            stroke="#5aadee"
            strokeWidth={0.75}
            strokeDasharray="3 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 0.2 : 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        )
      })}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Layer annotations                                                  */
/* ------------------------------------------------------------------ */

const LAYER_LABELS = [
  { stack: 0, text: 'SOURCES', col: -0.6, row: 2.6 },
  { stack: 1, text: 'TRANSFORM', col: -0.6, row: 1.6 },
  { stack: 2, text: 'WAREHOUSE', col: -0.4, row: 1.2 },
  { stack: 3, text: 'ANALYTICS', col: -0.3, row: 0.4 },
]

function LayerAnnotations({
  svgCenter,
  visible,
}: {
  svgCenter: { x: number; y: number }
  visible: boolean
}) {
  return (
    <g>
      {LAYER_LABELS.map((l, i) => {
        const pos = isoPosition(l.col, l.row, l.stack)
        return (
          <motion.text
            key={i}
            x={svgCenter.x + pos.x}
            y={svgCenter.y + pos.y + 8}
            textAnchor="end"
            fill="#5aadee"
            fontSize="6.5"
            fontWeight={600}
            fontFamily="'IBM Plex Mono', monospace"
            style={{ letterSpacing: '0.12em', pointerEvents: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 0.55 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          >
            {l.text}
          </motion.text>
        )
      })}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Breathing wrapper                                                  */
/* ------------------------------------------------------------------ */

function BreathingWrapper({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.g
      animate={active ? { y: [0, -3, 0, 2, 0] } : { y: 0 }}
      transition={active ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.1 }}
    >
      {children}
    </motion.g>
  )
}

/* ------------------------------------------------------------------ */
/*  Static block for mobile / reduced-motion                           */
/* ------------------------------------------------------------------ */

function StaticBlock({
  block,
  svgCenter,
}: {
  block: BlockDef
  svgCenter: { x: number; y: number }
}) {
  const pos = isoPosition(block.col, block.row, block.stack)
  return (
    <g transform={`translate(${svgCenter.x + pos.x}, ${svgCenter.y + pos.y})`}>
      <CubePolygons shade={block.shade} label={block.label} accent={block.accent} stack={block.stack} />
    </g>
  )
}

function StaticConnectionLines({ svgCenter }: { svgCenter: { x: number; y: number } }) {
  const connections = [
    { col: 0, row: 0, fromStack: 0, toStack: 1 },
    { col: 1, row: 0, fromStack: 0, toStack: 1 },
    { col: 2, row: 0, fromStack: 0, toStack: 1 },
    { col: 0, row: 0, fromStack: 1, toStack: 2 },
    { col: 1, row: 0, fromStack: 1, toStack: 2 },
    { col: 0, row: 0, fromStack: 2, toStack: 3 },
  ]

  return (
    <g>
      {connections.map((c, i) => {
        const from = isoPosition(c.col, c.row, c.fromStack)
        const to = isoPosition(c.col, c.row, c.toStack)
        return (
          <line
            key={i}
            x1={svgCenter.x + from.x}
            y1={svgCenter.y + from.y}
            x2={svgCenter.x + to.x}
            y2={svgCenter.y + to.y}
            stroke="#5aadee"
            strokeWidth={0.75}
            strokeDasharray="3 4"
            opacity={0.2}
          />
        )
      })}
    </g>
  )
}

function StaticLayerAnnotations({ svgCenter }: { svgCenter: { x: number; y: number } }) {
  return (
    <g>
      {LAYER_LABELS.map((l, i) => {
        const pos = isoPosition(l.col, l.row, l.stack)
        return (
          <text
            key={i}
            x={svgCenter.x + pos.x}
            y={svgCenter.y + pos.y + 8}
            textAnchor="end"
            fill="#5aadee"
            fontSize="6.5"
            fontWeight={600}
            fontFamily="'IBM Plex Mono', monospace"
            style={{ letterSpacing: '0.12em', pointerEvents: 'none' }}
            opacity={0.55}
          >
            {l.text}
          </text>
        )
      })}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const CYCLE_ASSEMBLED = 4
const CYCLE_SCATTERED = 0.8

export function IsometricBlocks() {
  const isMobile = useIsMobile(1024)
  const prefersReducedMotion = useReducedMotion()
  const isStatic = isMobile || prefersReducedMotion

  const [phase, setPhase] = useState<'assembling' | 'assembled' | 'scattering'>('assembling')
  const ambientDots = useAmbientDots(isStatic ? 0 : 16)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 })

  useEffect(() => {
    if (!isVisible || isStatic) return

    let timeout: ReturnType<typeof setTimeout>

    function cycle() {
      setPhase('assembling')
      const assemblyDuration = BLOCKS.length * 0.06 + 3 * 0.25 + 1.2
      timeout = setTimeout(() => {
        setPhase('assembled')
        timeout = setTimeout(() => {
          setPhase('scattering')
          const scatterDuration = BLOCKS.length * 0.03 + 0.6 + CYCLE_SCATTERED
          timeout = setTimeout(cycle, scatterDuration * 1000)
        }, CYCLE_ASSEMBLED * 1000)
      }, assemblyDuration * 1000)
    }

    cycle()
    return () => clearTimeout(timeout)
  }, [isVisible, isStatic])

  const vbWidth = 480
  const vbHeight = 480
  const svgCenter = { x: vbWidth / 2 + 10, y: vbHeight / 2 + 20 }

  /* ── Static render for mobile / reduced-motion ── */
  if (isStatic) {
    return (
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: 480,
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox={`0 0 ${vbWidth} ${vbHeight}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ overflow: 'hidden' }}
        >
          <defs>
            <linearGradient id="top-shine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="ground-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Faint isometric grid lines */}
          <g opacity="0.04">
            {Array.from({ length: 9 }, (_, i) => {
              const startY = 100 + i * 35
              return (
                <line key={`grid-${i}`} x1={40} y1={startY} x2={440} y2={startY} stroke="#1a3a5c" strokeWidth="0.5" />
              )
            })}
          </g>

          <StaticConnectionLines svgCenter={svgCenter} />
          <StaticLayerAnnotations svgCenter={svgCenter} />

          {/* Ground shadow */}
          <ellipse
            cx={svgCenter.x}
            cy={svgCenter.y + 100}
            rx={140}
            ry={22}
            fill="#1a3a5c"
            filter="url(#ground-shadow)"
            opacity={0.12}
          />

          {/* All blocks at assembled positions */}
          <g>
            {BLOCKS.map((block) => (
              <StaticBlock
                key={`${block.col}-${block.row}-${block.stack}`}
                block={block}
                svgCenter={svgCenter}
              />
            ))}
          </g>
        </svg>
      </div>
    )
  }

  /* ── Animated render for desktop ── */
  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: 480,
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ overflow: 'hidden' }}
      >
        <defs>
          {/* Shine gradient for top faces */}
          <linearGradient id="top-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for data pulses */}
          <filter id="pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow filter for ground */}
          <filter id="ground-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient floating particles */}
        <AmbientParticles dots={ambientDots} />

        {/* Faint isometric grid lines */}
        <g opacity="0.04">
          {Array.from({ length: 9 }, (_, i) => {
            const startY = 100 + i * 35
            return (
              <line
                key={`grid-${i}`}
                x1={40}
                y1={startY}
                x2={440}
                y2={startY}
                stroke="#1a3a5c"
                strokeWidth="0.5"
              />
            )
          })}
        </g>

        {/* Connection lines */}
        <ConnectionLines svgCenter={svgCenter} visible={phase === 'assembled'} />

        {/* Layer annotations */}
        <LayerAnnotations svgCenter={svgCenter} visible={phase === 'assembled'} />

        {/* Ground shadow */}
        <motion.ellipse
          cx={svgCenter.x}
          cy={svgCenter.y + 100}
          rx={140}
          ry={22}
          fill="#1a3a5c"
          filter="url(#ground-shadow)"
          animate={{
            opacity: phase === 'assembled' ? 0.12 : 0.04,
            rx: phase === 'assembled' ? 140 : 90,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Blocks */}
        <BreathingWrapper active={phase === 'assembled'}>
          {BLOCKS.map((block, i) => (
            <AnimatedBlock
              key={`${block.col}-${block.row}-${block.stack}`}
              block={block}
              index={i}
              svgCenter={svgCenter}
              phase={phase}
            />
          ))}
        </BreathingWrapper>

        {/* Data pulses — only visible when assembled */}
        {phase === 'assembled' && (
          <g>
            {PULSES.map((config, i) => (
              <DataPulse key={i} config={config} svgCenter={svgCenter} />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}
