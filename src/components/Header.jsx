import { useEffect, useState } from 'react'
import { negozio } from '../data'

const voci = [
  { href: '#reparti', label: 'Reparti' },
  { href: '#negozio', label: 'Il negozio' },
  { href: '#orari', label: 'Orari' },
  { href: '#contatti', label: 'Contatti' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            DB
          </span>
          <span className="brand-text">
            <strong>Dello Buono</strong>
            <small>Montella</small>
          </span>
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
          {voci.map((v) => (
            <a key={v.href} href={v.href} onClick={() => setOpen(false)}>
              {v.label}
            </a>
          ))}
          <a className="nav-cta" href={`tel:${negozio.telefono.replace(/\s/g, '')}`}>
            {negozio.telefono}
          </a>
        </nav>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-label="Apri il menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
