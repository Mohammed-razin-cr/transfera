import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Send, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let frameId = null

    const updateScrollState = () => {
      const nextScrolled = window.scrollY > 50
      setScrolled((current) => current === nextScrolled ? current : nextScrolled)
      frameId = null
    }

    const handleScroll = () => {
      if (frameId === null) frameId = requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Features',     href: '/features' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Security',     href: '/security' },
    { label: 'FAQ',          href: '/faq' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: '12px 16px' }}
      aria-label="Primary navigation"
    >
      <div
        className={`nav-shell relative z-20 ${scrolled ? 'nav-shell-scrolled' : ''}`}
        style={{ borderRadius: '18px', maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 28px)' }}
      >
        <div className="flex items-center justify-between h-[60px]">

          {/* Brand Lockup */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Transfera home">
            <div
              className="brand-seal transition-all duration-300 group-hover:scale-105"
              style={{ width: '36px', height: '36px' }}
            >
              <img
                src="/static/logo.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
                style={{ background: 'transparent' }}
              />
            </div>
            <span className="brand-wordmark group-hover:opacity-80 transition-opacity duration-300">
              Transfera
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="status-badge">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
              Gateway Online
            </div>
            <a href="/live" className="btn-primary group" style={{ padding: '10px 22px', fontSize: '14px' }}>
              <span>Start Transfer</span>
              <span className="btn-icon" style={{ width: '20px', height: '20px' }}>
                <motion.div whileHover={{ x: 2, y: -2 }} transition={{ duration: 0.2 }}>
                  <Send className="w-3 h-3" />
                </motion.div>
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="icon-button h-10 w-10 rounded-xl lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            className="mobile-menu-backdrop fixed inset-0 z-10 lg:hidden"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mobile-nav-panel relative z-20 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                >
                  <Link
                    to={link.href}
                    className={`mobile-nav-link ${pathname === link.href ? 'mobile-nav-link-active' : ''}`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <a href="/live" className="btn-primary group text-center justify-center w-full">
                  <span>Start Transfer</span>
                  <span className="btn-icon">
                    <Send className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
