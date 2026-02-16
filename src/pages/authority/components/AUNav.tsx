import { useState, useCallback, useEffect } from 'react'
import { navigation } from '../../../data/content'
import { Menu, X } from 'lucide-react'

export function AUNav() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen((v) => !v), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className="au-nav" role="navigation" aria-label="Main navigation">
      <div className="au-container au-nav__inner">
        <a href="#" className="au-nav__brand" aria-label="Hyper home">
          hyper
        </a>

        <button
          className="au-nav__toggle"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {open && <div className="au-nav__backdrop" onClick={close} />}

        <div className={`au-nav__links${open ? ' au-nav__links--open' : ''}`}>
          {navigation.items.map((item) => (
            <a key={item.label} href={item.href} className="au-nav__link" onClick={close}>
              {item.label}
            </a>
          ))}
          <a href={navigation.cta.href} className="au-nav__cta" onClick={close}>
            {navigation.cta.label}
          </a>
        </div>
      </div>
    </nav>
  )
}
