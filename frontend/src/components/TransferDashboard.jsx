import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Activity, Clock, Shield, FileCheck, Zap, ArrowUpRight } from 'lucide-react'
import { createVisibilityLoop } from '../utils/animation'

export default function TransferDashboard() {
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

    const points = Array.from({ length: 20 }, () => ({
      x: 0, y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.018,
      amplitude: 18 + Math.random() * 28,
      baseHeight: 38 + Math.random() * 28,
    }))

    // Second line for layered effect
    const points2 = Array.from({ length: 20 }, () => ({
      x: 0, y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
      amplitude: 10 + Math.random() * 18,
      baseHeight: 50 + Math.random() * 20,
    }))

    let time = 0

    const animate = (_time, _deltaMs, frameScale) => {
      time += 0.016 * frameScale
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      const w = canvas.offsetWidth, h = canvas.offsetHeight, baseY = h - 24

      // Subtle grid
      ctx.lineWidth = 0.5
      for (let i = 1; i < 5; i++) {
        const lineY = baseY - i * (baseY / 5)
        ctx.strokeStyle = 'rgba(255,20,100,0.06)'
        ctx.beginPath(); ctx.moveTo(12, lineY); ctx.lineTo(w - 12, lineY); ctx.stroke()
      }
      for (let i = 1; i < 8; i++) {
        const lineX = 12 + i * ((w - 24) / 8)
        ctx.strokeStyle = 'rgba(255,20,100,0.04)'
        ctx.beginPath(); ctx.moveTo(lineX, 0); ctx.lineTo(lineX, baseY); ctx.stroke()
      }

      // Scan line
      const scanY = ((time * 60) % (h + 40)) - 20
      if (scanY >= 0 && scanY <= h) {
        ctx.strokeStyle = 'rgba(255,0,80,0.08)'
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY); ctx.stroke()
      }

      // Second (baby pink) line
      points2.forEach((pt, i) => {
        pt.phase += pt.speed * frameScale
        pt.x = 12 + i * (w - 24) / (points2.length - 1)
        pt.y = baseY - (pt.baseHeight + Math.sin(pt.phase) * pt.amplitude)
      })
      ctx.beginPath()
      ctx.moveTo(12, baseY); ctx.lineTo(points2[0].x, points2[0].y)
      for (let i = 0; i < points2.length - 1; i++) {
        const xc = (points2[i].x + points2[i + 1].x) / 2, yc = (points2[i].y + points2[i + 1].y) / 2
        ctx.quadraticCurveTo(points2[i].x, points2[i].y, xc, yc)
      }
      ctx.lineTo(points2[points2.length - 1].x, points2[points2.length - 1].y)
      ctx.lineTo(w - 12, baseY); ctx.closePath()
      const areaGrd2 = ctx.createLinearGradient(0, 0, 0, baseY)
      areaGrd2.addColorStop(0, 'rgba(220,20,100,0.08)'); areaGrd2.addColorStop(1, 'rgba(220,20,100,0)')
      ctx.fillStyle = areaGrd2; ctx.fill()

      ctx.beginPath(); ctx.moveTo(points2[0].x, points2[0].y)
      for (let i = 0; i < points2.length - 1; i++) {
        const xc = (points2[i].x + points2[i + 1].x) / 2, yc = (points2[i].y + points2[i + 1].y) / 2
        ctx.quadraticCurveTo(points2[i].x, points2[i].y, xc, yc)
      }
      ctx.lineTo(points2[points2.length - 1].x, points2[points2.length - 1].y)
      ctx.strokeStyle = 'rgba(255,100,160,0.35)'; ctx.lineWidth = 1.2
      ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(255,80,140,0.4)'; ctx.stroke(); ctx.shadowBlur = 0

      // Primary (crimson/hot-pink) line
      points.forEach((pt, i) => {
        pt.phase += pt.speed * frameScale
        pt.x = 12 + i * (w - 24) / (points.length - 1)
        pt.y = baseY - (pt.baseHeight + Math.sin(pt.phase) * pt.amplitude)
      })
      ctx.beginPath()
      ctx.moveTo(12, baseY); ctx.lineTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2, yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.lineTo(w - 12, baseY); ctx.closePath()
      const areaGrd = ctx.createLinearGradient(0, 0, 0, baseY)
      areaGrd.addColorStop(0, 'rgba(255,0,80,0.22)'); areaGrd.addColorStop(0.6, 'rgba(220,0,60,0.08)'); areaGrd.addColorStop(1, 'rgba(255,0,80,0)')
      ctx.fillStyle = areaGrd; ctx.fill()

      ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2, yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)

      const lineGrd = ctx.createLinearGradient(0, 0, w, 0)
      lineGrd.addColorStop(0, '#dc143c')
      lineGrd.addColorStop(0.4, '#ff0068')
      lineGrd.addColorStop(0.7, '#ff69b4')
      lineGrd.addColorStop(1, '#ff1493')
      ctx.strokeStyle = lineGrd; ctx.lineWidth = 2.2
      ctx.shadowBlur = 14; ctx.shadowColor = 'rgba(255,0,104,0.65)'; ctx.stroke(); ctx.shadowBlur = 0

      // Glowing data points
      points.forEach((pt, i) => {
        if (i % 3 !== 0) return
        const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10)
        grd.addColorStop(0, 'rgba(255,105,180,0.5)'); grd.addColorStop(1, 'rgba(255,0,104,0)')
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill()
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 8; ctx.shadowColor = '#ff69b4'; ctx.fill(); ctx.shadowBlur = 0
      })

    }
    loop = createVisibilityLoop(canvas, animate, { rootMargin: '180px 0px' })

    return () => { loop.stop(); resizeObserver.disconnect() }
  }, [])

  const stats = [
    { icon: Activity,  label: 'Active Transfers', value: '12',   unit: 'live',      color: '#ff0068',  bg: 'rgba(255,0,104,0.1)',  border: 'rgba(255,0,104,0.25)' },
    { icon: Shield,    label: 'Encryption',        value: 'NaCl', unit: 'secretbox', color: '#ff69b4',  bg: 'rgba(255,105,180,0.1)', border: 'rgba(255,105,180,0.25)' },
    { icon: Clock,     label: 'Avg Latency',        value: '14',   unit: 'ms',        color: '#dc143c',  bg: 'rgba(220,20,60,0.1)',  border: 'rgba(220,20,60,0.25)' },
    { icon: FileCheck, label: 'Data Transferred',   value: '1.2',  unit: 'TB',        color: '#ff1493',  bg: 'rgba(255,20,147,0.1)', border: 'rgba(255,20,147,0.25)' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="dashboard" className="relative py-20 sm:py-24 lg:py-40 overflow-hidden">
      {/* Top hairline */}
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position:'absolute', top:'10%', left:'-5%', width:'520px', height:'520px',
          background:'radial-gradient(circle, rgba(220,20,60,0.09) 0%, transparent 70%)', filter:'blur(70px)' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'-5%', width:'480px', height:'480px',
          background:'radial-gradient(circle, rgba(255,0,104,0.08) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', top:'50%', left:'45%', width:'300px', height:'300px',
          background:'radial-gradient(circle, rgba(255,105,180,0.05) 0%, transparent 70%)', filter:'blur(50px)' }} />
      </div>

      {/* Vertical accent hairline (left) */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,104,0.35) 30%, rgba(255,0,104,0.35) 70%, transparent)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">

          {/* ── Section Header (mirrors HeroSection eyebrow pattern) ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-5 mb-7">
              <span className="eyebrow-label flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Real-Time
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,0,104,0.4), transparent)' }} />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="hero-title dashboard-title text-white leading-none">
                Transfer<br />
                <span style={{
                  background: 'linear-gradient(90deg, #ff0068 0%, #ff69b4 45%, #dc143c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Dashboard</span>
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right"
                style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 0 }}>
                Monitor your data flow with real-time analytics and encrypted transfer visualization.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Main Layout ── */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* ── Chart Card (spans 2 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, rgba(30,3,19,0.95) 0%, rgba(16,2,10,0.98) 100%)',
                borderRadius: 'var(--radius-cards)',
                border: '1px solid rgba(255,0,104,0.15)',
                boxShadow: '0 0 60px rgba(255,0,104,0.06)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,0,104,0.32)'
                e.currentTarget.style.boxShadow = '0 0 80px rgba(255,0,104,0.12), rgba(255,0,104,0.4) 0px 0px 33px 0px'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,0,104,0.15)'
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255,0,104,0.06)'
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,0,104,0.1)', background: 'rgba(16,2,10,0.6)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(255,0,104,0.12)', border: '1px solid rgba(255,0,104,0.25)' }}>
                    <Activity className="w-3.5 h-3.5" style={{ color: '#ff69b4' }} />
                  </div>
                  <span className="font-semibold text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Transfer Throughput
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {/* Legend */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 rounded-full" style={{ background: '#ff0068' }} />
                    <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Upload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 rounded-full" style={{ background: 'rgba(255,105,180,0.5)' }} />
                    <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff0068' }} />
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(255,0,104,0.8)' }}>Live</span>
                  </div>
                </div>
              </div>

              {/* Canvas chart */}
              <div className="relative">
                <canvas ref={canvasRef} className="w-full h-56"
                  style={{ background: 'linear-gradient(180deg, rgba(16,2,10,0.98) 0%, rgba(30,3,19,0.95) 100%)' }} />
                {/* Overlay corner label */}
                <div className="absolute top-3 left-4">
                  <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,0,104,0.4)' }}>
                    MB/s
                  </span>
                </div>
              </div>

              {/* Time axis */}
              <div className="flex justify-between px-6 py-3"
                style={{ borderTop: '1px solid rgba(255,0,104,0.08)', background: 'rgba(16,2,10,0.5)' }}>
                {['0s', '10s', '20s', '30s', '40s', '50s', '60s'].map((t) => (
                  <span key={t} className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* ── Stats Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(30,3,19,0.95) 0%, rgba(16,2,10,0.98) 100%)',
                borderRadius: 'var(--radius-cards)',
                border: '1px solid rgba(255,0,104,0.12)',
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between px-6 py-5 cursor-default transition-all duration-300"
                  style={{ borderBottom: index < stats.length - 1 ? '1px solid rgba(255,0,104,0.08)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,104,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[10px] tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {stat.label}
                      </p>
                      <p className="section-heading text-xl leading-none">{stat.value}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded-md"
                    style={{ color: stat.color, background: stat.bg, border: `1px solid ${stat.border}` }}>
                    {stat.unit}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Bottom CTA row (mirrors Hero CTA) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-wrap items-center justify-between gap-6"
            style={{ borderTop: '1px solid rgba(255,0,104,0.1)', paddingTop: '2rem' }}
          >
            <div className="flex flex-wrap gap-4">
              {[
                { dot: '#ff0068', label: 'Crimson Core', sub: 'Primary encryption layer' },
                { dot: '#ff69b4', label: 'Hot Pink Bridge', sub: 'WebRTC signaling' },
                { dot: '#dc143c', label: 'Deep Crimson', sub: 'Vault storage mode' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-full"
                  style={{ background: 'rgba(30,3,19,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: item.dot }} />
                  <div>
                    <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                    <span className="ml-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="/live" className="btn-primary group">
              <span>Open Dashboard</span>
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
  )
}
