import { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

export interface ContactModalHandle {
  open: () => void
}

export const AUContactModal = forwardRef<ContactModalHandle>(function AUContactModal(_, ref) {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])

  useImperativeHandle(ref, () => ({ open: () => setOpen(true) }), [])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitting(true)
      setError('')

      try {
        const res = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })

        if (!res.ok) throw new Error('Submission failed')
        setSubmitted(true)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
    },
    [name, email, message]
  )

  // Reset on close
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setSubmitted(false)
        setError('')
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
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

  const canSubmit = name.trim() && email.trim() && message.trim()

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
            aria-label="Contact form"
          >
            <button
              className="au-modal__close"
              onClick={onClose}
              aria-label="Close contact form"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h2 className="au-modal__title">
                  Tell us about your data challenge
                </h2>
                <p className="au-modal__subtitle">
                  Not ready for a call? No problem. Drop us a message and
                  we&rsquo;ll get back to you within one business day.
                </p>

                <div className="au-modal__field">
                  <label className="au-modal__label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    className="au-modal__input"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="au-modal__field">
                  <label className="au-modal__label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    className="au-modal__input"
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="au-modal__field">
                  <label className="au-modal__label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="au-modal__textarea"
                    rows={4}
                    placeholder="What are you looking to solve?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <p className="au-modal__error">{error}</p>
                )}

                <button
                  type="submit"
                  className="au-btn au-btn--primary au-modal__submit"
                  disabled={!canSubmit || submitting}
                  style={{
                    opacity: canSubmit && !submitting ? 1 : 0.5,
                    cursor: canSubmit && !submitting ? 'pointer' : 'not-allowed',
                  }}
                >
                  {submitting ? 'Sending\u2026' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="au-modal__success">
                <div className="au-modal__success-icon">
                  <CheckCircle size={24} />
                </div>
                <h3>Message sent!</h3>
                <p>
                  Thanks for reaching out. We&rsquo;ll review your message and
                  get back to you within one business day.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
