import { motion } from 'framer-motion'
import { Wifi, Lock, QrCode, ArrowUpRight } from 'lucide-react'

const features = [
  { icon: Wifi,       num: '01', title: 'Direct Device-to-Device',  description: 'Files flow directly between your devices through encrypted WebRTC channels. No intermediate servers ever touch your data.', accent: '#f20a67' },
  { icon: Lock,       num: '02', title: 'End-to-End Encryption',    description: 'NaCl secretbox with Poly1305 + XSalsa20. 256-bit keys derived from your Access Key. Zero-knowledge protection.', accent: '#63cce8' },
  { icon: QrCode,     num: '03', title: 'QR Code Pairing',          description: 'Scan a QR code to instantly pair devices. No account creation, no password memorization, no friction.', accent: '#f20a67' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-24 lg:py-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,0,104,0.35), transparent)' }} />

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.055) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="flex items-center gap-5 mb-7">
              <span className="eyebrow-label">Capabilities</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="section-heading section-title leading-none">
                Built for<br />
                <span className="gradient-text">Modern</span><br />
                Security
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 0 }}>
                Every feature engineered with privacy-first principles. Your data belongs to you, and only you.
              </p>
            </div>
          </motion.div>

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
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {/* Shimmer top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: `linear-gradient(90deg, ${feature.accent}, transparent)` }}
                />

                {/* Number */}
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-6"
                  style={{ color: `${feature.accent}55` }}>
                  {feature.num}
                </div>

                {/* Icon with colored background tile */}
                <div className="mb-6 relative inline-flex">
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"
                    style={{ background: `${feature.accent}30`, transform: 'scale(1.4)' }}
                  />
                  <div
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 group-hover:scale-105"
                    style={{ background: `${feature.accent}14`, border: `1px solid ${feature.accent}30` }}
                  >
                    <feature.icon className="w-4 h-4" style={{ color: feature.accent }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="section-heading text-[1.05rem] mb-3 transition-colors duration-300"
                  style={{ letterSpacing: 0 }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)', letterSpacing: 0 }}>
                  {feature.description}
                </p>

                {/* Arrow badge on hover */}
                <div
                  className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: feature.accent }} />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
