import { useEffect, useState } from 'react'
import Logo from './Logo'
import { negozio } from '../data'
import { IconPhone } from './Icons'

const voci = [
  { href: '#reparti', label: 'Reparti' },
  { href: '#negozio', label: 'Il negozio' },
  { href: '#orari', label: 'Orari' },
  { href: '#mappa', label: 'Mappa' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const tel = negozio.telefono.replace(/\s/g, '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
    >
      <div className="header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <Logo size={52} />
          <span className="brand-text">
            <strong>Dello Buono</strong>
            <small>Montella</small>
          </span>
        </a>

        <nav className="nav" aria-label="Navigazione principale">
          {voci.map((v) => (
            <a key={v.href} href={v.href} onClick={() => setOpen(false)}>
              {v.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary btn-sm" href={`tel:${tel}`}>
            <IconPhone />
            <span>{negozio.telefono}</span>
          </a>
          <button
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-mobile" id="menu-mobile" hidden={!open}>
        {voci.map((v, i) => (
          <a key={v.href} href={v.href} onClick={() => setOpen(false)}>
            <em>0{i + 1}</em>
            {v.label}
          </a>
        ))}
        <a className="nav-mobile-tel" href={`tel:${tel}`}>
          {negozio.telefono}
        </a>
      </div>
    </header>
  )
}
