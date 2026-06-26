import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, ShieldCheck, Radio, Fingerprint, Zap } from 'lucide-react'

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = []
    const nodeCount = 8
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 2.5 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const dataPackets = []
    let packetTimer = 0

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1
      })

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.28
            ctx.strokeStyle = `rgba(255, 90, 90, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // packets
      packetTimer++
      if (packetTimer > 60) {
        packetTimer = 0
        const from = Math.floor(Math.random() * nodes.length)
        let to = Math.floor(Math.random() * nodes.length)
        while (to === from) to = Math.floor(Math.random() * nodes.length)
        dataPackets.push({ from, to, progress: 0, speed: 0.007 + Math.random() * 0.007 })
      }

      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const p = dataPackets[i]
        p.progress += p.speed
        if (p.progress >= 1) { dataPackets.splice(i, 1); continue }
        const from = nodes[p.from]
        const to = nodes[p.to]
        const x = from.x + (to.x - from.x) * p.progress
        const y = from.y + (to.y - from.y) * p.progress

        const grd = ctx.createRadialGradient(x, y, 0, x, y, 9)
        grd.addColorStop(0, 'rgba(255, 80, 80, 0.9)')
        grd.addColorStop(1, 'rgba(255, 80, 80, 0)')
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 100, 100, 1)'
        ctx.fill()
      }

      // nodes
      nodes.forEach((node) => {
        const pulseR = node.radius + Math.sin(node.pulse) * 1.5
        const outerGrd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20)
        outerGrd.addColorStop(0, 'rgba(220, 60, 60, 0.18)')
        outerGrd.addColorStop(1, 'rgba(220, 60, 60, 0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
        ctx.fillStyle = outerGrd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 80, 80, 0.85)'
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
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-[96vh] flex items-center overflow-hidden pt-14">
      {/* Multi-layer background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 8% 15%, rgba(180,30,30,0.22) 0%, transparent 45%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 90% 80%, rgba(120,15,15,0.14) 0%, transparent 40%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,5,5,0.95) 100%)',
        }} />
      </div>

      {/* Vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(180,30,30,0.5) 30%, rgba(180,30,30,0.5) 70%, transparent)' }} />

      {/* Horizontal scan line */}
      <div className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,60,60,0.12) 50%, transparent 100%)', top: '30%' }} />

      <div className="section-container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

          {/* Left: text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
              <span className="eyebrow-label flex items-center gap-2">
                <Zap className="w-2.5 h-2.5" />
                Private transfer protocol · v3
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,90,90,0.45), transparent)' }} />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="hero-title text-[clamp(52px,7.5vw,120px)] leading-none mb-8 text-white"
              style={{ textShadow: '0 12px 50px rgba(0,0,0,0.8)' }}
            >
              Secure File
              <br />
              <span className="gradient-text italic">Transfer</span>
              <br />
              <span className="text-white">Between Devices.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="hero-subtitle text-xl sm:text-2xl mb-10 max-w-lg leading-relaxed"
            >
              Send files from phone to PC or between any browsers with end-to-end encryption, QR pairing, and no account required.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <a href="/live" className="btn-primary group">
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

            {/* Trust pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <span className="hero-trust-pill text-[11px] font-mono tracking-widest uppercase" style={{ color: '#d0c3b8' }}>
                <Radio className="h-3 w-3 text-emerald-400" />
                Secure Gateway Online
              </span>
              <span className="hero-trust-pill text-[11px] font-mono tracking-widest uppercase" style={{ color: '#d0c3b8' }}>
                <ShieldCheck className="h-3 w-3" style={{ color: '#7eb8ff' }} />
                End-to-end encrypted
              </span>
              <span className="hero-trust-pill text-[11px] font-mono tracking-widest uppercase" style={{ color: '#d0c3b8' }}>
                <Fingerprint className="h-3 w-3" style={{ color: '#bf89ff' }} />
                No account required
              </span>
            </motion.div>
          </motion.div>

          {/* Right: network canvas */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl mx-auto lg:max-w-none"
          >
            {/* Large editorial number */}
            <div className="absolute -top-8 -left-10 font-mono text-[130px] leading-none font-bold select-none pointer-events-none"
              style={{ color: 'rgba(180,30,30,0.05)', letterSpacing: '-0.05em' }}>01</div>

            {/* Glow behind console */}
            <div className="absolute -inset-8 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(180,30,30,0.12) 0%, transparent 70%)' }} />

            <div className="network-console relative overflow-hidden rounded-xl">
              {/* Title bar */}
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.07]"
                style={{ background: 'rgba(14,10,10,0.8)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(200,50,50,0.7)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase ml-1" style={{ color: '#8a7a72' }}>
                  Live Network · 8 nodes
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-emerald-500/70 tracking-wider">ACTIVE</span>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                className="w-full h-72"
                style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(60,18,18,0.3), rgba(4,2,2,0.98) 65%)' }}
              />

              {/* Footer bar */}
              <div className="flex justify-between items-center px-5 py-3 border-t border-white/[0.07]"
                style={{ background: 'rgba(14,10,10,0.8)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-transfera-red animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider" style={{ color: '#a89088' }}>
                    E2E Encrypted
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: '#8a7a72' }}>
                  Nodes: <span style={{ color: '#ff8a8a' }}>8</span>
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: '#8a7a72' }}>
                  Latency: <span className="text-emerald-400">12ms</span>
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-panel rounded-lg px-4 py-2.5 border border-transfera-red/25 shadow-lg"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,30,30,0.12)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-transfera-red animate-pulse-glow" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">DirectLink Active</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -bottom-4 -left-4 glass-panel rounded-lg px-4 py-2.5 border border-emerald-900/35 shadow-lg"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.08)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">WebRTC P2P Mode</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
