import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Lock, QrCode, Shield, Smartphone, Wifi, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const steps = [
  {
    step: '01',
    icon: Wifi,
    title: 'Open Transfera on the Origin device',
    description:
      'Open Transfera in any modern browser — no install, no account, no signup. Your browser generates a unique Access Key and a QR code tied to a private encrypted room.',
    detail:
      'The Access Key is derived from a 256-bit random secret generated entirely in your browser. It never leaves your device unencrypted.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Pair the Destination device',
    description:
      'On the receiving device, scan the QR code or type the Access Key. Both devices are linked in a private encrypted room on the Secure Gateway.',
    detail:
      'The room token is a 16-character hash — the server can route it, but it contains zero information about your files or identity.',
  },
  {
    step: '03',
    icon: Lock,
    title: 'Files are encrypted in-browser',
    description:
      'Before any byte leaves your device, Transfera encrypts your files using NaCl secretbox (XSalsa20 stream cipher + Poly1305 authentication tag).',
    detail:
      'Even if the relay is inspected, your files remain ciphertext. Only the device with the matching Access Key can decrypt.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Direct WebRTC transfer begins',
    description:
      'When both devices are reachable, Transfera establishes a direct peer-to-peer WebRTC DataChannel. Files flow device-to-device without server storage.',
    detail:
      'WebRTC uses DTLS 1.2 + SRTP for transport encryption on top of the NaCl encryption layer.',
  },
  {
    step: '05',
    icon: Shield,
    title: 'Encrypted relay fallback',
    description:
      'If a direct connection is blocked by NAT or firewall, Transfera falls back to the Secure Gateway relay. Your files remain NaCl encrypted throughout.',
    detail:
      'Vault Storage holds encrypted payloads in memory for up to 10 minutes when the receiver is offline, then purges them automatically.',
  },
  {
    step: '06',
    icon: Smartphone,
    title: 'Destination receives and decrypts',
    description:
      'The receiving device decrypts the stream locally using the shared Access Key and saves the files directly to disk.',
    detail:
      'Transfera never writes your files to disk on the server side. The entire transfer pipeline is end-to-end encrypted.',
  },
]

export default function HowItWorksPage() {
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

              <p className="eyebrow-label mt-8">Protocol</p>
              <h1 className="page-heading mt-3">How Transfera works</h1>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                Six stages from file selection to local decryption. End-to-end encrypted, with no accounts and no permanent server storage.
              </p>

              <div className="mt-8">
                <a href="/live" className="btn-primary">
                  <span>Start transfer</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="section-container">
            <div className="section-inner max-w-3xl">
              <ol className="divide-y divide-[#27272A] border-y border-[#27272A]">
                {steps.map((step) => (
                  <li key={step.step} className="flex gap-5 py-8 sm:gap-7">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#111114] text-[#F00064]">
                      <step.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-[#F00064]">Step {step.step}</span>
                      <h2 className="mt-1.5 text-lg font-semibold text-[#F4F4F5]">{step.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{step.description}</p>
                      <p className="mt-3 rounded-lg border border-[#27272A] bg-[#111114] px-3.5 py-2.5 font-mono text-xs leading-relaxed text-[#71717A]">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
