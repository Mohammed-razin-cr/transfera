import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Server, User } from 'lucide-react'

export default function SecuritySection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = [
      { label: 'Origin\nNode',      color: '#c02020' },
      { label: 'Encrypted\nData',   color: '#8a3535' },
      { label: 'Secure\nGateway',   color: '#a84040' },
      { label: 'Destination\nNode', color: '#c02020' },
    ]

    let particles = []
    let time = 0

    const spawnParticle = () => {
      particles.push({
        from: 0, to: 1, progress: 0,
        speed: 0.007 + Math.random() * 0.005,
        yOffset: (Math.random() - 0.5) * 12,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.018

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const margin = w < 480 ? 36 : 72
      const segmentWidth = (w - 2 * margin) / 3

      // Draw connections
      for (let i = 0; i < nodes.length - 1; i++) {
        const x1 = margin + i * segmentWidth
        const x2 = margin + (i + 1) * segmentWidth

        // Base line
        const lineGrd = ctx.createLinearGradient(x1, 0, x2, 0)
        lineGrd.addColorStop(0, 'rgba(180,30,30,0.2)')
        lineGrd.addColorStop(0.5, 'rgba(180,30,30,0.35)')
        lineGrd.addColorStop(1, 'rgba(180,30,30,0.2)')
        ctx.strokeStyle = lineGrd
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x1, h / 2)
        ctx.lineTo(x2, h / 2)
        ctx.stroke()

        // Animated flow dashes
        const flowOffset = (time * 35) % 24
        for (let j = 0; j < 4; j++) {
          const offset = (flowOffset + j * 6) % 24
          const startX = x1 + offset * (segmentWidth / 24)
          if (startX < x2) {
            ctx.strokeStyle = 'rgba(255, 80, 80, 0.45)'
            ctx.lineWidth = 1.5
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(startX, h / 2)
            ctx.lineTo(Math.min(startX + 10, x2), h / 2)
            ctx.stroke()
          }
        }
      }

      if (Math.random() < 0.025) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          particles[i] = { ...p, from: p.to, to: Math.min(p.to + 1, 3), progress: 0 }
          if (p.to >= 3) { particles.splice(i, 1); continue }
        }

        const fromX = margin + p.from * segmentWidth
        const toX   = margin + p.to   * segmentWidth
        const x = fromX + (toX - fromX) * p.progress
        const y = h / 2 + p.yOffset

        const pgrd = ctx.createRadialGradient(x, y, 0, x, y, 10)
        pgrd.addColorStop(0, 'rgba(200, 50, 50, 0.6)')
        pgrd.addColorStop(1, 'rgba(200, 50, 50, 0)')
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fillStyle = pgrd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#c82020'
        ctx.fill()
      }

      // Nodes
      nodes.forEach((node, i) => {
        const nx = margin + i * segmentWidth
        const ny = h / 2
        const pulse = Math.sin(time * 1.5 + i * 0.8) * 0.5 + 0.5

        // Outer glow rings
        const outerR = 32 + pulse * 6
        const ogrd = ctx.createRadialGradient(nx, ny, 0, nx, ny, outerR)
        ogrd.addColorStop(0, `rgba(180, 30, 30, ${0.1 + pulse * 0.05})`)
        ogrd.addColorStop(1, 'rgba(180, 30, 30, 0)')
        ctx.beginPath()
        ctx.arc(nx, ny, outerR, 0, Math.PI * 2)
        ctx.fillStyle = ogrd
        ctx.fill()

        // Node body
        ctx.beginPath()
        ctx.arc(nx, ny, 12, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10,6,6,0.95)'
        ctx.fill()
        ctx.strokeStyle = node.color
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Inner highlight
        ctx.beginPath()
        ctx.arc(nx, ny - 3, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,120,120,${0.15 + pulse * 0.1})`
        ctx.fill()

        // Label
        ctx.fillStyle = 'rgba(230,220,210,0.55)'
        ctx.font = '400 9px IBM Plex Mono, monospace'
        ctx.textAlign = 'center'
        const lines = node.label.split('\n')
        lines.forEach((line, li) => {
          ctx.fillText(line, nx, ny + 30 + li * 13)
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const securityPoints = [
    {
      icon: User,
      num: '01',
      title: 'Origin Node',
      desc: 'Data originates from your device. The encryption key is generated locally and never transmitted.',
    },
    {
      icon: Lock,
      num: '02',
      title: 'Encrypted Data',
      desc: 'NaCl secretbox (Poly1305 + XSalsa20) with 256-bit keys derived from your Access Key.',
    },
    {
      icon: Server,
      num: '03',
      title: 'Secure Gateway',
      desc: 'Only sees encrypted handshakes and 16-char room tokens. Zero knowledge of file contents.',
    },
    {
      icon: Shield,
      num: '04',
      title: 'Destination Node',
      desc: 'Receives encrypted data and decrypts locally with the shared key derived from the Access Key.',
    },
  ]

  return (
    <section id="security" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,30,30,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Editorial bg number */}
      <div className="absolute left-0 bottom-0 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.035)', letterSpacing: '-0.05em' }}>03</div>

      <div className="section-container relative z-10">
        <div className="section-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <div className="flex items-center gap-5 mb-7">
              <span className="eyebrow-label">Architecture</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
              Security<br />
              <span className="gradient-text italic">Architecture</span>
            </h2>
            <p className="mt-5 text-sm max-w-md leading-relaxed" style={{ color: '#9c8e8a' }}>
              Four-stage encrypted pipeline. Your data never touches unencrypted infrastructure.
            </p>
          </motion.div>

          {/* Canvas diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="mb-10 overflow-hidden rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,3,3,0.98)' }}
          >
            <div className="px-6 py-3.5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-transfera-red animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#7a6e6b' }}>
                Encrypted pipeline · live simulation
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-emerald-500/60 tracking-wider">LIVE</span>
              </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-44 sm:h-56" />
          </motion.div>

          {/* Four cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4"
            style={{ border: '1px solid rgba(255,255,255,0.055)', borderBottom: 'none' }}>
            {securityPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group feature-card"
                style={{
                  borderRight: index < 3 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.055)',
                }}
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
                  style={{ color: 'rgba(180,30,30,0.32)' }}>{point.num}</div>
                <div className="mb-4 relative">
                  <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(180,30,30,0.15) 0%, transparent 70%)' }} />
                  <point.icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: 'rgba(180,30,30,0.55)' }} />
                </div>
                <h3 className="section-heading text-base text-white mb-2 transition-colors duration-300 group-hover:text-red-400">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9a8c88' }}>{point.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
