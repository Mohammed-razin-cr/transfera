import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!glow || !finePointer) return

    let frameId = null
    let x = -700
    let y = -700

    const renderPosition = () => {
      glow.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`
      glow.style.opacity = '1'
      frameId = null
    }

    const handlePointerMove = (event) => {
      x = event.clientX
      y = event.clientY
      if (frameId === null) frameId = requestAnimationFrame(renderPosition)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  return <div ref={glowRef} className="mouse-glow fixed pointer-events-none z-0" aria-hidden="true" />
}
