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

    const points = Array.from({ length: 16 }, (_, i) => ({
      x: 0,
      y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
      amplitude: 15 + Math.random() * 25,
      baseHeight: 35 + Math.random() * 25,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const baseY = h - 28

      const isMatrix = document.documentElement.getAttribute('data-theme') === 'matrix'

      // Horizontal grid lines
      for (let i = 0; i < 4; i++) {
        const lineY = baseY - (i + 1) * (baseY / 5)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(16, lineY)
        ctx.lineTo(w - 16, lineY)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i < 6; i++) {
        const lineX = 16 + (i + 1) * ((w - 32) / 7)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(lineX, 16)
        ctx.lineTo(lineX, baseY)
        ctx.stroke()
      }

      // Update positions
      points.forEach((pt, i) => {
        pt.phase += pt.speed
        pt.x = 16 + i * (w - 32) / (points.length - 1)
        pt.y = baseY - (pt.baseHeight + Math.sin(pt.phase) * pt.amplitude)
      })

      // Draw area fill
      ctx.beginPath()
      ctx.moveTo(16, baseY)
      ctx.lineTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.lineTo(w - 16, baseY)
      ctx.closePath()

      const areaGrd = ctx.createLinearGradient(0, 16, 0, baseY)
      areaGrd.addColorStop(0, isMatrix ? 'rgba(34, 197, 94, 0.16)' : 'rgba(239, 68, 68, 0.16)')
      areaGrd.addColorStop(1, isMatrix ? 'rgba(34, 197, 94, 0.0)' : 'rgba(239, 68, 68, 0.0)')
      ctx.fillStyle = areaGrd
      ctx.fill()

      // Draw bezier stroke line
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)

      ctx.strokeStyle = isMatrix ? '#22c55e' : '#ef4444'
      ctx.lineWidth = 2
      ctx.shadowBlur = 10
      ctx.shadowColor = isMatrix ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'
      ctx.stroke()
      ctx.shadowBlur = 0 // reset shadow

      // Draw glowing data points
      points.forEach((pt) => {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 6
        ctx.shadowColor = isMatrix ? '#22c55e' : '#ef4444'
        ctx.fill()
        ctx.shadowBlur = 0
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
    { icon: Activity, label: 'Active Transfers', value: '12', unit: 'live', accent: 'rgba(var(--accent),0.6)' },
    { icon: Shield,   label: 'Encryption',       value: 'NaCl',   unit: 'secretbox', accent: 'rgba(100,140,255,0.6)' },
    { icon: Clock,    label: 'Avg Latency',       value: '14',   unit: 'ms',    accent: 'rgba(80,200,120,0.6)' },
    { icon: FileCheck,label: 'Data Transferred',  value: '1.2',  unit: 'TB',    accent: 'rgba(var(--accent),0.6)' },
  ]

  return (
    <section id="dashboard" className="relative py-28 lg:py-40">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Editorial bg number */}
      <div className="absolute right-0 top-8 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(var(--accent),0.035)', letterSpacing: '-0.05em' }}>04</div>

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
              className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-white/[0.055]"
              style={{ background: '#080606' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" style={{ color: 'rgba(var(--accent),0.6)' }} />
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#5e4e4e' }}>
                    Transfer Throughput
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(var(--accent))' }} />
                  <span className="font-mono text-[10px] style-label" style={{ color: '#8c7e7b' }}>Live</span>
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
            <div className="dashboard-stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex items-center justify-between px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02] cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-md transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(var(--accent),0.08)', border: '1px solid rgba(var(--accent),0.15)' }}>
                      <stat.icon className="w-3.5 h-3.5" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: '#6a5a5a' }}>
                        {stat.label}
                      </p>
                      <p className="section-heading text-xl text-white">{stat.value}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(var(--accent),0.4)' }}>
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
