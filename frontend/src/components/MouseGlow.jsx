import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!glow || !finePointer) return

    let frameId = null
    let targetX = -700
    let targetY = -700
    let currentX = -700
    let currentY = -700

    const render = () => {
      // Fluid smooth exponential lerp damping
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12

      glow.style.transform = `translate3d(${currentX - 350}px, ${currentY - 350}px, 0)`
      glow.style.opacity = '1'

      // Keep animation running smoothly until close to target
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frameId = requestAnimationFrame(render)
      } else {
        frameId = null
      }
    }

    const handlePointerMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      if (frameId === null) {
        frameId = requestAnimationFrame(render)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  return <div ref={glowRef} className="mouse-glow fixed pointer-events-none z-0" aria-hidden="true" />
}
