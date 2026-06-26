import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Menu, X, Send, Radio, Palette } from 'lucide-react'

export default function Navbar({ theme = 'obsidian', setTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Security', href: '/#security' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: '10px 16px' }}
    >
      <div
        className={`nav-shell transition-all duration-500 ${scrolled ? 'nav-shell-scrolled' : ''}`}
        style={{ borderRadius: '12px', maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}
      >
        <div className="flex items-center justify-between h-14 max-w-7xl mx-auto">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="brand-seal h-8 w-8 rounded-md transition-all duration-300 group-hover:shadow-lg overflow-hidden flex items-center justify-center bg-transparent"
              style={{ '--tw-shadow': '0 0 20px rgba(var(--accent),0.3)' }}>
              <img src="/static/logo.png" alt="Transfera Logo" className="w-full h-full object-cover" />
            </div>
            <span className="brand-wordmark text-[15px] text-white tracking-wide group-hover:text-[var(--accent-solid)] transition-colors duration-300">
              Transfera
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'matrix' ? 'obsidian' : 'matrix')}
              className="icon-button h-9 w-9 rounded-md border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              title="Toggle theme"
            >
              <Palette className={`w-4 h-4 transition-colors duration-300 ${theme === 'matrix' ? 'text-emerald-400' : 'text-red-500'}`} />
            </button>
            <div className="status-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Gateway Online
            </div>
            <a href="/live" className="btn-primary group" style={{ padding: '10px 20px', fontSize: '10px' }}>
              <span>Start Transfer</span>
              <span className="btn-icon" style={{ width: '22px', height: '22px' }}>
                <Send className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'matrix' ? 'obsidian' : 'matrix')}
              className="icon-button h-9 w-9 rounded-md border border-white/10 flex items-center justify-center hover:bg-white/[0.04] transition-all duration-300"
              title="Toggle theme"
            >
              <Palette className={`w-4 h-4 transition-colors duration-300 ${theme === 'matrix' ? 'text-emerald-400' : 'text-red-500'}`} />
            </button>
            <button
              className="icon-button h-9 w-9 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden mt-2"
            style={{
              background: 'rgba(8, 6, 6, 0.98)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.07)',
              maxWidth: '1400px',
              margin: '6px auto 0',
              backdropFilter: 'blur(28px)',
            }}
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-sm py-1"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-3">
                <a href="/live" className="btn-primary group text-center justify-center">
                  <span>Start Transfer</span>
                  <span className="btn-icon"><Send className="w-3 h-3" /></span>
                </a>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: '#7a6e6b' }}>
                  <Radio className="h-3 w-3 text-emerald-400" /> Gateway online
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
