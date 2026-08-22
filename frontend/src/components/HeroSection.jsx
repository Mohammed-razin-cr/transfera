import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-20">
      <div className="section-container relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="section-inner">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="mb-5 inline-flex items-center justify-center">
              <span className="eyebrow-label flex items-center gap-2 px-3 py-1.5"
                style={{ background: 'rgba(255,0,104,0.08)', border: '1px solid rgba(255,0,104,0.2)', borderRadius: '8px' }}>
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--color-plasma-pink)' }} />
                Encrypted browser transfer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="hero-title hero-title-xl mb-5 flex flex-col items-center text-center text-white sm:mb-6"
              aria-label="Secure File Transfer Between Devices."
            >
              <span className="hero-title-line">Secure file transfer</span>
              <span className="hero-title-line gradient-text">between devices.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle mb-7 max-w-xl text-center sm:mb-8">
              Send files directly from any browser. No account, no install, and no permanent storage.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-6 flex w-full flex-col items-center justify-center gap-3 sm:mb-7 sm:w-auto sm:flex-row">
              <a href="/live" className="btn-primary group w-full sm:w-auto">
                <span>Start transfer</span>
                <span className="btn-icon">
                  <motion.span className="flex" whileHover={{ x: 3, y: -3 }} transition={{ duration: 0.2 }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </a>
              <a href="/how-it-works" className="btn-secondary w-full sm:w-auto">How it works</a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-status-online)', boxShadow: '0 0 6px rgba(69,214,160,0.6)' }} />
                Gateway online
              </span>
              <span aria-hidden="true">/</span>
              <span>End-to-end encrypted</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
