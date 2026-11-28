import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const navColumns = [
  {
    id: 'footer-product',
    heading: 'NAVIGATE',
    items: [
      { label: 'Live Transfer', href: '/live' },
      { label: 'Features', href: '/features', internal: true },
      { label: 'How it Works', href: '/how-it-works', internal: true },
      { label: 'Security', href: '/security', internal: true },
      { label: 'FAQ', href: '/faq', internal: true },
    ],
  },
  {
    id: 'footer-guides',
    heading: 'GUIDES',
    items: [
      { label: 'Secure Transfer', href: '/secure-file-transfer' },
      { label: 'Encrypted Transfer', href: '/encrypted-file-transfer' },
      { label: 'Between Devices', href: '/transfer-files-between-devices' },
      { label: 'Phone to PC', href: '/send-files-phone-to-pc' },
      { label: 'Private Sharing', href: '/private-file-sharing' },
    ],
  },
  {
    id: 'footer-project',
    heading: 'CONNECT',
    items: [
      {
        label: 'GitHub',
        href: 'https://github.com/Mohammed-razin-cr/transfera',
        external: true,
      },
      {
        label: 'MIT License',
        href: 'https://github.com/Mohammed-razin-cr/transfera/blob/main/LICENSE',
        external: true,
      },
      { label: 'Browser Transfer', href: '/browser-file-transfer' },
      { label: 'vs WeTransfer', href: '/wetransfer-alternative' },
    ],
  },
]

function FooterLinkItem({ item }) {
  const arrowIcon = (
    <ArrowUpRight
      className="footer-grid-arrow h-3.5 w-3.5 shrink-0 text-[#FF4D8D]"
      aria-hidden="true"
    />
  )

  if (item.internal) {
    return (
      <Link to={item.href} className="footer-grid-link group/link">
        <span>{item.label}</span>
        {arrowIcon}
      </Link>
    )
  }

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className="footer-grid-link group/link"
    >
      <span>{item.label}</span>
      {arrowIcon}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B]">
      <div className="section-container">
        <div className="section-inner border-x border-[#27272A]">
          {/* Uilora GridFooter Architectural Divided Layout */}
          <div className="grid grid-cols-1 divide-y divide-[#27272A] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            {/* Brand Cell */}
            <div className="flex min-w-0 flex-col justify-between gap-10 p-6 transition-colors duration-300 hover:bg-[#111114]/60 sm:p-8 lg:col-span-5 lg:p-10">
              <Link
                to="/"
                className="inline-flex min-h-[36px] w-fit items-center gap-2.5"
                aria-label="Transfera home"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114]">
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

              <div className="space-y-4">
                <p className="font-display max-w-sm text-2xl font-semibold leading-tight tracking-tight text-[#F4F4F5] sm:text-[1.75rem]">
                  Direct encrypted transfers. Zero server storage.
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
                  Browser-to-browser delivery using WebRTC DataChannel, AES-256-GCM, and NaCl secretbox.
                </p>
                <div className="pt-1">
                  <a
                    href="/live"
                    className="footer-grid-cta group/cta inline-flex min-h-[32px] items-center gap-2 text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#FF4D8D]"
                  >
                    <span>Start live session</span>
                    <ArrowUpRight
                      className="footer-grid-cta-arrow h-4 w-4 text-[#FF4D8D]"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Divided Navigation Cells */}
            <nav
              aria-label="Footer"
              className="grid min-w-0 grid-cols-1 divide-y divide-[#27272A] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-7"
            >
              {navColumns.map((column) => (
                <div
                  key={column.id}
                  className="flex min-w-0 flex-col gap-5 p-6 transition-colors duration-300 hover:bg-[#111114]/60 sm:p-7 lg:p-9"
                >
                  <h2
                    id={column.id}
                    className="font-mono text-xs uppercase tracking-[0.1em] text-[#94949E]"
                  >
                    {column.heading}
                  </h2>
                  <ul aria-labelledby={column.id} className="space-y-1.5">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <FooterLinkItem item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#27272A]">
        <div className="section-container">
          <div className="section-inner flex flex-col items-start justify-between gap-2 border-x border-[#27272A] px-6 py-5 text-xs text-[#94949E] sm:flex-row sm:items-center sm:px-8">
            <p>© 2026 Transfera · Open source software</p>
            <p className="font-mono text-[11px] text-[#94949E]">
              WebRTC · AES-256-GCM · Zero disk writes
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
