import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqGroups = [
  {
    category: 'Privacy & Security',
    items: [
      {
        q: 'Does Transfera store my files on a server?',
        a: 'No. Transfera never stores your files permanently. In DirectLink (WebRTC) mode, files travel directly between devices. In Vault Storage mode, an encrypted blob is held in memory for up to 10 minutes and then automatically purged.',
      },
      {
        q: 'Can the Transfera server read my files?',
        a: 'No. All files are encrypted with NaCl secretbox (XSalsa20 + Poly1305) in your browser before they leave your device. The server only ever sees opaque encrypted bytes.',
      },
      {
        q: 'How is the encryption key generated?',
        a: 'The Access Key is derived from a 256-bit random secret generated using the Web Crypto API (window.crypto.getRandomValues). Keys are derived locally via SHA-256 / PBKDF2-SHA256.',
      },
      {
        q: 'Is the connection really peer-to-peer?',
        a: 'Yes, when both devices are reachable. Transfera first attempts a WebRTC DataChannel connection directly between devices. If NAT traversal fails, it falls back to the encrypted relay while keeping your data NaCl encrypted.',
      },
    ],
  },
  {
    category: 'Usage',
    items: [
      {
        q: 'Do I need to create an account?',
        a: 'No account, no email, no password. Each transfer session is temporary and tied only to the Access Key.',
      },
      {
        q: 'What file types and sizes are supported?',
        a: 'Transfera supports any file type. In DirectLink (WebRTC) mode, file size is limited only by the receiving device. In Vault Storage mode, encrypted payloads are capped to protect relay memory.',
      },
      {
        q: 'Can I send multiple files at once?',
        a: 'Yes. Transfera supports multi-file batch transfers. In DirectLink mode, files are streamed natively. In Vault Storage mode, multiple files are archived before encryption.',
      },
      {
        q: 'What browsers are supported?',
        a: 'All modern browsers that support WebRTC and the Web Crypto API — Chrome, Firefox, Safari 15+, Edge, and modern mobile browsers.',
      },
      {
        q: 'What happens if the receiver is offline when I send?',
        a: 'If the Destination Node is offline, Transfera offers Vault Storage mode. Your encrypted file is held in memory on the relay for up to 10 minutes so the receiver can retrieve it with the same Access Key.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'What encryption cipher does Transfera use?',
        a: 'Transfera uses NaCl secretbox — XSalsa20 stream cipher with Poly1305 MAC.',
      },
      {
        q: 'Is Transfera open source?',
        a: 'Yes. The full source code is available on GitHub under the MIT License.',
      },
      {
        q: 'How does the QR code work?',
        a: 'The QR code encodes the transfer URL including the Access Key fragment. Scanning it on the receiving device opens Transfera ready to decrypt — generated entirely client-side.',
      },
    ],
  },
]

export default function FAQPage() {
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

              <p className="eyebrow-label mt-8">Help</p>
              <h1 className="page-heading mt-3">Frequently asked questions</h1>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                Everything you need to know about how Transfera works, what it encrypts, and what it does not store.
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
            <div className="section-inner max-w-3xl space-y-14">
              {faqGroups.map((group) => (
                <div key={group.category}>
                  <h2 className="eyebrow-label mb-4">{group.category}</h2>
                  <div className="faq-accordion border-t border-[#27272A]">
                    {group.items.map((item) => (
                      <details key={item.q}>
                        <summary>{item.q}</summary>
                        <p className="faq-answer">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}

              <div className="surface-panel flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold text-[#F4F4F5]">Still have questions?</h2>
                  <p className="mt-1 text-sm text-[#A1A1AA]">
                    Inspect the source code or open an issue on GitHub.
                  </p>
                </div>
                <a
                  href="https://github.com/Mohammed-razin-cr/transfera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary shrink-0"
                >
                  <span>View on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
