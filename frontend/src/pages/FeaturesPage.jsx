import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BarChart3, Database, FolderSync, Lock, QrCode, Wifi } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  {
    icon: Wifi,
    num: '01',
    title: 'Direct Device-to-Device',
    description:
      'Files flow directly between your devices through encrypted WebRTC DataChannels without intermediate server storage.',
    tag: 'WebRTC',
  },
  {
    icon: Lock,
    num: '02',
    title: 'End-to-End Encryption',
    description:
      'NaCl secretbox with Poly1305 + XSalsa20. 256-bit keys derived locally from your Access Key.',
    tag: 'NaCl Secretbox',
  },
  {
    icon: QrCode,
    num: '03',
    title: 'QR Code Pairing',
    description:
      'Scan a QR code to pair devices instantly between phone and desktop without typing.',
    tag: 'Instant Pairing',
  },
  {
    icon: Database,
    num: '04',
    title: 'Temporary Vault Storage',
    description:
      'Holds encrypted payloads in memory for up to 10 minutes when the receiving device is offline, then purges automatically.',
    tag: 'Auto-Purge',
  },
  {
    icon: FolderSync,
    num: '05',
    title: 'Multi-File Sharing',
    description:
      'Send multiple files in a single session — streamed natively over WebRTC or archived before encryption in Vault mode.',
    tag: 'Batch Transfer',
  },
  {
    icon: BarChart3,
    num: '06',
    title: 'Real-Time Progress',
    description:
      'Monitor transfer speed, progress, and connection mode in real time while keeping keys local.',
    tag: 'Live Metrics',
  },
]

export default function FeaturesPage() {
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

              <p className="eyebrow-label mt-8">Capabilities</p>
              <h1 className="page-heading mt-3">Built for private transfers</h1>
              <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                Six core capabilities designed to move files between devices without accounts or persistent storage.
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
            <div className="section-inner">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.num} className="surface-panel p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#F00064]">{feature.num}</span>
                      <span className="rounded-md border border-[#27272A] bg-[#17171B] px-2 py-0.5 font-mono text-[11px] text-[#A1A1AA]">
                        {feature.tag}
                      </span>
                    </div>
                    <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B] text-[#F00064]">
                      <feature.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-[#F4F4F5]">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{feature.description}</p>
                  </div>
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
