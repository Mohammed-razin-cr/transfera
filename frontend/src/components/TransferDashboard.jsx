import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Activity, Clock, Shield, FileCheck } from 'lucide-react'

export default function TransferDashboard() {
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

    const bars = Array.from({ length: 36 }, () => ({
      height: Math.random() * 55 + 12,
      speed: Math.random() * 1.8 + 0.8,
      direction: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
    }))

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.04

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const barWidth = (w - 32) / bars.length
      const baseY = h - 28

      // Horizontal grid lines
      for (let i = 0; i < 4; i++) {
        const lineY = baseY - (i + 1) * (baseY / 5)
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(16, lineY)
        ctx.lineTo(w - 16, lineY)
        ctx.stroke()
      }

      bars.forEach((bar, i) => {
        bar.height += bar.speed * bar.direction
        if (bar.height > 65) bar.direction = -1
        if (bar.height < 10) bar.direction = 1

        const x = 16 + i * barWidth
        const barHeight = bar.height + Math.sin(time + bar.phase) * 12
        const y = baseY - barHeight

        // Gradient bar
        const gradient = ctx.createLinearGradient(x, baseY, x, y)
        gradient.addColorStop(0, 'rgba(160, 25, 25, 0.05)')
        gradient.addColorStop(0.5, 'rgba(180, 30, 30, 0.25)')
        gradient.addColorStop(1, 'rgba(220, 60, 60, 0.55)')

        ctx.fillStyle = gradient
        const bw = Math.max(barWidth - 3, 2)
        ctx.beginPath()
        ctx.roundRect(x, y, bw, barHeight, [2, 2, 0, 0])
        ctx.fill()

        // Top cap glow
        ctx.fillStyle = `rgba(220, 70, 70, ${0.5 + Math.sin(time + bar.phase) * 0.2})`
        ctx.fillRect(x, y, bw, 1.5)
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const stats = [
    { icon: Activity, label: 'Active Transfers', value: '12', unit: 'live', accent: 'rgba(220,60,60,0.6)' },
    { icon: Shield,   label: 'Encryption',       value: 'NaCl',   unit: 'secretbox', accent: 'rgba(100,140,255,0.6)' },
    { icon: Clock,    label: 'Avg Latency',       value: '14',   unit: 'ms',    accent: 'rgba(80,200,120,0.6)' },
    { icon: FileCheck,label: 'Data Transferred',  value: '1.2',  unit: 'TB',    accent: 'rgba(220,60,60,0.6)' },
  ]

  return (
    <section id="dashboard" className="relative py-28 lg:py-40">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Editorial bg number */}
      <div className="absolute right-0 top-8 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.035)', letterSpacing: '-0.05em' }}>04</div>

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
              <span className="eyebrow-label">Real-Time</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
              Transfer<br />
              <span className="gradient-text italic">Dashboard</span>
            </h2>
            <p className="mt-5 text-sm max-w-md leading-relaxed" style={{ color: '#9c8e8a' }}>
              Monitor your data flow with real-time analytics and encrypted transfer visualization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3"
            style={{ border: '1px solid rgba(255,255,255,0.055)' }}>
            {/* Chart - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
              style={{ background: '#080606', borderRight: '1px solid rgba(255,255,255,0.055)' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" style={{ color: 'rgba(180,30,30,0.6)' }} />
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#5e4e4e' }}>
                    Transfer Throughput
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-transfera-red animate-pulse" />
                  <span className="font-mono text-[10px]" style={{ color: '#8c7e7b' }}>Live</span>
                </div>
              </div>
              <canvas ref={canvasRef} className="w-full h-56"
                style={{ background: 'linear-gradient(180deg, rgba(5,3,3,0.95) 0%, rgba(8,5,5,0.98) 100%)' }} />
              <div className="flex justify-between px-6 py-3 border-t border-white/[0.05]">
                {['0s', '10s', '20s', '30s', '40s', '50s', '60s'].map((t) => (
                  <span key={t} className="font-mono text-[10px]" style={{ color: '#5e4e4e' }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats column */}
            <div style={{ background: '#080606' }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex items-center justify-between px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02] cursor-default"
                  style={{ borderBottom: index < 3 ? '1px solid rgba(255,255,255,0.055)' : 'none' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-md transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(180,30,30,0.08)', border: '1px solid rgba(180,30,30,0.15)' }}>
                      <stat.icon className="w-3.5 h-3.5" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: '#6a5a5a' }}>
                        {stat.label}
                      </p>
                      <p className="section-heading text-xl text-white">{stat.value}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(180,30,30,0.4)' }}>
                    {stat.unit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
