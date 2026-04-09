import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import type { DiagnosticMaturityValue, DiagnosticPillar, IndustrySlug } from '../../data/content-types'
import { defaultContent } from '../../data/content'
import { isIndustrySlug } from '../../data/diagnostic-content'
import { resolveDiagnosticOutcome } from '../../data/diagnostic-engine'
import { maturityLabel } from '../../data/diagnostic-engine'
import './diagnostic.css'
import logoSvg from '../../../assets/logo-blue.svg'


const DEMO_ANSWERS: Record<string, DiagnosticMaturityValue> = {
  sources_sprawl: 2, sources_reliability: 1, sources_connectors: 3, sources_change: 2,
  trust_ownership: 2, trust_quality: 1, trust_definitions: 2, trust_access: 3,
  warehouse_central: 3, warehouse_transforms: 2, warehouse_modeling: 2, warehouse_history: 1,
  visibility_exec: 2, visibility_selfserve: 1, visibility_exceptions: 3, visibility_freshness: 2,
  team_ownership: 3, team_manual: 2, team_alignment: 2, team_commitment: 3,
  reliability_orchestration: 2, reliability_incidents: 1, reliability_cost: 3, reliability_security: 2,
}

type DiagnosticStage = 'overview' | 'assessment' | 'review' | 'results'

const stages: Array<{ id: DiagnosticStage; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'review', label: 'Review' },
  { id: 'results', label: 'Results' },
]

function getDiagnosticContext(searchValue: string | null): IndustrySlug | null {
  return isIndustrySlug(searchValue) ? searchValue : null
}

function getReturnHref(industry: IndustrySlug | null) {
  return industry ? `/${industry}` : '/authority'
}

function answeredCountForPillar(pillar: DiagnosticPillar, answers: Record<string, DiagnosticMaturityValue>) {
  return pillar.questions.filter((question) => answers[question.id] !== undefined).length
}

