import { KeyRound, QrCode, Wifi, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    num: '01',
    icon: KeyRound,
    title: 'Create a private session',
    description:
      'Open Transfera and select your files. Your browser generates a temporary Access Key and QR code from local entropy.',
  },
  {
    num: '02',
    icon: QrCode,
    title: 'Pair the receiving device',
    description:
      'Scan the QR code or enter the Access Key on the second device. No account, app install, or email required.',
  },
  {
    num: '03',
    icon: Wifi,
    title: 'Transfer directly, encrypted',
    description:
      'Files stream peer-to-peer over WebRTC DataChannel with NaCl encryption, or fall back to an encrypted 10-minute relay.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="how-it-works" className="border-b border-[#27272A] py-20 sm:py-24 lg:py-28">
      <div className="section-container">
        <div className="section-inner">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow-label">How it works</span>
              <h2 className="section-heading mt-3 max-w-lg">
                Three steps from one device to another
              </h2>
            </div>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A1A1AA] transition-colors hover:text-[#F4F4F5]"
            >
              <span>Read protocol details</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 divide-y divide-[#27272A] border-y border-[#27272A] md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step) => (
              <div key={step.num} className="py-8 md:px-7 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#F00064]">{step.num}</span>
                  <step.icon className="h-4 w-4 text-[#94949E]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#F4F4F5]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
