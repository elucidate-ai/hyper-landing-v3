import './authority.css'
import { SkipToContent } from '../../shared/components/SkipToContent'
import { AUNav } from './components/AUNav'
import { AUHero } from './components/AUHero'
import { AUProblem } from './components/AUProblem'
import { AUDataFlow } from './components/AUDataFlow'
import { AUStatsWall } from './components/AUStatsWall'
import { AUTestimonials } from './components/AUTestimonials'
import { AUProcess } from './components/AUProcess'
import { AUComparisonMatrix } from './components/AUComparisonMatrix'
import { AUSecurity } from './components/AUSecurity'
import { AUFinalCta } from './components/AUFinalCta'

export default function AuthorityPage() {
  return (
    <div data-page="authority">
      <SkipToContent />

      <AUNav />

      <main id="main-content">
        <AUHero />

        <AUProblem />

        <AUDataFlow />

        <AUStatsWall />

        <AUTestimonials />

        <AUProcess />

        <AUComparisonMatrix />

        <AUSecurity />

        <AUFinalCta />
      </main>
    </div>
  )
}
