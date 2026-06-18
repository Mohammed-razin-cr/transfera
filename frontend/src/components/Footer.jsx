import { motion } from 'framer-motion'
import { ShieldCheck, Github, Twitter, Heart, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const links = {
    Product: [
      { label: 'Live Transfer', href: '/live' },
      { label: 'CLI Download', href: '/install.sh' },
      { label: 'Self-Host', href: '/development' },
    ],
    Resources: [
      { label: 'Documentation', href: '/development' },
      { label: 'Security', href: '#security' },
      { label: 'GitHub', href: 'https://github.com/Mohammed-razin-cr/transfera' },
    ],
    Company: [
      { label: 'MIT License', href: 'https://github.com/Mohammed-razin-cr/transfera/blob/main/LICENSE' },
      { label: 'Contributing', href: 'https://github.com/Mohammed-razin-cr/transfera' },
    ],
  }

  return (
    <footer className="relative pt-20 pb-10 border-t border-white/[0.05]">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-3 mb-5">
                <div className="brand-seal h-8 w-8 rounded-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="brand-wordmark text-[15px] text-white tracking-wide">
                  Transfera
                </span>
              </a>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#3a2a2a' }}>
                Military-grade encrypted file transfer. Direct device-to-device. Zero server storage. Built for privacy-first teams.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-8 w-8 rounded-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-8 w-8 rounded-sm"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="eyebrow-label mb-5">{category}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm transition-colors duration-300 inline-flex items-center gap-1 group"
                        style={{ color: '#3a2a2a' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#e8e0d5'}
                        onMouseLeave={e => e.currentTarget.style.color = '#3a2a2a'}
                      >
                        {item.label}
                        {item.href.startsWith('http') && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest uppercase"
              style={{ color: '#2a1a1a' }}>
              <span>2026 Transfera</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">MIT License</span>
            </div>
            <p className="font-mono text-[10px] tracking-wider flex items-center gap-1.5"
              style={{ color: '#2a1a1a' }}>
              Built with <Heart className="w-2.5 h-2.5" style={{ color: 'rgba(180,30,30,0.5)' }} /> for the privacy community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
