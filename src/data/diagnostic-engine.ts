import type {
  DiagnosticContent,
  DiagnosticMaturityValue,
  DiagnosticOutcome,
  DiagnosticPillarScore,
  DiagnosticProductKey,
  DiagnosticProfileId,
  DiagnosticScoreBand,
} from './content-types'

export function maturityLabel(score: number) {
  if (score <= 1.5) return 'Initial'
  if (score <= 2.5) return 'Developing'
  if (score <= 3.5) return 'Defined'
  if (score <= 4.5) return 'Managed'
  return 'Optimized'
}

export function scoreBand(score: number): DiagnosticScoreBand {
  if (score < 3) return 'low'
  if (score < 4) return 'mid'
  return 'high'
}

function roundScore(value: number) {
  return Number(value.toFixed(1))
}

function average(values: number[]) {
  return values.length ? roundScore(values.reduce((sum, value) => sum + value, 0) / values.length) : null
}

export function selectRecommendedProducts(
  productScores: Record<DiagnosticProductKey, number>,
  overallScore: number | null,
): DiagnosticProductKey[] {
  const ranked = (Object.entries(productScores) as Array<[DiagnosticProductKey, number]>)
    .sort((left, right) => right[1] - left[1])

  if (ranked[0][1] <= 0) {
    return [ranked[0][0]]
  }

  if (
    overallScore !== null
    && overallScore <= 2.2
    && ranked[2][1] >= ranked[0][1] * 0.6
  ) {
    return ranked.map(([product]) => product)
  }

  const selected: DiagnosticProductKey[] = [ranked[0][0]]

  if (ranked[1][1] >= 3.5 && ranked[0][1] - ranked[1][1] <= 1.25) {
    selected.push(ranked[1][0])
  }

  if (
    selected.length === 2
    && overallScore !== null
    && overallScore <= 2.8
    && ranked[2][1] >= 3
    && ranked[0][1] - ranked[2][1] <= 2.25
  ) {
    selected.push(ranked[2][0])
  }

  return selected
}

export function selectDiagnosticProfileId(
  weakestPillars: DiagnosticPillarScore[],
  productSelection: DiagnosticProductKey[],
  overallScore: number | null,
  profileScores: Record<DiagnosticProfileId, number>,
): DiagnosticProfileId {
  if (productSelection.length === 3 && overallScore !== null && overallScore <= 2.8) {
    return 'full-stack-pressure'
  }

  if (weakestPillars.length <= 1) {
    return 'foundation-strain'
  }

  const weakestIds = new Set(weakestPillars.map((pillar) => pillar.pillarId))

  if (weakestIds.has('visibility') && productSelection.includes('lens')) {
    return 'visibility-gap'
  }

  if ((weakestIds.has('trust') || weakestIds.has('warehouse')) && productSelection.includes('store')) {
    return 'trust-gap'
  }

  if ((weakestIds.has('sources') || weakestIds.has('team')) && productSelection.includes('flow')) {
    return 'manual-drag'
  }

  if (weakestIds.has('reliability') || weakestIds.has('warehouse')) {
    return 'foundation-strain'
  }

  const rankedProfiles = (Object.entries(profileScores) as Array<[DiagnosticProfileId, number]>)
    .filter(([profileId]) => profileId !== 'full-stack-pressure')
    .sort((left, right) => right[1] - left[1])

  return rankedProfiles[0]?.[0] ?? 'foundation-strain'
}

export function resolveDiagnosticOutcome(
  content: DiagnosticContent,
  answers: Record<string, DiagnosticMaturityValue>,
): DiagnosticOutcome {
  const totalQuestions = content.pillars.reduce((sum, pillar) => sum + pillar.questions.length, 0)
  const answeredValues = Object.values(answers)
  const overallScore = average(answeredValues)
  const answeredCount = answeredValues.length
  const completionPercent = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0

  const productScores: Record<DiagnosticProductKey, number> = {
    flow: 0,
    store: 0,
    lens: 0,
  }

  const profileScores: Record<DiagnosticProfileId, number> = {
    'visibility-gap': 0,
    'trust-gap': 0,
    'manual-drag': 0,
    'foundation-strain': 0,
    'full-stack-pressure': 0,
  }

  const pillarScores: DiagnosticPillarScore[] = content.pillars.map((pillar) => {
    const questionScores = pillar.questions.map((question) => ({
      questionId: question.id,
      theme: question.theme,
      prompt: question.prompt,
      score: answers[question.id] ?? null,
    }))

    const answeredQuestionScores = questionScores
      .map((question) => question.score)
      .filter((score): score is DiagnosticMaturityValue => score !== null)

    const score = average(answeredQuestionScores)
    const answeredCountForPillar = answeredQuestionScores.length

    if (score !== null) {
      const pressure = 5 - score

      for (const [productKey, weight] of Object.entries(pillar.productWeights) as Array<[DiagnosticProductKey, number]>) {
        productScores[productKey] += pressure * weight
      }

      for (const [profileId, weight] of Object.entries(pillar.profileWeights) as Array<[Exclude<DiagnosticProfileId, 'full-stack-pressure'>, number]>) {
        profileScores[profileId] += pressure * weight
      }
    }

    return {
      pillarId: pillar.id,
      pillarName: pillar.name,
      pillarDescription: pillar.description,
      accent: pillar.accent,
      score,
      maturity: score !== null ? maturityLabel(score) : null,
      answeredCount: answeredCountForPillar,
      totalQuestions: pillar.questions.length,
      questionScores,
      recommendations: score !== null
        ? pillar.recommendations[scoreBand(score)]
        : [],
    }
  })

  const answeredPillars = pillarScores.filter((pillar) => pillar.score !== null)
  const strongestPillars = [...answeredPillars]
    .sort((left, right) => (right.score ?? 0) - (left.score ?? 0))
    .slice(0, 2)

  const weakestPillars = [...answeredPillars]
    .sort((left, right) => (left.score ?? 0) - (right.score ?? 0))
    .slice(0, Math.min(2, answeredPillars.length))

  const quickWins = weakestPillars.flatMap((pillar) => pillar.recommendations.slice(0, 1))
  const products = selectRecommendedProducts(productScores, overallScore)
  const profileId = selectDiagnosticProfileId(weakestPillars, products, overallScore, profileScores)

  profileScores['full-stack-pressure'] = products.length === 3 ? 1 : 0

  return {
    overallScore,
    overallMaturity: overallScore !== null ? maturityLabel(overallScore) : null,
    answeredCount,
    totalQuestions,
    completionPercent,
    pillarScores,
    strongestPillars,
    weakestPillars,
    quickWins,
    products,
    productScores: {
      flow: roundScore(productScores.flow),
      store: roundScore(productScores.store),
      lens: roundScore(productScores.lens),
    },
    profile: content.profiles[profileId] ?? null,
    profileScores: {
      'visibility-gap': roundScore(profileScores['visibility-gap']),
      'trust-gap': roundScore(profileScores['trust-gap']),
      'manual-drag': roundScore(profileScores['manual-drag']),
      'foundation-strain': roundScore(profileScores['foundation-strain']),
      'full-stack-pressure': roundScore(profileScores['full-stack-pressure']),
    },
  }
}
