import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Menu, X, Send, Radio } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Security', href: '#security' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Terminal', href: '#terminal' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{ padding: '10px 16px' }}
    >
      <div
        className={`nav-shell transition-all duration-500 ${scrolled ? 'nav-shell-scrolled' : ''}`}
        style={{ borderRadius: '10px', maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}
      >
        <div className="flex items-center justify-between h-14 max-w-7xl mx-auto">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="brand-seal h-8 w-8 rounded-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="brand-wordmark text-[15px] text-white tracking-wide">
              Transfera
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#4a3a3a] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gateway Online
            </div>
            <a
              href="/live"
              className="btn-primary group"
            >
              <span>Start Transfer</span>
              <span className="btn-icon">
                <Send className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="icon-button md:hidden h-9 w-9 rounded-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-white/5 mt-1"
            style={{ background: 'rgba(10, 8, 8, 0.97)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)', maxWidth: '1400px', margin: '6px auto 0' }}
          >
            <div className="section-container py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="/live" className="btn-primary group text-center mt-2">
                <span>Start Transfer</span>
                <span className="btn-icon"><Send className="w-3 h-3" /></span>
              </a>
              <div className="flex items-center gap-2 border-t border-white/[0.05] pt-4 text-[10px] font-mono uppercase text-[#4a3a3a] tracking-widest">
                <Radio className="h-3 w-3 text-emerald-500" /> Gateway online
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
