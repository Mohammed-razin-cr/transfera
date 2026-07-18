import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqs = [
  {
    category: 'Privacy & Security',
    items: [
      {
        q: 'Does Transfera store my files on a server?',
        a: 'No. Transfera never stores your files on any server. In DirectLink (WebRTC) mode, files travel directly between devices. In Vault Storage mode, an encrypted blob is held in-memory for up to 10 minutes and then automatically purged. No file bytes are ever written to disk.',
      },
      {
        q: 'Can the Transfera server read my files?',
        a: 'No. All files are encrypted with NaCl secretbox (XSalsa20 + Poly1305) in your browser before they leave your device. The server only ever sees opaque encrypted bytes — it has no key and no way to decrypt or inspect your data.',
      },
      {
        q: 'How is the encryption key generated?',
        a: 'The Access Key is derived from a 256-bit random secret generated using the Web Crypto API (window.crypto.getRandomValues) — operating-system-level entropy. A 4-word human-readable phrase is generated from this secret for easy sharing. The actual key is derived via PBKDF2-SHA256 with 100,000 iterations.',
      },
      {
        q: 'Is the connection really peer-to-peer?',
        a: 'Yes, when both devices are reachable. Transfera first attempts a WebRTC DataChannel connection directly between devices. The server only facilitates the initial handshake (SDP offer/answer exchange). If NAT traversal fails, it falls back to the encrypted relay — but your data remains NaCl encrypted throughout.',
      },
    ],
  },
  {
    category: 'Usage',
    items: [
      {
        q: 'Do I need to create an account?',
        a: 'No account, no email, no password. Each transfer session is temporary and tied only to the Access Key. Once the transfer is complete and the session ends, there is nothing left on the server to associate with you.',
      },
      {
        q: 'What file types and sizes are supported?',
        a: 'Transfera supports any file type. In DirectLink (WebRTC) mode, file size is limited only by the receiving device\'s available storage — there is no server-side size cap. In Vault Storage mode, encrypted blobs are currently capped at a practical limit to protect server memory.',
      },
      {
        q: 'Can I send multiple files at once?',
        a: 'Yes. Transfera supports multi-file batch transfers. In DirectLink mode, files are streamed natively. In Vault Storage mode, multiple files are automatically zipped before encryption.',
      },
      {
        q: 'What browsers are supported?',
        a: 'All modern browsers that support WebRTC and the Web Crypto API — Chrome, Firefox, Safari 15+, Edge, and most Chromium-based mobile browsers. No extensions or plugins required.',
      },
      {
        q: 'What happens if the receiver is offline when I send?',
        a: 'If the Destination Node is offline, Transfera offers Vault Storage mode. Your encrypted file is held in-memory on the relay for up to 10 minutes. The receiver can retrieve it within that window using the same Access Key.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'What encryption cipher does Transfera use?',
        a: 'Transfera uses NaCl secretbox — specifically XSalsa20 stream cipher with Poly1305 MAC. This is the same construction used in the libsodium cryptography library, chosen for its simplicity, speed, and strong security properties.',
      },
      {
        q: 'Is Transfera open source?',
        a: 'Yes. The full source code is available on GitHub under the MIT License. You can audit the encryption implementation, the relay server code, and every component of the transfer pipeline.',
      },
      {
        q: 'How does the QR code work?',
        a: 'The QR code encodes the full transfer URL including the Access Key phrase. Scanning it on the Destination device opens Transfera pre-filled with the key — no manual typing needed. The QR code is generated entirely client-side.',
      },
    ],
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors duration-200 group"
      >
        <span className="text-sm font-semibold leading-snug pr-4 group-hover:text-white transition-colors duration-200"
          style={{ color: open ? '#fff' : 'rgba(255,255,255,0.75)' }}>
          {item.q}
        </span>
        <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300"
          style={{
            background: open ? 'rgba(255,0,104,0.15)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${open ? 'rgba(255,0,104,0.3)' : 'rgba(255,255,255,0.1)'}`,
          }}>
          {open
            ? <Minus className="w-3 h-3" style={{ color: 'rgba(255,0,104,0.9)' }} />
            : <Plus className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.5)' }} />
          }
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
      <Navbar />

      <main id="main-content" tabIndex="-1" className="pt-28">
        {/* Hero Banner */}
        <section className="relative py-20 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 40%, rgba(255,0,104,0.09) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 60%, rgba(145,1,61,0.07) 0%, transparent 50%)' }} />
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
                  <span className="eyebrow-label">Help</span>
                  <div className="flex-1 rule-line-full" />
                </div>

                <h1 className="hero-title page-title text-white mb-6">
                  Frequently<br />
                  <span className="gradient-text">Asked</span><br />
                  Questions
                </h1>
                <p className="hero-subtitle max-w-xl mb-10">
                  Everything you need to know about how Transfera works, what it encrypts, and what it doesn't store.
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

        {/* FAQ Sections */}
        <section className="relative py-20 sm:py-24 lg:py-36">
          <div className="section-container">
            <div className="section-inner max-w-3xl">
              {faqs.map((category, catIndex) => (
                <div key={catIndex} className={catIndex > 0 ? 'mt-20' : ''}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-5 mb-8"
                  >
                    <span className="eyebrow-label">{category.category}</span>
                    <div className="flex-1 rule-line-full" />
                  </motion.div>

                  <div>
                    {category.items.map((item, itemIndex) => (
                      <FAQItem key={itemIndex} item={item} index={itemIndex} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Still have questions? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-20 glow-card text-center"
              >
                <h2 className="section-heading text-2xl mb-3">Still have questions?</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Check the source code, open an issue, or start a discussion on GitHub.
                </p>
                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group inline-flex"
                >
                  View on GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
