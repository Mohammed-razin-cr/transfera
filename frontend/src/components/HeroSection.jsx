import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Eye, ShieldCheck, Radio, Fingerprint } from 'lucide-react'

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
    for (let i = 0; i < 8; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 2.5 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const mouse = { x: -1000, y: -1000, isDown: false }
    let draggedNode = null

    const getCoords = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const onMouseDown = (e) => {
      mouse.isDown = true
      const coords = getCoords(e)
      mouse.x = coords.x; mouse.y = coords.y
      let closestNode = null, minDist = 35
      nodes.forEach((node) => {
        const dx = node.x - mouse.x, dy = node.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist) { minDist = dist; closestNode = node }
      })
      if (closestNode) { draggedNode = closestNode; draggedNode.vx = 0; draggedNode.vy = 0 }
      else if (nodes.length < 15) {
        nodes.push({ x: mouse.x, y: mouse.y, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, radius: 2.5 + Math.random() * 2.5, pulse: Math.random() * Math.PI * 2 })
      }
    }

    const onMouseMove = (e) => {
      const coords = getCoords(e)
      mouse.x = coords.x; mouse.y = coords.y
      if (draggedNode) { draggedNode.x = mouse.x; draggedNode.y = mouse.y }
    }

    const onMouseUp = () => {
      if (draggedNode) { draggedNode.vx = (Math.random() - 0.5) * 0.35; draggedNode.vy = (Math.random() - 0.5) * 0.35; draggedNode = null }
      mouse.isDown = false
    }

    const onMouseLeave = () => { onMouseUp(); mouse.x = -1000; mouse.y = -1000 }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchstart', onMouseDown, { passive: true })
    canvas.addEventListener('touchmove', onMouseMove, { passive: true })
    canvas.addEventListener('touchend', onMouseUp, { passive: true })

    const dataPackets = []
    let packetTimer = 0, animTime = 0

    const animate = () => {
      animTime += 0.015
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Plasma pink palette
      const r = 255, g = 0, b = 104

      // Subtle grid
      ctx.strokeStyle = `rgba(255,0,104,0.025)`
      ctx.lineWidth = 0.5
      for (let x = 40; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 40; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

      // Scan line
      const scanY = (animTime * 100) % (h + 40) - 20
      if (scanY >= 0 && scanY <= h) {
        ctx.strokeStyle = `rgba(255,0,104,0.06)`
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY); ctx.stroke()
        const scanGrd = ctx.createLinearGradient(0, scanY - 35, 0, scanY)
        scanGrd.addColorStop(0, `rgba(255,0,104,0)`)
        scanGrd.addColorStop(1, `rgba(255,0,104,0.025)`)
        ctx.fillStyle = scanGrd
        ctx.fillRect(0, scanY - 35, w, 35)
      }

      nodes.forEach((node) => {
        if (node !== draggedNode) {
          node.x += node.vx; node.y += node.vy
          if (node.x < 0 || node.x > w) node.vx *= -1
          if (node.y < 0 || node.y > h) node.vy *= -1
        }
        node.pulse += 0.03
      })

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.3
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
          }
        }
      }

      // Cursor connections
      if (mouse.x >= 0 && mouse.x <= w) {
        nodes.forEach((node) => {
          const dx = node.x - mouse.x, dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.4
            ctx.strokeStyle = `rgba(255,0,104,${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
          }
        })
      }

      // Packets
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
        const from = nodes[p.from], to = nodes[p.to]
        if (!from || !to) { dataPackets.splice(i, 1); continue }
        const x = from.x + (to.x - from.x) * p.progress
        const y = from.y + (to.y - from.y) * p.progress
        const trailGrd = ctx.createLinearGradient(x, y, from.x, from.y)
        trailGrd.addColorStop(0, `rgba(255,0,104,0.6)`); trailGrd.addColorStop(1, `rgba(255,0,104,0)`)
        ctx.strokeStyle = trailGrd; ctx.lineWidth = 1.0
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(from.x, from.y); ctx.stroke()
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 9)
        grd.addColorStop(0, `rgba(255,0,104,0.9)`); grd.addColorStop(1, `rgba(255,0,104,0)`)
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,0,104,1)`; ctx.fill()
      }

      // Nodes
      nodes.forEach((node) => {
        const isHovered = !draggedNode && Math.sqrt((node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2) < 22
        const isDragged = node === draggedNode
        const pulseR = node.radius + Math.sin(node.pulse) * 1.5 + (isHovered || isDragged ? 2 : 0)
        const glowRadius = isDragged ? 36 : isHovered ? 26 : 20
        const outerGrd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
        outerGrd.addColorStop(0, `rgba(255,0,104,${isDragged ? 0.35 : isHovered ? 0.28 : 0.18})`)
        outerGrd.addColorStop(1, `rgba(255,0,104,0)`)
        ctx.beginPath(); ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2); ctx.fillStyle = outerGrd; ctx.fill()
        ctx.beginPath(); ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2)
        ctx.fillStyle = isDragged || isHovered ? `rgba(255,0,104,0.95)` : `rgba(255,0,104,0.75)`
        ctx.fill()
        ctx.fillStyle = isDragged || isHovered ? `rgba(255,150,180,0.6)` : `rgba(255,0,104,0.38)`
        ctx.font = '7px monospace'; ctx.textAlign = 'left'
        ctx.fillText(`[${Math.round(node.x)}, ${Math.round(node.y)}]`, node.x + pulseR + 6, node.y + 2)
        if (isHovered || isDragged) {
          ctx.strokeStyle = `rgba(255,0,104,0.45)`; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4])
          ctx.beginPath(); ctx.arc(node.x, node.y, glowRadius + 5, animTime * 1.5, animTime * 1.5 + Math.PI * 2); ctx.stroke()
          ctx.setLineDash([])
        }
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchstart', onMouseDown)
      canvas.removeEventListener('touchmove', onMouseMove)
      canvas.removeEventListener('touchend', onMouseUp)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative min-h-[96vh] flex items-center overflow-hidden pt-20">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 10% 20%, rgba(255,0,104,0.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 75%, rgba(145,1,61,0.08) 0%, transparent 45%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(16,2,10,0.95) 100%)' }} />
      </div>

      {/* Vertical accent hairline */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,104,0.4) 30%, rgba(255,0,104,0.4) 70%, transparent)' }} />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,104,0.12) 50%, transparent 100%)', top: '30%' }} />

      <div className="section-container relative z-10 py-20 lg:py-28">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">

              {/* Eyebrow */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
                <span className="eyebrow-label flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
                  Private transfer protocol · v3
                </span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,0,104,0.4), transparent)' }} />
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={itemVariants}
                className="hero-title text-[clamp(52px,7vw,104px)] text-white mb-8"
              >
                Secure File
                <br />
                <span className="gradient-text">Transfer</span>
                <br />
                Between Devices.
              </motion.h1>

              {/* Sub */}
              <motion.p variants={itemVariants} className="hero-subtitle mb-10 max-w-lg">
                Send files from phone to PC or between any browsers with end-to-end encryption, QR pairing, and no account required.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <a href="/live" className="btn-primary group">
                  <span>Start Secure Transfer</span>
                  <span className="btn-icon">
                    <motion.div whileHover={{ x: 3, y: -3 }} transition={{ duration: 0.2 }}>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </span>
                </a>
                <a href="#security" className="btn-secondary group">
                  <Eye className="w-4 h-4" />
                  <span>View Architecture</span>
                </a>
              </motion.div>

              {/* Trust pills */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <span className="hero-trust-pill">
                  <Radio className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                  Secure Gateway Online
                </span>
                <span className="hero-trust-pill">
                  <ShieldCheck className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
                  End-to-end encrypted
                </span>
                <span className="hero-trust-pill">
                  <Fingerprint className="h-3 w-3" style={{ color: 'var(--color-plasma-pink)' }} />
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
              {/* Ambient glow behind console */}
              <div className="absolute -inset-12 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,0,104,0.12) 0%, transparent 70%)' }} />

              <div className="network-console relative overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2.5 px-5 py-3.5"
                  style={{ background: 'rgba(16,2,10,0.8)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f56' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#27c93f' }} />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase ml-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Live Network · 8 nodes
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
                    <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,0,104,0.7)' }}>ACTIVE</span>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  className="w-full h-72 sm:h-80 lg:h-[380px] xl:h-[440px]"
                  style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(255,0,104,0.05), rgba(16,2,10,0.98) 65%)' }}
                />

                {/* Footer bar */}
                <div className="flex justify-between items-center px-5 py-3"
                  style={{ background: 'rgba(16,2,10,0.8)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-plasma-pink)' }} />
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>E2E Encrypted</span>
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Nodes: <span style={{ color: 'var(--color-plasma-pink)' }}>8</span>
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Latency: <span style={{ color: 'rgba(255,0,104,0.8)' }}>12ms</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 rule-line-full" />
    </section>
  )
}
