import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Copy, Check } from 'lucide-react'

const commands = [
  { text: 'transfera send report.pdf', delay: 0, speed: 55 },
  { text: '>> Generating Access Key...', delay: 700, color: 'rgba(255,0,104,0.9)', speed: 28 },
  { text: '>> Access Key: AURORA VORTEX 73', delay: 350, color: 'rgba(255,0,104,1)', speed: 30, copyable: true },
  { text: '>> Encrypting with NaCl secretbox...', delay: 550, color: 'rgba(255,0,104,0.75)', speed: 22 },
  { text: '>> Encrypted OK', delay: 280, color: 'rgba(100,220,130,1)', speed: 35 },
  { text: '>> DirectLink mode active', delay: 380, color: 'rgba(255,200,80,1)', speed: 32 },
  { text: '>> Waiting for Destination Node...', delay: 480, color: 'rgba(255,255,255,0.3)', speed: 26 },
  { text: '>> Destination Node joined', delay: 1800, color: 'rgba(100,220,130,1)', speed: 36 },
  { text: '>> Transferring: 100% (14.2 MB)', delay: 580, color: 'rgba(255,0,104,0.85)', speed: 22 },
  { text: '>> Done. File delivered securely.', delay: 380, color: 'rgba(100,220,130,1)', speed: 30 },
]

export default function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [copied, setCopied] = useState(false)
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
      }, 4500)
      return () => clearTimeout(timeout)
    }
    const currentCommand = commands[lineIndex]
    if (charIndex === 0) {
      const delayTimeout = setTimeout(() => setCharIndex(1), currentCommand.delay)
      return () => clearTimeout(delayTimeout)
    }
    if (charIndex <= currentCommand.text.length) {
      const charSpeed = currentCommand.speed || 30
      intervalRef.current = setTimeout(() => {
        setCurrentLine(currentCommand.text.slice(0, charIndex)); setCharIndex(charIndex + 1)
      }, charSpeed + Math.random() * 14)
      return () => clearTimeout(intervalRef.current)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { ...currentCommand }])
        setCurrentLine(''); setLineIndex(lineIndex + 1); setCharIndex(0)
      }, 260)
      return () => clearTimeout(timeout)
    }
  }, [isActive, lineIndex, charIndex])

  const handleCopy = () => {
    navigator.clipboard?.writeText('AURORA VORTEX 73').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <section ref={sectionRef} id="terminal" className="relative py-20 sm:py-24 lg:py-36 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.055) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="flex items-center gap-5 mb-6">
              <span className="eyebrow-label">Try It</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="section-heading section-title leading-none">
                Terminal<br />
                <span className="gradient-text">Demo</span>
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 0 }}>
                See how a transfer flows in real-time. No accounts. No passwords. Just pure encryption.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="glow-card overflow-hidden" style={{ padding: 0 }}>
              {/* Title bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3"
                style={{ background: 'rgba(10,2,6,0.7)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f56' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#27c93f' }} />
                  </div>
                  <div className="flex items-center gap-2 ml-1 sm:ml-2">
                    <Terminal className="w-3 h-3" style={{ color: 'rgba(255,0,104,0.5)' }} />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      transfera-cli
                    </span>
                  </div>
                </div>
                {/* Live badge */}
                <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                  style={{ background: 'rgba(100,220,130,0.1)', border: '1px solid rgba(100,220,130,0.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#64dc82' }} />
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-widest uppercase" style={{ color: 'rgba(100,220,130,0.9)' }}>Live</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-3.5 sm:p-6 min-h-[260px] sm:min-h-[300px] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <div className="mb-3 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  ~/documents $
                </div>
                {displayedLines.map((line, index) => (
                  <div key={index} className="mb-1.5 flex items-start gap-2.5 sm:gap-3 group/line">
                    <span className="font-mono text-[8px] sm:text-[9px] select-none mt-0.5 w-3.5 sm:w-4 flex-shrink-0 text-right"
                      style={{ color: 'rgba(255,255,255,0.12)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: line.color || 'rgba(255,255,255,0.4)' }} className="flex-1 break-words">
                      {line.text}
                    </span>
                    {line.copyable && (
                      <button
                        onClick={handleCopy}
                        className="opacity-70 sm:opacity-0 sm:group-hover/line:opacity-100 transition-opacity duration-200 flex-shrink-0 p-1"
                        aria-label="Copy access key"
                      >
                        {copied
                          ? <Check className="w-3 h-3" style={{ color: 'rgba(100,220,130,0.9)' }} />
                          : <Copy className="w-3 h-3" style={{ color: 'rgba(255,0,104,0.6)' }} />}
                      </button>
                    )}
                  </div>
                ))}
                {currentLine && (
                  <div className="mb-1.5 flex items-start gap-2.5 sm:gap-3">
                    <span className="font-mono text-[8px] sm:text-[9px] select-none mt-0.5 w-3.5 sm:w-4 flex-shrink-0 text-right"
                      style={{ color: 'rgba(255,255,255,0.12)' }}>
                      {String(displayedLines.length + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: commands[lineIndex]?.color || 'rgba(255,255,255,0.4)' }} className="flex-1 break-words">
                      {currentLine}
                    </span>
                    <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse shrink-0"
                      style={{ background: 'rgba(255,0,104,0.9)', verticalAlign: 'text-bottom' }} />
                  </div>
                )}
                {!currentLine && lineIndex === 0 && (
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-3.5 sm:w-4 flex-shrink-0" />
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
