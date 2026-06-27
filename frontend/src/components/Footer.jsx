import { motion } from 'framer-motion'
import { ShieldCheck, Github, Instagram, Heart, ArrowUpRight, Zap } from 'lucide-react'
import { useTheme } from '../App'

export default function Footer() {
  const { theme } = useTheme()
  const isMatrix = theme === 'matrix'
  const accentColor = isMatrix ? '34, 197, 94' : '180, 30, 30'

  const links = {
    Product: [
      { label: 'Live Transfer', href: '/live' },
      { label: 'Secure File Transfer', href: '/secure-file-transfer' },
      { label: 'Encrypted File Transfer', href: '/encrypted-file-transfer' },
      { label: 'Browser File Transfer', href: '/browser-file-transfer' },
    ],
    Resources: [
      { label: 'Transfer Between Devices', href: '/transfer-files-between-devices' },
      { label: 'Phone to PC Transfer', href: '/send-files-phone-to-pc' },
      { label: 'Private File Sharing', href: '/private-file-sharing' },
      { label: 'FAQ', href: '/faq' },
    ],
    Project: [
      { label: 'WeTransfer Alternative', href: '/wetransfer-alternative' },
      { label: 'GitHub', href: 'https://github.com/Mohammed-razin-cr/transfera' },
      { label: 'MIT License', href: 'https://github.com/Mohammed-razin-cr/transfera/blob/main/LICENSE' },
    ],
  }

  return (
    <footer className="relative pt-24 pb-12" style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${accentColor},0.3), transparent)` }} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(var(--accent),0.06) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-3 mb-6 group w-fit">
                <div className="brand-seal h-14 w-14 rounded-md transition-all duration-300 group-hover:scale-105 flex items-center justify-center bg-transparent"
                  style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={theme}
                      src={theme === 'matrix' ? '/logo.green.png' : '/logo.png'}
                      alt="Transfera Logo"
                      className="w-full h-full object-contain"
                      style={{ background: 'transparent', backgroundColor: 'transparent' }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatePresence>
                </div>
                <span className="brand-wordmark text-[16px] text-white tracking-wide group-hover:text-[var(--accent-solid)] transition-colors duration-300">
                  Transfera
                </span>
              </a>
              <p className="text-sm leading-relaxed max-w-xs mb-2" style={{ color: '#7a6e6b' }}>
                Secure, browser-based file transfer with end-to-end encryption, QR pairing, and no signup.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-3 h-3" style={{ color: 'rgba(var(--accent),0.5)' }} />
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(var(--accent),0.5)' }}>
                  Open source · MIT License
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-9 w-9 rounded-md"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com/mohammed_razin_c.r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-9 w-9 rounded-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="eyebrow-label mb-6">{category}</h4>
                <ul className="space-y-3.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm transition-all duration-300 inline-flex items-center gap-1.5 group hover:gap-2"
                        style={{ color: '#a09490' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#f0e8e0'}
                        onMouseLeave={e => e.currentTarget.style.color = '#a09490'}
                      >
                        {item.label}
                        {item.href.startsWith('http') && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest uppercase"
              style={{ color: '#4e4040' }}>
              <span>© 2026 Transfera</span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="hidden sm:inline">MIT License</span>
            </div>
            <p className="font-mono text-[10px] tracking-wider flex items-center gap-1.5"
              style={{ color: '#4e4040' }}>
              Built with <Heart className="w-2.5 h-2.5" style={{ color: `rgba(${accentColor},0.45)` }} /> for the privacy community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
