import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, Shield, Zap, QrCode, Wifi, Lock, Smartphone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const steps = [
  {
    step: '01',
    icon: Wifi,
    title: 'Open Transfera on the Origin device',
    description: 'Navigate to transfera on any modern browser — no install, no account, no signup. Transfera generates a unique 4-word Access Key and a QR code tied to a private encrypted room.',
    detail: 'The Access Key is derived from a 256-bit random secret generated entirely in your browser. It never leaves your device unencrypted.',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'Pair the Destination device',
    description: 'On the Destination device, scan the QR code or type the Access Key. Both devices are now linked in a private encrypted room on the Secure Gateway.',
    detail: 'The room token is a 16-character hash — the server can see it, but it contains zero information about your files or identity.',
  },
  {
    step: '03',
    icon: Lock,
    title: 'Files are encrypted in-browser',
    description: 'Before any byte leaves your device, Transfera encrypts your files using NaCl secretbox — XSalsa20 stream cipher + Poly1305 authentication tag. The key is derived from your Access Key.',
    detail: 'Even if the relay is compromised, your files remain encrypted. Only the device with the matching Access Key can decrypt.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Direct WebRTC transfer begins',
    description: 'When both devices are reachable, Transfera establishes a direct peer-to-peer WebRTC data channel. Files flow device-to-device at wire speed, completely bypassing the server.',
    detail: 'WebRTC uses DTLS 1.2 + SRTP for the connection itself, on top of the NaCl encryption layer — double protection by default.',
  },
  {
    step: '05',
    icon: Shield,
    title: 'Encrypted relay fallback',
    description: 'If a direct connection is blocked by NAT or firewall, Transfera falls back to the Secure Gateway relay. Your files remain NaCl encrypted — the relay only forwards opaque bytes.',
    detail: 'The relay is stateless with respect to file content. It cannot decrypt, store, or inspect your data at any point.',
  },
  {
    step: '06',
    icon: Smartphone,
    title: 'Destination receives and decrypts',
    description: 'The Destination device receives the encrypted stream and decrypts it locally using the shared Access Key. Files are saved directly to the device — clean, private, done.',
    detail: 'Transfera never writes your files to disk on the server side. The entire transfer pipeline is end-to-end encrypted with zero server knowledge.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
      <Navbar />

      <main id="main-content" tabIndex="-1" className="pt-28">
        {/* Hero Banner */}
        <section className="relative py-20 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 40%, rgba(255,0,104,0.09) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 60%, rgba(145,1,61,0.07) 0%, transparent 50%)' }} />
          </div>

          <div className="section-container relative z-10">
            <div className="section-inner">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="/" className="inline-flex items-center gap-2 mb-10 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Home
                </a>

                <div className="flex items-center gap-5 mb-7">
                  <span className="eyebrow-label">Protocol</span>
                  <div className="flex-1 rule-line-full" />
                </div>

                <h1 className="hero-title page-title text-white mb-6">
                  How it<br />
                  <span className="gradient-text">Works</span>
                </h1>
                <p className="hero-subtitle max-w-xl mb-10">
                  Six steps. End-to-end encrypted. No accounts, no storage, no compromise. Here's exactly how Transfera moves your files from one device to another.
                </p>
                <a href="/live" className="btn-primary group inline-flex">
                  <span>Try it now</span>
                  <span className="btn-icon">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
        </section>

        {/* Steps */}
        <section className="relative py-20 sm:py-24 lg:py-36">
          <div className="section-container">
            <div className="section-inner max-w-3xl">
              <div className="flex flex-col gap-0">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.06 }}
                    className="relative flex gap-8 pb-12"
                  >
                    {/* Vertical connector line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-[22px] top-[52px] bottom-0 w-px"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,0,104,0.3), rgba(255,0,104,0.05))' }} />
                    )}

                    {/* Step icon */}
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(255,0,104,0.1)', border: '1px solid rgba(255,0,104,0.25)' }}>
                        <step.icon className="w-4.5 h-4.5" style={{ color: 'rgba(255,0,104,0.8)' }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1.5">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: 'rgba(255,0,104,0.5)' }}>
                        Step {step.step}
                      </div>
                      <h2 className="section-heading text-[1.2rem] mb-3">{step.title}</h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {step.description}
                      </p>
                      <div className="px-4 py-3 rounded-xl text-xs leading-relaxed font-mono"
                        style={{ background: 'rgba(255,0,104,0.04)', border: '1px solid rgba(255,0,104,0.12)', color: 'rgba(255,255,255,0.4)' }}>
                        ↳ {step.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
