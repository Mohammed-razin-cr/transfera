import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Lock, ShieldCheck } from 'lucide-react'

const navColumns = [
  {
    id: 'footer-product',
    heading: 'Product',
    items: [
      { label: 'Live Transfer', href: '/live' },
      { label: 'Features', href: '/features', internal: true },
      { label: 'How it Works', href: '/how-it-works', internal: true },
      { label: 'Security', href: '/security', internal: true },
    ],
  },
  {
    id: 'footer-guides',
    heading: 'Guides',
    items: [
      { label: 'Secure File Transfer', href: '/secure-file-transfer' },
      { label: 'Encrypted File Transfer', href: '/encrypted-file-transfer' },
      { label: 'Transfer Between Devices', href: '/transfer-files-between-devices' },
      { label: 'Phone to PC Transfer', href: '/send-files-phone-to-pc' },
    ],
  },
  {
    id: 'footer-resources',
    heading: 'Resources',
    items: [
      { label: 'Browser File Transfer', href: '/browser-file-transfer' },
      { label: 'Private File Sharing', href: '/private-file-sharing' },
      { label: 'WeTransfer Alternative', href: '/wetransfer-alternative' },
      { label: 'FAQ', href: '/faq', internal: true },
    ],
  },
]

const specBadges = ['WebRTC Direct', 'AES-256-GCM', 'NaCl secretbox']

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#27272A] bg-[#09090B]">
      {/* Subtle top hairline & ambient glow */}
      <div
        aria-hidden="true"
        className="footer-ambient pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F00064]/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="footer-ambient pointer-events-none absolute inset-x-0 top-0 h-44"
        style={{
          background:
            'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(240, 0, 100, 0.05) 0%, transparent 75%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="section-inner pt-14 pb-10 sm:pt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Brand & Session Overview */}
            <div className="min-w-0 lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex min-h-[36px] items-center gap-2.5 group"
                  aria-label="Transfera home"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114] transition-colors duration-150 group-hover:border-[#3F3F46]">
                    <img
                      src="/static/logo.png"
                      alt=""
                      width="20"
                      height="20"
                      aria-hidden="true"
                      className="h-5 w-5 object-contain"
                    />
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight text-[#F4F4F5]">
                    Transfera
                  </span>
                </Link>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#111114] px-2.5 py-0.5 text-[11px] font-medium text-[#A1A1AA]">
                  <ShieldCheck className="h-3 w-3 text-[#10B981]" aria-hidden="true" />
                  <span>Open source · MIT</span>
                </span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
                End-to-end encrypted file transfer directly in your browser. Zero accounts, zero tracking, zero permanent storage.
              </p>

              {/* Status & Action Strip */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href="/live"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-[#F00064]/35 bg-[#F00064]/10 px-4 py-1.5 text-xs font-medium text-[#FF4D8D] transition-colors duration-150 hover:border-[#F00064]/60 hover:bg-[#F00064]/20 hover:text-[#FF70A4]"
                >
                  <span>Start live session</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[#27272A] bg-[#111114] px-3.5 py-1.5 text-xs font-medium text-[#D4D4D8] transition-colors duration-150 hover:border-[#3F3F46] hover:bg-[#17171B] hover:text-[#F4F4F5]"
                >
                  <Github className="h-3.5 w-3.5 text-[#A1A1AA]" aria-hidden="true" />
                  <span>Source on GitHub</span>
                  <ArrowUpRight className="h-3 w-3 text-[#94949E]" aria-hidden="true" />
                </a>
              </div>

              {/* Compact Gateway Pill */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#111114]/80 px-3 py-2 text-xs text-[#A1A1AA]">
                <span className="footer-status-dot" aria-hidden="true">
                  <span className="footer-status-dot-core" />
                </span>
                <span className="font-medium text-[#D4D4D8]">Gateway online</span>
                <span className="text-[#52525B]" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-[#94949E]">
                  <Lock className="h-3 w-3 text-[#FF4D8D]" aria-hidden="true" />
                  <span>Client-side encryption</span>
                </span>
              </div>
            </div>

            {/* Organized Link Columns */}
            <nav aria-label="Footer" className="min-w-0 lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-10">
                {navColumns.map((column) => (
                  <div key={column.id} className="min-w-0">
                    <h2
                      id={column.id}
                      className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F4F4F5]"
                    >
                      {column.heading}
                    </h2>
                    <ul aria-labelledby={column.id} className="mt-4 space-y-1.5">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          {item.internal ? (
                            <Link to={item.href} className="footer-nav-link">
                              <span>{item.label}</span>
                            </Link>
                          ) : (
                            <a href={item.href} className="footer-nav-link">
                              <span>{item.label}</span>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          {/* Bottom Utility & Crypto Metadata Bar */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#27272A] pt-6 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#94949E]">
              <span>© 2026 Transfera</span>
              <span className="text-[#3F3F46]" aria-hidden="true">·</span>
              <a
                href="https://github.com/Mohammed-razin-cr/transfera/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[24px] items-center gap-1 text-[#A1A1AA] transition-colors hover:text-[#F4F4F5]"
              >
                <span>MIT License</span>
                <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
              </a>
              <span className="text-[#3F3F46]" aria-hidden="true">·</span>
              <span>Zero server disk writes</span>
            </div>

            <div className="footer-pill-row">
              {specBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-[#27272A] bg-[#111114] px-2.5 py-1 font-mono text-[11px] text-[#A1A1AA]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
