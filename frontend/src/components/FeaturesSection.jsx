import { motion } from 'framer-motion'
import {
  Wifi,
  Lock,
  QrCode,
  Database,
  FolderSync,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: Wifi,
    num: '01',
    title: 'Direct Device-to-Device',
    description: 'Files flow directly between your devices through encrypted WebRTC channels. No intermediate servers ever touch your data.',
  },
  {
    icon: Lock,
    num: '02',
    title: 'End-to-End Encryption',
    description: 'NaCl secretbox with Poly1305 + XSalsa20. 256-bit keys derived from your Access Key. Zero-knowledge protection.',
  },
  {
    icon: QrCode,
    num: '03',
    title: 'QR Code Pairing',
    description: 'Scan a QR code to instantly pair devices. No account creation, no password memorization, no friction.',
  },
  {
    icon: Database,
    num: '04',
    title: 'Temporary Vault Storage',
    description: 'Vault Storage mode holds encrypted files for 10 minutes when the Destination Node is offline. Zero persistent storage.',
  },
  {
    icon: FolderSync,
    num: '05',
    title: 'Multi-File Sharing',
    description: 'Send multiple files or entire folders in one batch. Auto-zipped for DirectLink, native for Vault Storage.',
  },
  {
    icon: BarChart3,
    num: '06',
    title: 'Real-Time Analytics',
    description: 'Monitor transfer speed, progress, and encryption status in real-time. Full visibility, zero compromise.',
  },
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
      {/* Editorial background number */}
      <div className="absolute right-0 top-12 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.035)', letterSpacing: '-0.05em' }}>02</div>

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(180,30,30,0.4), transparent)' }} />

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
              <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                Built for<br />
                <span className="gradient-text italic">Modern</span><br />
                Security
              </h2>
              <p className="text-sm text-white/25 max-w-xs leading-relaxed sm:text-right font-light tracking-wide">
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
            className="grid sm:grid-cols-2 lg:grid-cols-3"
            style={{ border: '1px solid rgba(255,255,255,0.055)', borderBottom: 'none' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group feature-card cursor-default"
                style={{
                  borderRight: index % 3 !== 2 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.055)',
                }}
              >
                {/* Number */}
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-7"
                  style={{ color: 'rgba(180,30,30,0.38)' }}>
                  {feature.num}
                </div>

                {/* Icon with glow */}
                <div className="mb-5 relative">
                  <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(180,30,30,0.15) 0%, transparent 70%)' }} />
                  <feature.icon
                    className="w-5 h-5 relative z-10 transition-all duration-500 group-hover:scale-110"
                    style={{ color: 'rgba(200,60,60,0.55)' }}
                  />
                </div>

                {/* Title */}
                <h3 className="section-heading text-[1.1rem] text-white mb-3 transition-colors duration-300 group-hover:text-red-400">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#9a8c88' }}>
                  {feature.description}
                </p>

                {/* Hover bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: 'linear-gradient(90deg, rgba(180,30,30,0.6), rgba(180,30,30,0.2))' }} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
