import { motion } from 'framer-motion'
import { Wifi, Lock, QrCode, Database, FolderSync, BarChart3, ArrowUpRight, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  {
    icon: Wifi,
    num: '01',
    title: 'Direct Device-to-Device',
    description: 'Files flow directly between your devices through encrypted WebRTC channels. No intermediate servers ever touch your data. When both devices are online and reachable, this is the fastest possible path — zero latency from server hops.',
    tag: 'WebRTC',
  },
  {
    icon: Lock,
    num: '02',
    title: 'End-to-End Encryption',
    description: 'NaCl secretbox with Poly1305 + XSalsa20. 256-bit keys derived from your Access Key. Zero-knowledge protection — even our relay server cannot see your file contents. Your key, your data.',
    tag: 'NaCl Secretbox',
  },
  {
    icon: QrCode,
    num: '03',
    title: 'QR Code Pairing',
    description: 'Scan a QR code to instantly pair devices. No account creation, no password memorization, no friction. Works between phone and PC with a single camera scan. Designed for speed and simplicity.',
    tag: 'Instant Pairing',
  },
  {
    icon: Database,
    num: '04',
    title: 'Temporary Vault Storage',
    description: 'Vault Storage mode holds encrypted files for 10 minutes when the Destination Node is offline. Zero persistent storage — all vaulted data is automatically purged. Privacy by design.',
    tag: 'Auto-Purge',
  },
  {
    icon: FolderSync,
    num: '05',
    title: 'Multi-File Sharing',
    description: 'Send multiple files or entire folders in one batch. Auto-zipped for DirectLink mode, native multi-file streaming for Vault Storage. No size juggling, no split sends.',
    tag: 'Batch Transfer',
  },
  {
    icon: BarChart3,
    num: '06',
    title: 'Real-Time Analytics',
    description: 'Monitor transfer speed, progress, and encryption status in real-time. Full visibility into your transfer pipeline. Know exactly when your files arrive — with zero compromise on privacy.',
    tag: 'Live Metrics',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-obsidian-void)', color: 'var(--color-frost-white)' }}>
      <Navbar />

      <main className="pt-28">
        {/* Hero Banner */}
        <section className="relative py-20 sm:py-24 lg:py-36 overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 30%, rgba(255,0,104,0.10) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 70%, rgba(145,1,61,0.07) 0%, transparent 50%)' }} />
          </div>

          <div className="section-container relative z-10">
            <div className="section-inner">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="/" className="inline-flex items-center gap-2 mb-10 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Home
                </a>

                <div className="flex items-center gap-5 mb-7">
                  <span className="eyebrow-label">Capabilities</span>
                  <div className="flex-1 rule-line-full" />
                </div>

                <h1 className="hero-title text-[clamp(48px,7vw,96px)] text-white mb-6">
                  Built for<br />
                  <span className="gradient-text">Modern</span><br />
                  Security
                </h1>
                <p className="hero-subtitle max-w-xl mb-10">
                  Every feature engineered with privacy-first principles. Six pillars that make Transfera the most private way to move files between devices.
                </p>

                <a href="/live" className="btn-primary group inline-flex">
                  <span>Start Secure Transfer</span>
                  <span className="btn-icon">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom hairline */}
          <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
        </section>

        {/* Features Grid */}
        <section className="relative py-20 sm:py-24 lg:py-36">
          <div className="section-container">
            <div className="section-inner">
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

                    {/* Tag */}
                    <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                      style={{ background: 'rgba(255,0,104,0.08)', border: '1px solid rgba(255,0,104,0.18)', color: 'rgba(255,0,104,0.8)' }}>
                      {feature.tag}
                    </div>

                    {/* Title */}
                    <h2 className="section-heading text-[1.15rem] mb-3 transition-colors duration-300 group-hover:text-[var(--color-plasma-pink)]"
                      style={{ letterSpacing: '-0.021px' }}>
                      {feature.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.012px' }}>
                      {feature.description}
                    </p>

                    {/* Hover bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"
                      style={{ background: 'linear-gradient(90deg, rgba(255,0,104,0.7), rgba(255,0,104,0.2))' }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
