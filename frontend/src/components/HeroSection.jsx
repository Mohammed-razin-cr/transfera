import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, Sparkles, ShieldCheck, Radio, Fingerprint } from 'lucide-react'

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = []
    const nodeCount = 6
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 3 + Math.random() * 3,
      })
    }

    const dataPackets = []
    let packetTimer = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      })

      ctx.strokeStyle = 'rgba(180, 30, 30, 0.14)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      packetTimer++
      if (packetTimer > 70) {
        packetTimer = 0
        const from = Math.floor(Math.random() * nodes.length)
        let to = Math.floor(Math.random() * nodes.length)
        while (to === from) to = Math.floor(Math.random() * nodes.length)
        dataPackets.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.008 })
      }

      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const p = dataPackets[i]
        p.progress += p.speed
        if (p.progress >= 1) { dataPackets.splice(i, 1); continue }
        const from = nodes[p.from]
        const to = nodes[p.to]
        const x = from.x + (to.x - from.x) * p.progress
        const y = from.y + (to.y - from.y) * p.progress

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 30, 30, 0.9)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 7, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 30, 30, 0.12)'
        ctx.fill()
      }

      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 30, 30, 0.6)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 30, 30, 0.08)'
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-[96vh] flex items-center overflow-hidden pt-14">
      {/* Subtle red glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(180,30,30,0.1) 0%, transparent 65%)' }} />
      {/* Vertical rule — editorial accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #b41e1e 30%, #b41e1e 70%, transparent)' }} />

      <div className="section-container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">

          {/* Left: text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
              <span className="eyebrow-label flex items-center gap-2">
                <Sparkles className="w-2.5 h-2.5" />
                Private transfer protocol · v3
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(180,30,30,0.2)' }} />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="hero-title text-[clamp(64px,10vw,120px)] leading-none mb-6 text-white"
            >
              Transfer
              <br />
              <span className="gradient-text italic">Without</span>
              <br />
              <span style={{ color: '#2a2020' }}>Limits.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="hero-subtitle text-xl sm:text-2xl mb-10 max-w-lg leading-relaxed"
            >
              A private passage for your files. Encrypted in the browser, delivered directly, and never retained by the gateway.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href="http://localhost:8088/live" className="btn-primary group">
                <span>Start Secure Transfer</span>
                <span className="btn-icon">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a href="#security" className="btn-secondary group">
                <span className="btn-icon">
                  <Eye className="w-3.5 h-3.5" />
                </span>
                <span>View Architecture</span>
              </a>
            </motion.div>

            {/* Meta row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 text-[11px] font-mono tracking-widest uppercase"
              style={{ color: '#4a3a3a' }}
            >
              <span className="flex items-center gap-2">
                <Radio className="h-3 w-3 text-emerald-500" />
                Secure Gateway Online
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-transfera-neonBlue" />
                End-to-end encrypted
              </span>
              <span className="flex items-center gap-2">
                <Fingerprint className="h-3 w-3 text-transfera-neonPurple" />
                No account required
              </span>
            </motion.div>
          </motion.div>

          {/* Right: network canvas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Large editorial number */}
            <div className="absolute -top-6 -left-8 font-mono text-[120px] leading-none font-bold select-none pointer-events-none"
              style={{ color: 'rgba(180,30,30,0.06)', letterSpacing: '-0.05em' }}>01</div>

            <div className="network-console relative overflow-hidden rounded-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-transfera-red" />
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#4a3a3a' }}>
                  Live Network · 6 nodes
                </span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <canvas
                ref={canvasRef}
                className="w-full h-72"
                style={{ background: 'rgba(6,4,4,0.95)' }}
              />
              <div className="flex justify-between items-center px-4 py-3 border-t border-white/5">
                <span className="font-mono text-[10px] tracking-wider" style={{ color: '#4a3a3a' }}>
                  Network: <span className="text-transfera-red">Active</span>
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: '#4a3a3a' }}>
                  Nodes: <span style={{ color: '#9a6060' }}>6</span>
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: '#4a3a3a' }}>
                  Latency: <span className="text-emerald-500">12ms</span>
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 glass-panel rounded-sm px-3 py-2 animate-float border border-transfera-red/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-transfera-red" />
                <span className="text-[10px] font-mono text-white/60 tracking-wider">DirectLink Active</span>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 glass-panel rounded-sm px-3 py-2 animate-float border border-emerald-900/30" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-white/60 tracking-wider">E2E Encrypted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
