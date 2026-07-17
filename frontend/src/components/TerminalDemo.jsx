import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const commands = [
  { text: 'transfera send report.pdf', delay: 0 },
  { text: '>> Generating Access Key...', delay: 800, isAccent: true },
  { text: '>> Access Key: AURORA VORTEX 73', delay: 400, color: 'rgba(255,0,104,1)' },
  { text: '>> Encrypting with NaCl secretbox...', delay: 600, isAccent: true },
  { text: '>> Encrypted OK', delay: 300, color: 'rgba(100,220,130,1)' },
  { text: '>> DirectLink mode active', delay: 400, color: 'rgba(255,200,80,1)' },
  { text: '>> Waiting for Destination Node...', delay: 500, color: 'rgba(255,255,255,0.3)' },
  { text: '>> Destination Node joined', delay: 2000, color: 'rgba(100,220,130,1)' },
  { text: '>> Transferring: 100% (14.2 MB)', delay: 600, isAccent: true },
  { text: '>> Done. File delivered securely.', delay: 400, color: 'rgba(100,220,130,1)' },
]

export default function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let isIntersecting = false
    const syncActiveState = () => setIsActive(isIntersecting && !document.hidden)

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      syncActiveState()
    }, { rootMargin: '180px 0px' })

    const handleVisibility = () => syncActiveState()

    observer.observe(section)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  useEffect(() => {
    if (!isActive) return

    if (lineIndex >= commands.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines([]); setLineIndex(0); setCharIndex(0)
      }, 5000)
      return () => clearTimeout(timeout)
    }
    const currentCommand = commands[lineIndex]
    if (charIndex === 0) {
      const delayTimeout = setTimeout(() => setCharIndex(1), currentCommand.delay)
      return () => clearTimeout(delayTimeout)
    }
    if (charIndex <= currentCommand.text.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentLine(currentCommand.text.slice(0, charIndex)); setCharIndex(charIndex + 1)
      }, 28 + Math.random() * 18)
      return () => clearTimeout(intervalRef.current)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { ...currentCommand }])
        setCurrentLine(''); setLineIndex(lineIndex + 1); setCharIndex(0)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [isActive, lineIndex, charIndex])

  return (
    <section ref={sectionRef} id="terminal" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Ambient glow */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

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
              <span className="eyebrow-label">Try It</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="section-heading text-[clamp(40px,5vw,62px)] leading-none">
                Terminal<br />
                <span className="gradient-text">Demo</span>
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.012px' }}>
                See how a transfer flows in real-time. No accounts. No passwords. Just pure encryption.
              </p>
            </div>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="glow-card overflow-hidden" style={{ padding: 0 }}>
              {/* Title bar */}
              <div className="flex items-center gap-3 px-5 py-3.5"
                style={{ background: 'rgba(16,2,10,0.5)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f56' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#27c93f' }} />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Terminal className="w-3 h-3" style={{ color: 'rgba(255,0,104,0.5)' }} />
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    transfera-cli
                  </span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-6 min-h-[300px] font-mono text-xs sm:text-sm leading-relaxed">
                <div className="mb-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  ~/documents $
                </div>
                {displayedLines.map((line, index) => (
                  <div key={index} className="mb-1.5">
                    <span style={{ color: line.color || (line.isAccent ? 'rgba(255,0,104,1)' : 'rgba(255,255,255,0.4)') }}>
                      {line.text}
                    </span>
                  </div>
                ))}
                {currentLine && (
                  <div className="mb-1.5">
                    <span style={{ color: commands[lineIndex]?.color || (commands[lineIndex]?.isAccent ? 'rgba(255,0,104,1)' : 'rgba(255,255,255,0.4)') }}>
                      {currentLine}
                    </span>
                    <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse"
                      style={{ background: 'rgba(255,0,104,0.9)', verticalAlign: 'text-bottom' }} />
                  </div>
                )}
                {!currentLine && lineIndex === 0 && (
                  <div>
                    <span className="inline-block w-1.5 h-4 animate-pulse"
                      style={{ background: 'rgba(255,0,104,0.9)', verticalAlign: 'text-bottom' }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
