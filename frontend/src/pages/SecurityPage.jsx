import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, User, Lock, Server, Shield, Eye, Key, Fingerprint, Radio } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pillars = [
  {
    icon: User,
    num: '01',
    title: 'Origin Node',
    description: 'Data originates from your device. The encryption key is generated locally and never transmitted in plaintext.',
    detail: 'Key generation uses the Web Crypto API (window.crypto.getRandomValues) — operating system-level entropy, not a JavaScript PRNG.',
  },
  {
    icon: Lock,
    num: '02',
    title: 'NaCl Secretbox',
    description: 'Poly1305 MAC + XSalsa20 stream cipher. 256-bit keys derived from your Access Key via PBKDF2.',
    detail: 'NaCl (Networking and Cryptography library) was designed by Daniel J. Bernstein. XSalsa20 has a 192-bit nonce — effectively immune to nonce collision.',
  },
  {
    icon: Server,
    num: '03',
    title: 'Secure Gateway',
    description: 'Only sees encrypted handshakes and 16-char room tokens. Zero knowledge of file contents, filenames, or device identity.',
    detail: 'The relay is a simple byte forwarder. It cannot distinguish between a file chunk and a WebRTC handshake payload.',
  },
  {
    icon: Shield,
    num: '04',
    title: 'Destination Node',
    description: 'Receives encrypted data and decrypts locally with the shared key derived from the Access Key.',
    detail: 'Decryption happens entirely in-browser. No file bytes are written to server disk at any point in the pipeline.',
  },
]

const technicalDetails = [
  { icon: Key,         label: 'Cipher',          value: 'XSalsa20 + Poly1305 (NaCl secretbox)' },
  { icon: Fingerprint, label: 'Key length',       value: '256-bit (32 bytes)' },
  { icon: Eye,         label: 'Key derivation',   value: 'PBKDF2-SHA256, 100 000 iterations' },
  { icon: Radio,       label: 'Transport',        value: 'WebRTC DataChannel (DTLS 1.2 + SRTP)' },
  { icon: Lock,        label: 'Relay knowledge',  value: 'Zero — sees only encrypted opaque bytes' },
  { icon: Server,      label: 'Server storage',   value: 'None — stateless relay, purged in-memory' },
]

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
      <Navbar />

      <main className="pt-28">
        {/* Hero Banner */}
        <section className="relative py-20 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 35%, rgba(255,0,104,0.10) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 65%, rgba(145,1,61,0.08) 0%, transparent 50%)' }} />
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
                  <span className="eyebrow-label">Architecture</span>
                  <div className="flex-1 rule-line-full" />
                </div>

                <h1 className="hero-title text-[clamp(48px,7vw,96px)] text-white mb-6">
                  Security<br />
                  <span className="gradient-text">Architecture</span>
                </h1>
                <p className="hero-subtitle max-w-xl mb-10">
                  Four-stage encrypted pipeline. Military-grade cipher. Zero server knowledge. Here is every layer of protection between your files and the outside world.
                </p>
                <a href="/live" className="btn-primary group inline-flex">
                  <span>Start Secure Transfer</span>
                  <span className="btn-icon">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
        </section>

        {/* Pipeline cards */}
        <section className="relative py-20 sm:py-24 lg:py-32">
          <div className="section-container">
            <div className="section-inner">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-14"
              >
                <div className="flex items-center gap-5 mb-6">
                  <span className="eyebrow-label">Pipeline</span>
                  <div className="flex-1 rule-line-full" />
                </div>
                <h2 className="section-heading text-[clamp(32px,4vw,52px)] leading-none">
                  Four-Stage<br />
                  <span className="gradient-text">Encrypted Pipeline</span>
                </h2>
              </motion.div>

              <div className="security-grid">
                {pillars.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="group feature-card"
                  >
                    <div className="font-mono text-[22px] font-bold mb-4"
                      style={{ color: 'rgba(255,0,104,0.3)', letterSpacing: '-0.025px' }}>{point.num}</div>
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-xl mb-4 relative"
                      style={{ border: '1px solid rgba(255,0,104,0.2)', background: 'rgba(255,0,104,0.06)' }}>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.2) 0%, transparent 70%)' }} />
                      <point.icon className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ color: 'rgba(255,0,104,0.7)' }} />
                    </div>
                    <h2 className="section-heading text-base mb-2 transition-colors duration-300 group-hover:text-[var(--color-plasma-pink)]">
                      {point.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{point.description}</p>
                    <div className="px-3 py-2.5 rounded-lg text-[11px] font-mono leading-relaxed"
                      style={{ background: 'rgba(255,0,104,0.04)', border: '1px solid rgba(255,0,104,0.1)', color: 'rgba(255,255,255,0.35)' }}>
                      ↳ {point.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs table */}
        <section className="relative py-20 lg:py-28">
          <div className="absolute top-0 left-0 right-0 rule-line-full" />
          <div className="section-container">
            <div className="section-inner">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-12"
              >
                <div className="flex items-center gap-5 mb-6">
                  <span className="eyebrow-label">Specs</span>
                  <div className="flex-1 rule-line-full" />
                </div>
                <h2 className="section-heading text-[clamp(32px,4vw,52px)] leading-none">
                  Technical<br /><span className="gradient-text">Specifications</span>
                </h2>
              </motion.div>

              <div className="glow-card" style={{ padding: 0 }}>
                {technicalDetails.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className="flex items-center gap-6 px-8 py-5"
                    style={{
                      borderBottom: index < technicalDetails.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-lg"
                      style={{ background: 'rgba(255,0,104,0.08)', border: '1px solid rgba(255,0,104,0.15)' }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,0,104,0.7)' }} />
                    </div>
                    <span className="text-sm font-semibold w-36 shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {item.label}
                    </span>
                    <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {item.value}
                    </span>
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
