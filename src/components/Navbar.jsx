import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#inicio',   label: 'Inicio' },
  { href: '#como',     label: 'Cómo funciona' },
  { href: '#denuncia', label: 'Hacer denuncia', cta: true },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
    <div>Testeando git</div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#inicio" className="navbar-logo" onClick={close}>
          <img src="/logo.png" alt="Pumakawa logo" />
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className={link.cta ? 'nav-cta' : ''}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          id="hamburger-btn"
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`} id="mobile-menu">
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={link.cta ? 'mobile-cta' : ''}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
