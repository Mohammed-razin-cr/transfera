import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Eye, Fingerprint, Key, Lock, Radio, Server, Shield, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pillars = [
  {
    icon: User,
    num: '01',
    title: 'Origin Node',
    description: 'Data originates from your device. The encryption key is generated locally and never transmitted in plaintext.',
    detail: 'Key generation uses the Web Crypto API (window.crypto.getRandomValues) with OS-level entropy.',
  },
  {
    icon: Lock,
    num: '02',
    title: 'NaCl Secretbox',
    description: 'Poly1305 MAC + XSalsa20 stream cipher. 256-bit keys derived from your Access Key.',
    detail: 'XSalsa20 uses a 192-bit nonce, protecting against nonce collision across chunks.',
  },
  {
    icon: Server,
    num: '03',
    title: 'Secure Gateway',
    description: 'Only sees encrypted handshakes and 16-char room tokens. Zero knowledge of file contents or filenames.',
    detail: 'The relay is a stateless forwarder and cannot decrypt or inspect payload bytes.',
  },
  {
    icon: Shield,
    num: '04',
    title: 'Destination Node',
    description: 'Receives encrypted data and decrypts locally with the shared key derived from the Access Key.',
    detail: 'Decryption happens entirely in-browser. No file bytes are written to server disk.',
  },
]

const technicalDetails = [
  { icon: Key, label: 'Cipher', value: 'XSalsa20 + Poly1305 (NaCl secretbox)' },
  { icon: Fingerprint, label: 'Key length', value: '256-bit (32 bytes)' },
  { icon: Eye, label: 'Key derivation', value: 'SHA-256 / PBKDF2-SHA256' },
  { icon: Radio, label: 'Transport', value: 'WebRTC DataChannel (DTLS 1.2 + SRTP)' },
  { icon: Lock, label: 'Relay knowledge', value: 'Zero — sees only encrypted opaque bytes' },
  { icon: Server, label: 'Server storage', value: 'None — stateless relay, in-memory fallback' },
]

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-[#F4F4F5]">
      <Navbar />

      <main id="main-content" tabIndex="-1" className="pt-14">
        <section className="border-b border-[#27272A] py-16 sm:py-20 lg:py-24">
          <div className="section-container">
            <div className="section-inner max-w-3xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-[#F4F4F5]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to home</span>
              </Link>

              <p className="eyebrow-label mt-8">Security architecture</p>
              <h1 className="page-heading mt-3">Built for zero-knowledge privacy</h1>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                Four-stage encrypted pipeline. Your files are encrypted in the browser before they touch the network.
              </p>

              <div className="mt-8">
                <a href="/live" className="btn-primary">
                  <span>Start secure transfer</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#27272A] py-16 sm:py-20">
          <div className="section-container">
            <div className="section-inner">
              <p className="eyebrow-label">Pipeline</p>
              <h2 className="section-heading mt-2">Four-stage encrypted pipeline</h2>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pillars.map((point) => (
                  <div key={point.num} className="surface-panel flex flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#F00064]">{point.num}</span>
                        <point.icon className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#F4F4F5]">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{point.description}</p>
                    </div>
                    <p className="mt-4 rounded-lg border border-[#27272A] bg-[#09090B] p-3 font-mono text-[11px] leading-relaxed text-[#71717A]">
                      {point.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="section-container">
            <div className="section-inner max-w-3xl">
              <p className="eyebrow-label">Specifications</p>
              <h2 className="section-heading mt-2">Technical details</h2>

              <div className="surface-panel mt-8 overflow-hidden">
                <dl className="divide-y divide-[#27272A]">
                  {technicalDetails.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <dt className="flex items-center gap-2.5 text-sm font-medium text-[#A1A1AA]">
                        <item.icon className="h-4 w-4 text-[#F00064]" aria-hidden="true" />
                        <span>{item.label}</span>
                      </dt>
                      <dd className="font-mono text-xs text-[#F4F4F5] sm:text-sm">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
