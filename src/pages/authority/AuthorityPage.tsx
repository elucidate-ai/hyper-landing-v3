import { useState } from 'react'
import './authority.css'
import { SkipToContent } from '../../shared/components/SkipToContent'
import { AUNav } from './components/AUNav'
import { AUHero } from './components/AUHero'
import { AUProblem } from './components/AUProblem'
import { AUDataFlowVariants } from './components/AUDataFlowVariants'
import { AUStatsWall } from './components/AUStatsWall'
import { AUTestimonials } from './components/AUTestimonials'
import { AUProcess } from './components/AUProcess'
import { AUComparisonMatrix } from './components/AUComparisonMatrix'
import { AUSecurity } from './components/AUSecurity'
import { AUFinalCta } from './components/AUFinalCta'
import { AUContactModal } from './components/AUContactModal'

export default function AuthorityPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div data-page="authority">
      <SkipToContent />

      <AUNav />

      <main id="main-content">
        <AUHero onOpenContact={() => setContactOpen(true)} />

        <AUProblem />

        <AUDataFlowVariants />

        <AUStatsWall />

        <AUTestimonials />

        <AUProcess />

        <AUComparisonMatrix />

        <AUSecurity />

        <AUFinalCta onOpenContact={() => setContactOpen(true)} />
      </main>

      <AUContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  )
}
