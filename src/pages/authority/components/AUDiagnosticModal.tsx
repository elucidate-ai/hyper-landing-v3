import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

interface DiagnosticModalProps {
  open: boolean
  onClose: () => void
}

const QUESTIONS = [
  {
    id: 'size',
    label: 'How large is your company?',
    options: ['1–50 employees', '50–200', '200–1,000', '1,000+'],
  },
  {
    id: 'sources',
    label: 'How many data sources do you use?',
    options: ['1–5', '5–15', '15–50', '50+'],
  },
  {
    id: 'maturity',
    label: 'What best describes your current analytics?',
    options: ['Spreadsheets', 'Basic BI tools', 'Advanced analytics', 'AI / ML'],
  },
  {
    id: 'challenge',
    label: 'What is your biggest data challenge?',
    options: ['Data scattered everywhere', 'No single source of truth', "Can't enable AI", 'Cost of current tools'],
  },
]

export function AUDiagnosticModal({ open, onClose }: DiagnosticModalProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = useCallback((questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }, [])

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
  }, [])

  // Reset on close
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setAnswers({})
        setSubmitted(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const allAnswered = QUESTIONS.every((q) => answers[q.id])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="au-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="au-modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Data diagnostic assessment"
          >
            <button
              className="au-modal__close"
              onClick={onClose}
              aria-label="Close diagnostic"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <h2 className="au-modal__title">Quick Data Diagnostic</h2>
                <p className="au-modal__subtitle">
                  Answer 4 quick questions and we&apos;ll benchmark where you stand compared to similar companies.
                </p>

                {QUESTIONS.map((q) => (
                  <div key={q.id} className="au-modal__question">
                    <span className="au-modal__question-label">{q.label}</span>
                    <div className="au-modal__options">
                      {q.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`au-modal__option${
                            answers[q.id] === option ? ' au-modal__option--selected' : ''
                          }`}
                          onClick={() => handleSelect(q.id, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="au-btn au-btn--primary au-modal__submit"
                  disabled={!allAnswered}
                  onClick={handleSubmit}
                  style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'not-allowed' }}
                >
                  Get My Benchmark
                </button>
              </>
            ) : (
              <div className="au-modal__success">
                <div className="au-modal__success-icon">
                  <CheckCircle size={24} />
                </div>
                <h3>Thank you!</h3>
                <p>
                  We&apos;ll analyse your responses and send your personalised benchmark within 24 hours. Keep an eye on your inbox.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
