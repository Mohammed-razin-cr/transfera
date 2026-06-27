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
        style={{ borderRadius: '16px', maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}
      >
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Brand */}
          <a href="/" className="flex items-center gap-4 group">
                <div className="brand-seal h-16 w-16 rounded-xl transition-all duration-300 group-hover:scale-105 flex items-center justify-center bg-transparent"
                  style={{ '--tw-shadow': 'none', border: 'none', background: 'transparent' }}>
                  <img src={theme === 'matrix' ? '/static/logo.green.png' : '/static/logo.png'} alt="Transfera Logo" className="w-full h-full object-contain" style={{ background: 'transparent', backgroundColor: 'transparent', mixBlendMode: 'screen' }} />
                </div>
                <span className="brand-wordmark text-[18px] text-white tracking-wide group-hover:text-[var(--accent-solid)] transition-colors duration-300">
                  Transfera
                </span>
              </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => setTheme(theme === 'matrix' ? 'obsidian' : 'matrix')}
              className="icon-button h-10 w-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
              title="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.8, rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Palette className={`w-5 h-5 ${theme === 'matrix' ? 'text-emerald-400' : 'text-red-500'}`} />
                </motion.div>
              </AnimatePresence>
            </button>
            <div className="status-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Gateway Online
            </div>
            <a href="/live" className="btn-primary group" style={{ padding: '12px 24px', fontSize: '11px' }}>
              <span>Start Transfer</span>
              <span className="btn-icon" style={{ width: '24px', height: '24px' }}>
                <motion.div
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'matrix' ? 'obsidian' : 'matrix')}
              className="icon-button h-10 w-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/[0.04] transition-all duration-300"
              title="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.8, rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Palette className={`w-5 h-5 ${theme === 'matrix' ? 'text-emerald-400' : 'text-red-500'}`} />
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              className="icon-button h-10 w-10 rounded-lg"
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
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="overflow-hidden mt-3"
            style={{
              background: 'rgba(8, 6, 6, 0.98)',
              borderRadius: '16px',
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
                  className="nav-link text-sm py-2"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="border-t border-white/[0.06] pt-5 flex flex-col gap-3">
                <a href="/live" className="btn-primary group text-center justify-center">
                  <span>Start Transfer</span>
                  <span className="btn-icon">
                    <motion.div
                      whileHover={{ x: 3, y: -3 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  </span>
                </a>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: '#7a6e6b' }}>
                  <Radio className="h-4 w-4 text-emerald-400" /> Gateway online
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
