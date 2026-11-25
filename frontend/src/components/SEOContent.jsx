import { Link } from 'react-router-dom'
import { ArrowUpRight, Laptop, Monitor, Smartphone, Tablet } from 'lucide-react'

const platforms = [
  { icon: Laptop, name: 'macOS & Windows', note: 'Chrome, Edge, Firefox, Safari' },
  { icon: Smartphone, name: 'iOS & Android', note: 'Mobile Safari, Chrome, QR scan' },
  { icon: Monitor, name: 'Linux Desktop', note: 'Any modern WebRTC browser' },
  { icon: Tablet, name: 'Tablets & iPads', note: 'Instant browser handoff' },
]

const useCases = [
  {
    title: 'Phone to computer',
    description:
      'Move photos, documents, and videos from a phone to a laptop without emailing them to yourself or installing an app.',
  },
  {
    title: 'Private client delivery',
    description:
      'Share sensitive project files through a temporary transfer session instead of a permanent cloud link.',
  },
  {
    title: 'Cross-platform handoff',
    description:
      'Transfer between Windows, macOS, Linux, Android, and iOS devices using only a modern web browser.',
  },
]

const faqs = [
  {
    q: 'Do I need an account to transfer files?',
    a: 'No. Transfera uses a temporary Access Key or QR code to pair devices, so neither sender nor receiver needs to register.',
  },
  {
    q: 'Are files encrypted?',
    a: 'Yes. Transfera encrypts file data in your browser with NaCl secretbox before transport. Direct sessions use an encrypted WebRTC peer connection, and relay fallback carries encrypted bytes.',
  },
  {
    q: 'Are transferred files stored permanently?',
    a: 'No. Direct transfers do not use server file storage. If encrypted relay fallback is required, the temporary payload is held in memory and expires after 10 minutes.',
  },
  {
    q: 'Can I send files from a phone to a PC?',
    a: 'Yes. Open Transfera on both devices, scan the QR code or enter the Access Key, then select the files on your phone.',
  },
]

export default function SEOContent() {
  return (
    <>
      {/* Device Compatibility & Use Cases */}
      <section className="border-b border-[#27272A] py-20 sm:py-24 lg:py-28">
        <div className="section-container">
          <div className="section-inner">
            <div className="max-w-2xl">
              <span className="eyebrow-label">Device compatibility</span>
              <h2 className="section-heading mt-3">
                Works across every modern browser
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                No native app, no browser extension, and no local network restriction. Pair any two devices with a browser.
              </p>
            </div>

            {/* Platform Strip */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="surface-panel flex items-center gap-3.5 px-4 py-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B] text-[#A1A1AA]">
                    <platform.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F4F4F5]">{platform.name}</p>
                    <p className="truncate text-xs text-[#94949E]">{platform.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Use cases */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#27272A] pt-10 md:grid-cols-3">
              {useCases.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-semibold text-[#F4F4F5]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Related Guides */}
            <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-[#27272A] pt-6">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-[#94949E]">
                Guides
              </span>
              <a
                href="/transfer-files-between-devices"
                className="rounded-md border border-[#27272A] bg-[#111114] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#F4F4F5]"
              >
                Transfer files between devices
              </a>
              <a
                href="/send-files-phone-to-pc"
                className="rounded-md border border-[#27272A] bg-[#111114] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#F4F4F5]"
              >
                Send files from phone to PC
              </a>
              <a
                href="/private-file-sharing"
                className="rounded-md border border-[#27272A] bg-[#111114] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#F4F4F5]"
              >
                Private file sharing
              </a>
              <a
                href="/wetransfer-alternative"
                className="rounded-md border border-[#27272A] bg-[#111114] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#3F3F46] hover:text-[#F4F4F5]"
              >
                Compare with WeTransfer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-[#27272A] bg-[#111114]/40 py-20 sm:py-24 lg:py-28">
        <div className="section-container">
          <div className="section-inner">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="eyebrow-label">FAQ</span>
                <h2 className="section-heading mt-3">Common questions</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                  Answers about encryption, ephemeral vault storage, and browser compatibility.
                </p>
                <div className="mt-6">
                  <Link
                    to="/faq"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F00064] transition-colors hover:text-[#FF1F7A]"
                  >
                    <span>Read all questions</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="faq-accordion border-t border-[#27272A] lg:col-span-7">
                {faqs.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p className="faq-answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="section-container">
          <div className="section-inner">
            <div className="surface-panel flex flex-col items-start justify-between gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="eyebrow-label">Ready when you are</span>
                <h2 className="section-heading mt-2">
                  Start an encrypted transfer in seconds
                </h2>
                <p className="mt-2 text-sm text-[#A1A1AA] sm:text-base">
                  No sign-up, no tracking, and no permanent server storage. Pair two devices and send.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a href="/live" className="btn-primary w-full sm:w-auto">
                  <span>Start transfer</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#receive" className="btn-secondary w-full sm:w-auto">
                  <span>Enter Access Key</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
