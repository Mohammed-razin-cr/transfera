import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'

const linkColumns = {
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
    { label: 'FAQ', href: '/faq', internal: true },
  ],
  Project: [
    { label: 'WeTransfer Alternative', href: '/wetransfer-alternative' },
    { label: 'GitHub', href: 'https://github.com/Mohammed-razin-cr/transfera', external: true },
    { label: 'MIT License', href: 'https://github.com/Mohammed-razin-cr/transfera/blob/main/LICENSE', external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B] py-16">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2.5 group" aria-label="Transfera home">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114]">
                  <img
                    src="/static/logo.png"
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-[#F4F4F5]">
                  Transfera
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
                End-to-end encrypted file transfer directly in your browser. No accounts, no permanent storage.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-8 w-8"
                  aria-label="Transfera on GitHub"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(linkColumns).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F4F4F5]">
                  {category}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.internal ? (
                        <Link
                          to={item.href}
                          className="text-sm text-[#A1A1AA] transition-colors duration-150 hover:text-[#F4F4F5]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1 text-sm text-[#A1A1AA] transition-colors duration-150 hover:text-[#F4F4F5]"
                        >
                          <span>{item.label}</span>
                          {item.external && <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#27272A] pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-[#94949E]">
              © 2026 Transfera · Open source under MIT License
            </p>
            <p className="text-xs text-[#94949E]">
              NaCl secretbox · WebRTC DataChannel
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
