import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Server, User } from 'lucide-react'
import { createVisibilityLoop } from '../utils/animation'

export default function SecuritySection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let loop

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5)
      canvas.width = Math.round(canvas.offsetWidth * pixelRatio)
      canvas.height = Math.round(canvas.offsetHeight * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      loop?.requestRender()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const nodes = [
      { label: 'Origin\nNode',      color: '#ff0068' },
      { label: 'Encrypted\nData',   color: '#91013d' },
      { label: 'Secure\nGateway',   color: '#9f0142' },
      { label: 'Destination\nNode', color: '#ff0068' },
    ]

    let particles = [], time = 0, spawnClock = 0

    const spawnParticle = () => {
      particles.push({ from: 0, to: 1, progress: 0, speed: 0.007 + Math.random() * 0.005, yOffset: (Math.random() - 0.5) * 12 })
    }

    const animate = (_time, deltaMs, frameScale) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.018 * frameScale
      spawnClock += deltaMs
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      const margin = w < 480 ? 36 : 72
      const segmentWidth = (w - 2 * margin) / 3

      // Draw connections
      for (let i = 0; i < nodes.length - 1; i++) {
        const x1 = margin + i * segmentWidth, x2 = margin + (i + 1) * segmentWidth
        const lineGrd = ctx.createLinearGradient(x1, 0, x2, 0)
        lineGrd.addColorStop(0, 'rgba(255,0,104,0.15)')
        lineGrd.addColorStop(0.5, 'rgba(255,0,104,0.3)')
        lineGrd.addColorStop(1, 'rgba(255,0,104,0.15)')
        ctx.strokeStyle = lineGrd; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(x1, h / 2); ctx.lineTo(x2, h / 2); ctx.stroke()

        // Flow dashes
        const flowOffset = (time * 35) % 24
        for (let j = 0; j < 4; j++) {
          const offset = (flowOffset + j * 6) % 24
          const startX = x1 + offset * (segmentWidth / 24)
          if (startX < x2) {
            ctx.strokeStyle = 'rgba(255,0,104,0.5)'; ctx.lineWidth = 1.5; ctx.lineCap = 'round'
            ctx.beginPath(); ctx.moveTo(startX, h / 2); ctx.lineTo(Math.min(startX + 10, x2), h / 2); ctx.stroke()
          }
        }
      }

      if (spawnClock >= 650) {
        spawnClock = 0
        spawnParticle()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed * frameScale
        if (p.progress >= 1) {
          particles[i] = { ...p, from: p.to, to: Math.min(p.to + 1, 3), progress: 0 }
          if (p.to >= 3) { particles.splice(i, 1); continue }
        }
        // Smooth sinusoidal transition between nodes
        const easeP = (1 - Math.cos(p.progress * Math.PI)) / 2
        const fromX = margin + p.from * segmentWidth, toX = margin + p.to * segmentWidth
        const x = fromX + (toX - fromX) * easeP, y = h / 2 + p.yOffset * Math.sin(p.progress * Math.PI)
        const pgrd = ctx.createRadialGradient(x, y, 0, x, y, 10)
        pgrd.addColorStop(0, 'rgba(255,0,104,0.7)'); pgrd.addColorStop(1, 'rgba(255,0,104,0)')
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fillStyle = pgrd; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#ff0068'; ctx.fill()
      }

      // Nodes
      nodes.forEach((node, i) => {
        const nx = margin + i * segmentWidth, ny = h / 2
        const pulse = Math.sin(time * 1.5 + i * 0.8) * 0.5 + 0.5
        const outerR = 32 + pulse * 6
        const ogrd = ctx.createRadialGradient(nx, ny, 0, nx, ny, outerR)
        ogrd.addColorStop(0, `rgba(255,0,104,${0.1 + pulse * 0.06})`); ogrd.addColorStop(1, 'rgba(255,0,104,0)')
        ctx.beginPath(); ctx.arc(nx, ny, outerR, 0, Math.PI * 2); ctx.fillStyle = ogrd; ctx.fill()
        ctx.beginPath(); ctx.arc(nx, ny, 12, 0, Math.PI * 2); ctx.fillStyle = 'rgba(16,2,10,0.96)'; ctx.fill()
        ctx.strokeStyle = node.color; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(nx, ny - 3, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,0,104,${0.15 + pulse * 0.12})`; ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '400 9px monospace'; ctx.textAlign = 'center'
        node.label.split('\n').forEach((line, li) => ctx.fillText(line, nx, ny + 30 + li * 13))
      })

    }
    loop = createVisibilityLoop(canvas, animate, { rootMargin: '180px 0px' })

    return () => { loop.stop(); resizeObserver.disconnect() }
  }, [])

  const securityPoints = [
    { icon: User,   num: '01', title: 'Origin Node',       desc: 'Data originates from your device. The encryption key is generated locally and never transmitted.' },
    { icon: Lock,   num: '02', title: 'Encrypted Data',    desc: 'NaCl secretbox (Poly1305 + XSalsa20) with 256-bit keys derived from your Access Key.' },
    { icon: Server, num: '03', title: 'Secure Gateway',    desc: 'Only sees encrypted handshakes and 16-char room tokens. Zero knowledge of file contents.' },
    { icon: Shield, num: '04', title: 'Destination Node',  desc: 'Receives encrypted data and decrypts locally with the shared key derived from the Access Key.' },
  ]

  return (
    <section id="security" className="relative py-20 sm:py-24 lg:py-40 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Right ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="flex items-center gap-5 mb-7">
              <span className="eyebrow-label">Architecture</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading section-title leading-none">
              Security<br />
              <span className="gradient-text">Architecture</span>
            </h2>
            <p className="mt-5 text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 0 }}>
              Four-stage encrypted pipeline. Your data never touches unencrypted infrastructure.
            </p>
          </motion.div>

          {/* Canvas diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="mb-10 overflow-hidden glow-card"
            style={{ padding: 0 }}
          >
            <div className="px-6 py-3.5 flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Encrypted pipeline · live simulation
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
                <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,0,104,0.7)' }}>LIVE</span>
              </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-44 sm:h-56"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,0,104,0.04), rgba(16,2,10,0.98) 70%)' }} />
          </motion.div>

          {/* Four cards */}
          <div className="security-grid">
            {securityPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group feature-card"
              >
                <div className="font-mono text-[22px] font-bold mb-4"
                  style={{ color: 'rgba(255,0,104,0.3)', letterSpacing: 0 }}>{point.num}</div>
                <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-xl mb-4 relative"
                  style={{ border: '1px solid rgba(255,0,104,0.2)', background: 'rgba(255,0,104,0.06)' }}>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.2) 0%, transparent 70%)' }} />
                  <point.icon className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:scale-110"
                    style={{ color: 'rgba(255,0,104,0.7)' }} />
                </div>
                <h3 className="section-heading text-base mb-2 transition-colors duration-300 group-hover:text-[var(--color-plasma-pink)]">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{point.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
