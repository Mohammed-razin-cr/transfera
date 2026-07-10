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

    const points = Array.from({ length: 16 }, () => ({
      x: 0, y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
      amplitude: 15 + Math.random() * 25,
      baseHeight: 35 + Math.random() * 25,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      const w = canvas.offsetWidth, h = canvas.offsetHeight, baseY = h - 28

      // Grid lines
      for (let i = 0; i < 4; i++) {
        const lineY = baseY - (i + 1) * (baseY / 5)
        ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(16, lineY); ctx.lineTo(w - 16, lineY); ctx.stroke()
      }
      for (let i = 0; i < 6; i++) {
        const lineX = 16 + (i + 1) * ((w - 32) / 7)
        ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(lineX, 16); ctx.lineTo(lineX, baseY); ctx.stroke()
      }

      points.forEach((pt, i) => {
        pt.phase += pt.speed
        pt.x = 16 + i * (w - 32) / (points.length - 1)
        pt.y = baseY - (pt.baseHeight + Math.sin(pt.phase) * pt.amplitude)
      })

      // Area fill
      ctx.beginPath()
      ctx.moveTo(16, baseY); ctx.lineTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2, yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.lineTo(w - 16, baseY); ctx.closePath()
      const areaGrd = ctx.createLinearGradient(0, 16, 0, baseY)
      areaGrd.addColorStop(0, 'rgba(255,0,104,0.18)'); areaGrd.addColorStop(1, 'rgba(255,0,104,0)')
      ctx.fillStyle = areaGrd; ctx.fill()

      // Line stroke
      ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2, yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.strokeStyle = '#ff0068'; ctx.lineWidth = 2
      ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(255,0,104,0.6)'; ctx.stroke(); ctx.shadowBlur = 0

      // Data points
      points.forEach((pt) => {
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 8; ctx.shadowColor = '#ff0068'; ctx.fill(); ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) }
  }, [])

  const stats = [
    { icon: Activity,  label: 'Active Transfers', value: '12',   unit: 'live',      color: 'rgba(255,0,104,0.7)' },
    { icon: Shield,    label: 'Encryption',        value: 'NaCl', unit: 'secretbox', color: 'rgba(255,0,104,0.6)' },
    { icon: Clock,     label: 'Avg Latency',        value: '14',   unit: 'ms',        color: 'rgba(255,0,104,0.6)' },
    { icon: FileCheck, label: 'Data Transferred',   value: '1.2',  unit: 'TB',        color: 'rgba(255,0,104,0.7)' },
  ]

  return (
    <section id="dashboard" className="relative py-28 lg:py-40">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

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
            <h2 className="section-heading text-[clamp(40px,5vw,62px)] leading-none">
              Transfer<br />
              <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="mt-5 text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.012px' }}>
              Monitor your data flow with real-time analytics and encrypted transfer visualization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Chart - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 overflow-hidden glow-card"
              style={{ padding: 0 }}
            >
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" style={{ color: 'rgba(255,0,104,0.7)' }} />
                  <span className="font-semibold text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Transfer Throughput
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Live</span>
                </div>
              </div>
              <canvas ref={canvasRef} className="w-full h-56"
                style={{ background: 'linear-gradient(180deg, rgba(16,2,10,0.95) 0%, rgba(30,3,19,0.98) 100%)' }} />
              <div className="flex justify-between px-6 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {['0s', '10s', '20s', '30s', '40s', '50s', '60s'].map((t) => (
                  <span key={t} className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="overflow-hidden glow-card-subtle"
              style={{ padding: 0 }}
            >
              <div className="dashboard-stats-grid h-full">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between px-6 py-6 transition-all duration-300 cursor-default"
                    style={{ ':hover': { background: 'rgba(255,0,104,0.04)' } }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,104,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{ background: 'rgba(255,0,104,0.08)', border: '1px solid rgba(255,0,104,0.2)' }}>
                        <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-[10px] tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {stat.label}
                        </p>
                        <p className="section-heading text-xl">{stat.value}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(255,0,104,0.4)' }}>
                      {stat.unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
