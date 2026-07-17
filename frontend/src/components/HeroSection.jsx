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

export default function HeroSection() {
  return (
    <section className="relative min-h-[96vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 12% 25%, rgba(255,0,104,0.13) 0%, transparent 52%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 78% 55%, rgba(145,1,61,0.07) 0%, transparent 48%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 58%, rgba(16,2,10,0.95) 100%)' }}
        />
      </div>

      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,104,0.4) 30%, rgba(255,0,104,0.4) 70%, transparent)' }}
      />

      <div
        className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,104,0.12) 50%, transparent 100%)', top: '30%' }}
      />

      <div className="section-container relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="section-inner">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-7 max-w-3xl">
              <span className="eyebrow-label flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                Private transfer protocol - v3
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: 'linear-gradient(90deg, rgba(255,0,104,0.4), transparent)' }}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="hero-title text-[clamp(52px,8.2vw,110px)] text-white mb-6"
            >
              Secure File
              <br />
              <span className="gradient-text">Transfer</span>
              <br />
              Between Devices.
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle mb-8 max-w-xl">
              Send files from phone to PC or between any browsers with end-to-end encryption, QR pairing, and no account required.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/live" className="btn-primary group w-full sm:w-auto">
                <span>Start Secure Transfer</span>
                <span className="btn-icon">
                  <motion.span className="flex" whileHover={{ x: 3, y: -3 }} transition={{ duration: 0.2 }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </a>
              <a href="#security" className="btn-secondary group w-full sm:w-auto">
                <Eye className="w-4 h-4" />
                <span>View Architecture</span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <span className="hero-trust-pill">
                <Radio className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                Secure Gateway Online
              </span>
              <span className="hero-trust-pill">
                <ShieldCheck className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                End-to-end encrypted
              </span>
              <span className="hero-trust-pill">
                <Fingerprint className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                No account required
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
