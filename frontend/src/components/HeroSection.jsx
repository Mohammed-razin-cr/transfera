import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, ShieldCheck, Radio, Fingerprint } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const headlineLineVariants = {
  hidden: { opacity: 0, y: '110%', rotateX: -12 },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroSection() {
  const scrollToSection = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(242,10,103,0.09) 0%, transparent 55%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 80% 60%, rgba(99,204,232,0.035) 0%, transparent 48%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 58%, rgba(9,8,11,0.96) 100%)' }}
        />
      </div>

      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(242,10,103,0.22) 30%, rgba(242,10,103,0.22) 70%, transparent)' }}
      />

      <div
        className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(242,10,103,0.07) 50%, transparent 100%)', top: '30%' }}
      />

      <div className="section-container relative z-10 py-12 sm:py-16 lg:py-24">
        <div className="section-inner">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-3 mb-6 sm:mb-7">
              <span className="eyebrow-label flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,0,104,0.08)', border: '1px solid rgba(255,0,104,0.2)' }}>
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--color-plasma-pink)' }} />
                Private transfer protocol - v3
              </span>
            </motion.div>

            <motion.h1
              variants={headlineVariants}
              className="hero-title hero-title-xl text-white mb-5 sm:mb-6 flex flex-col items-center text-center"
              aria-label="Secure File Transfer Between Devices."
            >
              <span className="hero-title-line-mask text-center" aria-hidden="true">
                <motion.span variants={headlineLineVariants} className="hero-title-line text-center">
                  Secure File
                </motion.span>
              </span>
              <span className="hero-title-line-mask text-center" aria-hidden="true">
                <motion.span variants={headlineLineVariants} className="hero-title-line gradient-text hero-title-accent mx-auto text-center">
                  Transfer
                </motion.span>
              </span>
              <span className="hero-title-line-mask text-center" aria-hidden="true">
                <motion.span variants={headlineLineVariants} className="hero-title-line text-center">
                  Between Devices.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle mb-7 sm:mb-8 max-w-xl mx-auto text-center">
              Send files from phone to PC or between any browsers with end-to-end encryption, QR pairing, and no account required.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-7 sm:mb-8 w-full sm:w-auto">
              <a href="/live" className="btn-primary group w-full sm:w-auto">
                <span>Start Secure Transfer</span>
                <span className="btn-icon">
                  <motion.span className="flex" whileHover={{ x: 3, y: -3 }} transition={{ duration: 0.2 }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </a>
              <button
                onClick={scrollToSection('security')}
                className="btn-secondary group w-full sm:w-auto"
                type="button"
                aria-label="Scroll to security architecture section"
              >
                <Eye className="w-4 h-4" />
                <span>View Architecture</span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="hero-trust-pill" style={{ borderColor: 'rgba(69,214,160,0.2)', background: 'rgba(69,214,160,0.05)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-status-online)', boxShadow: '0 0 6px rgba(69,214,160,0.6)' }} />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Gateway Online</span>
              </span>
              <span className="hero-trust-pill">
                <ShieldCheck className="h-3 w-3" style={{ color: 'var(--color-signal-cyan)' }} />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>E2E Encrypted</span>
              </span>
              <span className="hero-trust-pill">
                <Fingerprint className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>No Account</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
