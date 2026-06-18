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
      { x: 60, y: 80, label: 'Origin\nNode', color: '#b41e1e' },
      { x: 200, y: 80, label: 'Encrypted\nData', color: '#7a3030' },
      { x: 340, y: 80, label: 'Secure\nGateway', color: '#9a4040' },
      { x: 480, y: 80, label: 'Destination\nNode', color: '#b41e1e' },
    ]

    let particles = []
    let time = 0

    const spawnParticle = () => {
      particles.push({
        from: 0,
        to: 1,
        progress: 0,
        speed: 0.008 + Math.random() * 0.004,
        yOffset: (Math.random() - 0.5) * 10,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.02

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const margin = w < 480 ? 30 : 60
      const segmentWidth = (w - 2 * margin) / 3

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length - 1; i++) {
        const x1 = margin + i * segmentWidth
        const x2 = margin + (i + 1) * segmentWidth
        ctx.beginPath()
        ctx.moveTo(x1, h / 2)
        ctx.lineTo(x2, h / 2)
        ctx.stroke()

        const flowOffset = (time * 30) % 20
        ctx.strokeStyle = 'rgba(180, 30, 30, 0.3)'
        ctx.lineWidth = 1
        for (let j = 0; j < 3; j++) {
          const offset = (flowOffset + j * 6) % 20
          const startX = x1 + offset * (segmentWidth / 20)
          if (startX < x2) {
            ctx.beginPath()
            ctx.moveTo(startX, h / 2)
            ctx.lineTo(Math.min(startX + 8, x2), h / 2)
            ctx.stroke()
          }
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
        ctx.lineWidth = 1
      }

      if (Math.random() < 0.03) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          particles[i] = { ...p, from: p.to, to: Math.min(p.to + 1, 3), progress: 0 }
          if (p.to >= 3) { particles.splice(i, 1); continue }
        }

        const fromX = margin + p.from * segmentWidth
        const toX = margin + p.to * segmentWidth
        const x = fromX + (toX - fromX) * p.progress
        const y = h / 2 + p.yOffset

        ctx.beginPath()
        ctx.arc(x, y, 7, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 30, 30, 0.1)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#b41e1e'
        ctx.fill()
      }

      nodes.forEach((node, i) => {
        const nx = margin + i * segmentWidth
        const ny = h / 2

        ctx.beginPath()
        ctx.arc(nx, ny, 24, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}10`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, 16, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}18`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, 10, 0, Math.PI * 2)
        ctx.fillStyle = '#120e0e'
        ctx.fill()
        ctx.strokeStyle = node.color
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.fillStyle = 'rgba(232, 224, 213, 0.6)'
        ctx.font = '400 10px IBM Plex Mono, monospace'
        ctx.textAlign = 'center'
        const lines = node.label.split('\n')
        lines.forEach((line, li) => {
          ctx.fillText(line, nx, ny + 34 + li * 14)
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
    <section id="security" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Editorial background number */}
      <div className="absolute left-0 bottom-0 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.04)', letterSpacing: '-0.05em' }}>03</div>

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
            <div className="flex items-center gap-5 mb-6">
              <span className="eyebrow-label">Architecture</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
              Security<br />
              <span className="gradient-text italic">Architecture</span>
            </h2>
            <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: '#9c8e8a' }}>
              Four-stage encrypted pipeline. Your data never touches unencrypted infrastructure.
            </p>
          </motion.div>

          {/* Canvas diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 border border-white/5 rounded-sm overflow-hidden"
            style={{ background: 'rgba(6,4,4,0.95)' }}
          >
            <div className="px-6 py-3 border-b border-white/5 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-transfera-red" />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#8c7e7b' }}>
                Encrypted pipeline · live simulation
              </span>
            </div>
            <canvas ref={canvasRef} className="w-full h-44 sm:h-52" />
          </motion.div>

          {/* Four cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {securityPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group p-6 transition-colors duration-400"
                style={{ background: '#0a0808' }}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
                  style={{ color: 'rgba(180,30,30,0.35)' }}>{point.num}</div>
                <div className="mb-4">
                  <point.icon className="w-4 h-4" style={{ color: 'rgba(180,30,30,0.5)' }} />
                </div>
                <h3 className="section-heading text-base text-white mb-2">{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9c8e8a' }}>{point.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
