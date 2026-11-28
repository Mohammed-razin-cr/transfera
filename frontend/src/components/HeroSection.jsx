import { ArrowUpRight, KeyRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import TransferPreview from './TransferPreview'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-[#27272A] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      {/* Subtle static ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(240, 0, 100, 0.08) 0%, transparent 75%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="section-inner">
          <div className="mx-auto max-w-2xl text-center">
            {/* Category Label */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="hero-status-pill inline-flex items-center gap-2.5 rounded-full border border-[#27272A] bg-[#111114]/90 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="hero-status-dot" aria-hidden="true">
                <span className="hero-status-dot-core" />
              </span>
              <span className="relative z-10 text-xs font-medium tracking-tight text-[#D4D4D8]">
                End-to-end encrypted file transfer
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="hero-heading mt-6">
              Your files. Your devices. Seamlessly connected.
            </h1>

            {/* Supporting Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Send files directly between devices through your browser. No account, no installation, just simple and secure transfers.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/live" className="btn-primary w-full sm:w-auto">
                <span>Start transfer</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#receive" className="btn-secondary w-full sm:w-auto">
                <KeyRound className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                <span>Receive with key</span>
              </a>
            </div>

            {/* Telemetry Status Strip */}
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-mono text-[0.75rem] tracking-[0.015em] text-[#A1A1AA]">
              <span className="inline-flex items-center gap-2 font-medium text-[#E4E4E7]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span>Gateway online</span>
              </span>
              <span className="text-[#52525B]" aria-hidden="true">/</span>
              <span>NaCl secretbox</span>
              <span className="text-[#52525B]" aria-hidden="true">/</span>
              <span>Zero server storage</span>
            </p>
          </div>

          {/* Product Preview */}
          <div className="mx-auto mt-12 max-w-4xl sm:mt-14">
            <TransferPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
