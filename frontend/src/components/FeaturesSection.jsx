import { motion } from 'framer-motion'
import { Wifi, Lock, QrCode, Database, FolderSync, BarChart3 } from 'lucide-react'

const features = [
  { icon: Wifi,       num: '01', title: 'Direct Device-to-Device',  description: 'Files flow directly between your devices through encrypted WebRTC channels. No intermediate servers ever touch your data.' },
  { icon: Lock,       num: '02', title: 'End-to-End Encryption',    description: 'NaCl secretbox with Poly1305 + XSalsa20. 256-bit keys derived from your Access Key. Zero-knowledge protection.' },
  { icon: QrCode,     num: '03', title: 'QR Code Pairing',          description: 'Scan a QR code to instantly pair devices. No account creation, no password memorization, no friction.' },
  { icon: Database,   num: '04', title: 'Temporary Vault Storage',  description: 'Vault Storage mode holds encrypted files for 10 minutes when the Destination Node is offline. Zero persistent storage.' },
  { icon: FolderSync, num: '05', title: 'Multi-File Sharing',       description: 'Send multiple files or entire folders in one batch. Auto-zipped for DirectLink, native for Vault Storage.' },
  { icon: BarChart3,  num: '06', title: 'Real-Time Analytics',      description: 'Monitor transfer speed, progress, and encryption status in real-time. Full visibility, zero compromise.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 lg:py-40">
      {/* Top hairline glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,0,104,0.35), transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <div className="flex items-center gap-5 mb-7">
              <span className="eyebrow-label">Capabilities</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="section-heading text-[clamp(40px,5vw,62px)] leading-none">
                Built for<br />
                <span className="gradient-text">Modern</span><br />
                Security
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.012px' }}>
                Every feature engineered with privacy-first principles. Your data belongs to you, and only you.
              </p>
            </div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="features-grid"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group feature-card cursor-default"
              >
                {/* Number */}
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-7"
                  style={{ color: 'rgba(255,0,104,0.35)' }}>
                  {feature.num}
                </div>

                {/* Icon */}
                <div className="mb-5 relative">
                  <div className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.15) 0%, transparent 70%)' }} />
                  <feature.icon
                    className="w-5 h-5 relative z-10 transition-all duration-500 group-hover:scale-110"
                    style={{ color: 'rgba(255,0,104,0.6)' }}
                  />
                </div>

                {/* Title */}
                <h3 className="section-heading text-[1.1rem] mb-3 transition-colors duration-300 group-hover:text-[var(--color-plasma-pink)]"
                  style={{ letterSpacing: '-0.021px' }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.012px' }}>
                  {feature.description}
                </p>

                {/* Hover bottom pink accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"
                  style={{ background: 'linear-gradient(90deg, rgba(255,0,104,0.7), rgba(255,0,104,0.2))' }} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
