import { useState, useEffect } from 'react'

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255, 0, 104, 0.04), transparent 45%)`,
      }}
    />
  )
}
