import { Link } from 'react-router-dom'
import { ArrowUpRight, Lock, Server, ShieldCheck, User } from 'lucide-react'

const pipelineStages = [
  {
    icon: User,
    step: 'Origin Node',
    detail: '256-bit key derived locally via Web Crypto. Never sent in plaintext.',
  },
  {
    icon: Lock,
    step: 'NaCl Secretbox',
    detail: 'XSalsa20 stream cipher + Poly1305 authentication tag in-browser.',
  },
  {
    icon: Server,
    step: 'Zero-Knowledge Gateway',
    detail: 'Routes only 16-char room tokens and opaque ciphertext. Zero disk writes.',
  },
  {
    icon: ShieldCheck,
    step: 'Destination Node',
    detail: 'Decrypts locally using the shared Access Key and saves directly to device.',
  },
]

const specs = [
  { label: 'Cipher', value: 'XSalsa20 + Poly1305 (NaCl secretbox)' },
  { label: 'Key length', value: '256-bit (32 bytes)' },
  { label: 'Key derivation', value: 'SHA-256 / PBKDF2' },
  { label: 'Transport', value: 'WebRTC DataChannel (DTLS 1.2 + SRTP)' },
  { label: 'Vault fallback', value: 'In-memory encrypted, 10-min auto-purge' },
  { label: 'Server storage', value: 'None — zero plaintext on disk' },
]

export default function SecuritySection() {
  return (
    <section id="security" className="border-b border-[#27272A] bg-[#111114]/40 py-20 sm:py-24 lg:py-28">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Narrative & Pipeline */}
            <div className="lg:col-span-6">
              <span className="eyebrow-label">Security & privacy</span>
              <h2 className="section-heading mt-3">
                Encrypted before it leaves your device
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                The Transfera gateway cannot read your files, filenames, or keys. Every byte is encrypted client-side before transport.
              </p>

              <ol className="mt-8 space-y-4">
                {pipelineStages.map((stage, idx) => (
                  <li key={stage.step} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B] text-[#F00064]">
                      <stage.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#F4F4F5]">
                        <span className="mr-2 font-mono text-xs text-[#94949E]">0{idx + 1}</span>
                        {stage.step}
                      </p>
                      <p className="mt-0.5 text-sm text-[#A1A1AA]">{stage.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Link
                  to="/security"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F00064] transition-colors hover:text-[#FF1F7A]"
                >
                  <span>Explore security architecture</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Specification Panel */}
            <div className="lg:col-span-6 lg:self-center">
              <div className="surface-panel overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#27272A] bg-[#111114] px-5 py-3.5">
                  <span className="text-xs font-semibold text-[#F4F4F5]">
                    Cryptographic specification
                  </span>
                  <span className="text-xs font-medium text-[#10B981]">Open source · MIT</span>
                </div>
                <dl className="divide-y divide-[#27272A]">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <dt className="text-xs font-medium text-[#A1A1AA]">{spec.label}</dt>
                      <dd className="font-mono text-xs text-[#F4F4F5] sm:text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
