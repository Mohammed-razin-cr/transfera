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

    const bars = Array.from({ length: 40 }, () => ({
      height: Math.random() * 60 + 10,
      speed: Math.random() * 2 + 1,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.05

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const barWidth = (w - 40) / bars.length

      bars.forEach((bar, i) => {
        bar.height += bar.speed * bar.direction
        if (bar.height > 70) bar.direction = -1
        if (bar.height < 10) bar.direction = 1

        const x = 20 + i * barWidth
        const barHeight = bar.height + Math.sin(time + i * 0.3) * 15
        const y = h - 36 - barHeight

        const gradient = ctx.createLinearGradient(x, y + barHeight, x, y)
        gradient.addColorStop(0, 'rgba(180, 30, 30, 0.06)')
        gradient.addColorStop(0.5, 'rgba(180, 30, 30, 0.28)')
        gradient.addColorStop(1, 'rgba(200, 64, 64, 0.5)')

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 2, barHeight)

        ctx.fillStyle = 'rgba(200, 64, 64, 0.5)'
        ctx.fillRect(x, y, barWidth - 2, 1)
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
    { icon: Activity, label: 'Active Transfers', value: '12', unit: 'live' },
    { icon: Shield, label: 'Encryption', value: 'AES-256', unit: 'GCM' },
    { icon: Clock, label: 'Avg Latency', value: '14', unit: 'ms' },
    { icon: FileCheck, label: 'Data Transferred', value: '1.2', unit: 'TB' },
  ]

  return (
    <section id="dashboard" className="relative py-24 lg:py-36">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Editorial bg number */}
      <div className="absolute right-0 top-8 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.04)', letterSpacing: '-0.05em' }}>04</div>

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
              <span className="eyebrow-label">Real-Time</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
              Transfer<br />
              <span className="gradient-text italic">Dashboard</span>
            </h2>
            <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: '#9c8e8a' }}>
              Monitor your data flow with real-time analytics and encrypted transfer visualization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {/* Chart — spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
              style={{ background: '#0a0808' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4" style={{ color: 'rgba(180,30,30,0.6)' }} />
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#6a5050' }}>
                    Transfer Analytics
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-transfera-red animate-pulse" />
                  <span className="font-mono text-[10px]" style={{ color: '#8c7e7b' }}>Live</span>
                </div>
              </div>
              <canvas ref={canvasRef} className="w-full h-52" style={{ background: 'rgba(6,4,4,0.9)' }} />
              <div className="flex justify-between px-6 py-3 border-t border-white/5">
                {['0s', '10s', '20s', '30s', '40s', '50s', '60s'].map((t) => (
                  <span key={t} className="font-mono text-[10px]" style={{ color: '#8c7e7b' }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats column */}
            <div className="flex flex-col divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)', background: '#0a0808' }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex items-center justify-between px-6 py-5 transition-colors duration-300 flex-1"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="flex items-center gap-4">
                    <stat.icon className="w-4 h-4 transition-colors duration-300" style={{ color: 'rgba(180,30,30,0.4)' }} />
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: '#8c7e7b' }}>
                        {stat.label}
                      </p>
                      <p className="section-heading text-lg text-white">{stat.value}</p>
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