export default function DiagnosticPage() {
  const [searchParams] = useSearchParams()
  const industry = getDiagnosticContext(searchParams.get('industry'))
  const content = defaultContent.diagnostic
  const [stage, setStage] = useState<DiagnosticStage>('overview')
  const [activePillarId, setActivePillarId] = useState(content.pillars[0].id)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, DiagnosticMaturityValue>>({})

  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      setAnswers(DEMO_ANSWERS)
      setStage('results')
      return
    }
    setStage('overview')
    setActivePillarId(content.pillars[0].id)
    setAnswers({})
  }, [industry, content.pillars, searchParams])

  useEffect(() => {
    const stageLabel = stages.find((item) => item.id === stage)?.label ?? 'Diagnostic'
    document.title = `Hypr | ${content.title} | ${stageLabel}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        `${content.intro.subheadline} ${content.cta.supportingText}`,
      )
    }
  }, [content, stage])

  const outcome = resolveDiagnosticOutcome(content, answers)
  const activePillar = content.pillars.find((pillar) => pillar.id === activePillarId) ?? content.pillars[0]
  const activePillarIndex = content.pillars.findIndex((pillar) => pillar.id === activePillar.id)
  const activeQuestion = activePillar.questions[activeQuestionIndex]
  const activeQuestionAnswered = activeQuestion ? answers[activeQuestion.id] !== undefined : false
  const assessmentComplete = outcome.answeredCount === outcome.totalQuestions
  const progressValue = stage === 'overview'
    ? 0
    : stage === 'results'
      ? 100
      : outcome.completionPercent

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  function handleSelect(questionId: string, value: DiagnosticMaturityValue) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }))

    clearTimeout(autoAdvanceTimer.current)
    autoAdvanceTimer.current = setTimeout(() => {
      /* advance after ring animation finishes */
      if (activeQuestionIndex < activePillar.questions.length - 1) {
        setActiveQuestionIndex((i) => i + 1)
      } else {
        const nextPillar = content.pillars[activePillarIndex + 1]
        if (nextPillar) {
          setActivePillarId(nextPillar.id)
          setActiveQuestionIndex(0)
        } else {
          setStage('review')
        }
      }
    }, 600)
  }

  function startAssessment() {
    setStage('assessment')
    setActivePillarId(content.pillars[0].id)
    setActiveQuestionIndex(0)
  }

  function goToPillar(pillarId: string) {
    setActivePillarId(pillarId)
    setActiveQuestionIndex(0)
    setStage('assessment')
  }

  function handleNextQuestion() {
    if (activeQuestionIndex < activePillar.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1)
      return
    }

    const nextPillar = content.pillars[activePillarIndex + 1]
    if (nextPillar) {
      setActivePillarId(nextPillar.id)
      setActiveQuestionIndex(0)
      return
    }

    setStage('review')
  }

  function handlePreviousQuestion() {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1)
      return
    }

    const previousPillar = content.pillars[activePillarIndex - 1]
    if (previousPillar) {
      setActivePillarId(previousPillar.id)
      setActiveQuestionIndex(previousPillar.questions.length - 1)
      return
    }

    setStage('overview')
  }

  function handleSubmit() {
    if (!assessmentComplete) {
      return
    }

    setStage('results')
  }

  function handleReset() {
    setAnswers({})
    setActivePillarId(content.pillars[0].id)
    setActiveQuestionIndex(0)
    setStage('overview')
  }

  return (
    <div data-page="diagnostic">
      <header className="diag-topbar">
        <div className="diag-shell">
          <div className="diag-topbar__inner">
            <Link to={getReturnHref(industry)} className="diag-topbar__brand" aria-label="Return to Hypr">
              <img src={logoSvg} alt="" className="diag-topbar__brand-logo" />
              Hypr
            </Link>

            <div className="diag-topbar__actions">
              <Link to={getReturnHref(industry)} className="diag-topbar__link">
                Back to site
              </Link>
              <a href={content.cta.href} className="diag-topbar__cta">
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="diag-main">
        <div className="diag-shell">
          {stage === 'overview' ? (
            <section className="diag-landing">
              <div className="diag-landing__content">
                <p className="diag-eyebrow">{content.intro.eyebrow}</p>
                <h1 className="diag-landing__headline">{content.intro.headline}</h1>
                <p className="diag-landing__sub">{content.intro.subheadline}</p>

                <div className="diag-landing__pillars">
                  {content.pillars.map((pillar) => (
                    <span
                      key={pillar.id}
                      className="diag-landing__chip"
                      style={{ '--pillar-accent': pillar.accent } as CSSProperties}
                    >
                      {pillar.name}
                    </span>
                  ))}
                </div>

                <p className="diag-landing__meta">{content.intro.estimatedTime}</p>

                <div className="diag-landing__actions">
                  <button type="button" className="diag-button diag-button--primary" onClick={startAssessment}>
                    Start the diagnostic
                    <ArrowRight size={16} />
                  </button>
                  <a href={content.intro.secondaryCta.href} className="diag-link-callout">
                    {content.intro.secondaryCta.label}
                  </a>
                </div>
              </div>
            </section>
          ) : (
            <div className={`diag-layout${stage === 'results' ? ' diag-layout--report' : ''}`}>
              <aside className="diag-sidebar">
                <nav className="diag-stage-nav" aria-label="Diagnostic stages">
                  {stages.map((item) => {
                    const isActive = item.id === stage
                    const isLocked = (item.id === 'review' || item.id === 'results') && !assessmentComplete

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`diag-stage-pill${isActive ? ' is-active' : ''}`}
                        onClick={() => {
                          if (isLocked) return
                          setStage(item.id)
                        }}
                        disabled={isLocked}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </aside>

              <div className="diag-layout__main">
              {stage === 'assessment' && activeQuestion && (
              <div className="diag-assessment">
                <div className="diag-step-progress" aria-label="Pillar progress">
                  {activePillar.questions.map((q, i) => {
                    const isAnswered = answers[q.id] !== undefined
                    const isActive = i === activeQuestionIndex
                    const stepClass = `diag-step${isActive ? ' is-active' : ''}${isAnswered ? ' is-answered' : ''}`

                    return (
                      <div key={q.id} className="diag-step-group">
                        {i > 0 && (
                          <div className={`diag-step__line${answers[activePillar.questions[i - 1].id] !== undefined ? ' is-filled' : ''}`} />
                        )}
                        <button
                          type="button"
                          className={stepClass}
                          onClick={() => setActiveQuestionIndex(i)}
                          aria-label={`Question ${i + 1}`}
                        >
                          <span className="diag-step__circle">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </button>
                      </div>
                    )
                  })}
                </div>

                <article key={`${activePillar.id}-${activeQuestionIndex}`} className="diag-question-card">
                  <div className="diag-question-card__head">
                    <p className="diag-section-label">{activeQuestion.theme}</p>
                    <h3>{activeQuestion.prompt}</h3>
                  </div>

                  <div className="diag-options" role="radiogroup" aria-label={activeQuestion.prompt}>
                    {activeQuestion.options.map((option) => {
                      const selected = answers[activeQuestion.id] === option.value

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`diag-option${selected ? ' diag-option--selected' : ''}`}
                          onClick={() => handleSelect(activeQuestion.id, option.value)}
                          aria-pressed={selected}
                        >
                          <span className="diag-option__value">{option.value}</span>
                          <span className="diag-option__body">
                            <span className="diag-option__title">{option.label}</span>
                            <span className="diag-option__description">{option.description}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </article>

                <div className="diag-question__actions">
                  <button
                    type="button"
                    className="diag-button diag-button--ghost"
                    onClick={handlePreviousQuestion}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <div className="diag-question__actions-right">
                    <button
                      type="button"
                      className="diag-button diag-button--ghost"
                      onClick={() => setStage('review')}
                    >
                      Review answers
                    </button>
                    <button
                      type="button"
                      className="diag-button diag-button--primary"
                      onClick={handleNextQuestion}
                      disabled={!activeQuestionAnswered}
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(stage === 'review' || stage === 'results') && (
              <section className="diag-workspace">
                <div className="diag-workspace__header">
                  <div>
                    <p className="diag-section-label">
                      {stage === 'results' ? 'Readiness report' : 'Diagnostic walkthrough'}
                    </p>
                    <h2>
                      {stage === 'review' && content.review.headline}
                      {stage === 'results' && 'Your likely data engineering diagnosis'}
                    </h2>
                    {stage === 'review' && (
                      <p className="diag-workspace__subcopy">{content.review.subheadline}</p>
                    )}
                  </div>

                  <div className="diag-progress" aria-label="Diagnostic progress">
                    <div className="diag-progress__track">
                      <div className="diag-progress__fill" style={{ width: `${progressValue}%` }} />
                    </div>
                    <span>{progressValue}% complete</span>
                  </div>
                </div>

            {stage === 'review' && (
              <div className="diag-review">
                <div className="diag-review__summary">
                  <article className="diag-summary-card">
                    <small>Questions answered</small>
                    <strong>{outcome.answeredCount}/{outcome.totalQuestions}</strong>
                  </article>
                  <article className="diag-summary-card">
                    <small>Completion</small>
                    <strong>{outcome.completionPercent}%</strong>
                  </article>
                  <article className="diag-summary-card">
                    <small>Average maturity</small>
                    <strong>{outcome.overallMaturity ?? 'Not started'}</strong>
                  </article>
                </div>

                <div className={`diag-review__message${outcome.answeredCount === outcome.totalQuestions ? ' is-complete' : ''}`}>
                  <Sparkles size={18} />
                  <p>
                    {outcome.answeredCount === 0 && content.review.emptyMessage}
                    {outcome.answeredCount > 0 && outcome.answeredCount < outcome.totalQuestions && content.review.incompleteMessage}
                    {outcome.answeredCount === outcome.totalQuestions && content.review.completeMessage}
                  </p>
                </div>

                <div className="diag-review__cards">
                  {outcome.pillarScores.map((pillar) => (
                    <article key={pillar.pillarId} className="diag-review-card" style={{ '--pillar-accent': pillar.accent } as CSSProperties}>
                      <div className="diag-review-card__head">
                        <div>
                          <h3>{pillar.pillarName}</h3>
                          <p>{pillar.answeredCount} of {pillar.totalQuestions} answered</p>
                        </div>
                        {pillar.score !== null ? (
                          <div className="diag-review-card__score">
                            <strong>{pillar.score}</strong>
                            <span>{pillar.maturity}</span>
                          </div>
                        ) : (
                          <div className="diag-review-card__empty">Unassessed</div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="diag-button diag-button--ghost diag-button--full"
                        onClick={() => goToPillar(pillar.pillarId)}
                      >
                        {pillar.answeredCount === pillar.totalQuestions ? 'Edit pillar' : 'Complete pillar'}
                      </button>
                    </article>
                  ))}
                </div>

                <div className="diag-question__actions">
                  <button
                    type="button"
                    className="diag-button diag-button--ghost"
                    onClick={() => setStage('assessment')}
                  >
                    <ArrowLeft size={16} />
                    Back to questions
                  </button>

                  <button
                    type="button"
                    className="diag-button diag-button--primary"
                    onClick={handleSubmit}
                    disabled={!assessmentComplete}
                  >
                    See my results
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {stage === 'results' && outcome.profile && (
              <div className="diag-report">
                <header className="diag-report__header">
                  <div className="diag-report__header-left">
                    <img src={logoSvg} alt="" className="diag-report__logo" />
                    <span className="diag-report__brand">Hypr</span>
                  </div>
                  <div className="diag-report__header-right">
                    <h1 className="diag-report__title">Data Engineering Readiness Report</h1>
                    <p className="diag-report__date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <button type="button" className="diag-button diag-button--ghost diag-report__download" onClick={() => window.print()}>
                    <Download size={15} />
                    Download PDF
                  </button>
                </header>

                <section className="diag-report__section">
                  <p className="diag-report__label">Executive summary</p>
                  <h2 className="diag-report__headline">{outcome.profile.headline}</h2>
                  <p className="diag-report__body">{outcome.profile.summary}</p>
                </section>

                <section className="diag-report__section">
                  <div className="diag-report__metrics">
                    <div className="diag-report__metric diag-report__metric--accent">
                      <span className="diag-report__metric-value">{outcome.overallScore}</span>
                      <span className="diag-report__metric-label">Overall score</span>
                    </div>
                    <div className="diag-report__metric">
                      <span className="diag-report__metric-value">{outcome.overallMaturity}</span>
                      <span className="diag-report__metric-label">Maturity level</span>
                    </div>
                    <div className="diag-report__metric">
                      <span className="diag-report__metric-value">{outcome.strongestPillars[0]?.pillarName ?? '—'}</span>
                      <span className="diag-report__metric-label">Strongest area</span>
                    </div>
                    <div className="diag-report__metric">
                      <span className="diag-report__metric-value">{outcome.weakestPillars[0]?.pillarName ?? '—'}</span>
                      <span className="diag-report__metric-label">Biggest opportunity</span>
                    </div>
                  </div>
                </section>

                <section className="diag-report__section">
                  <p className="diag-report__label">Pillar breakdown</p>
                  <table className="diag-report__table">
                    <thead>
                      <tr>
                        <th>Pillar</th>
                        <th>Score</th>
                        <th>Maturity</th>
                        <th>Key finding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outcome.pillarScores.map((pillar) => (
                        <tr key={pillar.pillarId}>
                          <td>
                            <span className="diag-report__pillar-name">
                              <span className="diag-report__dot" style={{ '--pillar-accent': pillar.accent } as CSSProperties} />
                              {pillar.pillarName}
                            </span>
                          </td>
                          <td><strong>{pillar.score ?? '—'}</strong></td>
                          <td>{pillar.maturity ?? '—'}</td>
                          <td className="diag-report__finding">{pillar.recommendations[0] ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <section className="diag-report__section">
                  <p className="diag-report__label">Detailed scores</p>
                  <div className="diag-report__details">
                    {outcome.pillarScores.map((pillar) => (
                      <article key={pillar.pillarId} className="diag-report__detail-card" style={{ '--pillar-accent': pillar.accent } as CSSProperties}>
                        <div className="diag-report__detail-head">
                          <div>
                            <h4>{pillar.pillarName}</h4>
                            <p>{pillar.pillarDescription}</p>
                          </div>
                          <div className="diag-report__detail-score">
                            <strong>{pillar.score ?? '—'}</strong>
                            <span>{pillar.maturity ?? '—'}</span>
                          </div>
                        </div>
                        <div className="diag-report__detail-rows">
                          {pillar.questionScores.map((q) => (
                            <div key={q.questionId} className="diag-report__detail-row">
                              <span>{q.theme}</span>
                              <span className={`diag-report__score-badge diag-report__score-badge--${q.score ? (q.score >= 3 ? 'good' : 'low') : 'none'}`}>
                                {q.score !== null ? `${q.score} — ${maturityLabel(q.score)}` : '—'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="diag-report__section">
                  <p className="diag-report__label">Analysis</p>
                  <div className="diag-report__analysis">
                    <article>
                      <h4>Root cause</h4>
                      <p>{outcome.profile.rootCause}</p>
                    </article>
                    <article>
                      <h4>Recommended approach</h4>
                      <p>{outcome.profile.recommendationLead}</p>
                    </article>
                  </div>
                </section>

                <section className="diag-report__section">
                  <p className="diag-report__label">Recommended products</p>
                  <div className="diag-report__products">
                    {outcome.products.map((productKey) => {
                      const rec = content.recommendations[productKey]
                      return (
                        <article key={rec.key} className="diag-report__product">
                          <div className="diag-report__product-tag">{rec.tagline}</div>
                          <h4>{rec.name}</h4>
                          <p>{rec.description}</p>
                          <strong>{rec.outcome}</strong>
                        </article>
                      )
                    })}
                  </div>
                </section>

                {outcome.quickWins.length > 0 && (
                  <section className="diag-report__section">
                    <p className="diag-report__label">Priority actions</p>
                    <ol className="diag-report__actions-list">
                      {outcome.quickWins.map((win, i) => (
                        <li key={i}>{win}</li>
                      ))}
                    </ol>
                  </section>
                )}

                <section className="diag-report__section diag-report__cta">
                  <div>
                    <h3>{content.cta.label}</h3>
                    <p>{outcome.profile.bookingPrompt} {content.cta.supportingText}</p>
                  </div>
                  <div className="diag-report__cta-actions">
                    <a href={content.cta.href} className="diag-button diag-button--primary">
                      <CalendarDays size={16} />
                      Book the review
                    </a>
                    <button type="button" className="diag-button diag-button--ghost" onClick={handleReset}>
                      <RotateCcw size={16} />
                      Restart diagnostic
                    </button>
                  </div>
                </section>

                <footer className="diag-report__footer">
                  <span>Generated by Hypr Data Engineering Readiness Diagnostic</span>
                  <span className="diag-report__footer-brand">A product of <img src="/assets/primary-logo-blue.svg" alt="Elucidate" className="diag-report__footer-logo" /></span>
                </footer>
              </div>
            )}
              </section>
            )}
              </div>

              {stage === 'assessment' && (
                <aside className="diag-pillar-chain" aria-label="Diagnostic pillars">
                  {content.pillars.map((pillar, index) => {
                    const answered = answeredCountForPillar(pillar, answers)
                    const isActive = pillar.id === activePillar.id
                    const isComplete = answered === pillar.questions.length

                    return (
                      <div key={pillar.id} className="diag-pillar-step">
                        {index > 0 && (
                          <div className={`diag-pillar-step__line${isComplete || isActive ? ' is-reached' : ''}`} />
                        )}
                        <button
                          type="button"
                          className={`diag-pillar-pill${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}`}
                          onClick={() => goToPillar(pillar.id)}
                        >
                          <span className="diag-pillar-pill__dot" />
                          <span>{pillar.name}</span>
                        </button>
                      </div>
                    )
                  })}
                </aside>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
