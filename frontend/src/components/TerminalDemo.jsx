import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const commands = [
  { text: 'transfera send report.pdf', delay: 0 },
  { text: '>> Generating Access Key...', delay: 800, color: 'text-transfera-red' },
  { text: '>> Access Key: AURORA VORTEX 73', delay: 400, color: 'text-transfera-neonPurple' },
  { text: '>> Encrypting with NaCl secretbox...', delay: 600, color: 'text-transfera-red' },
  { text: '>> Encrypted OK', delay: 300, color: 'text-emerald-500' },
  { text: '>> DirectLink mode active', delay: 400, color: 'text-yellow-600' },
  { text: '>> Waiting for Destination Node...', delay: 500, color: 'text-white/30' },
  { text: '>> Destination Node joined', delay: 2000, color: 'text-emerald-500' },
  { text: '>> Transferring: 100% (14.2 MB)', delay: 600, color: 'text-transfera-red' },
  { text: '>> Done. File delivered securely.', delay: 400, color: 'text-emerald-500' },
]

export default function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (lineIndex >= commands.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines([])
        setLineIndex(0)
        setCharIndex(0)
      }, 5000)
      return () => clearTimeout(timeout)
    }

    const currentCommand = commands[lineIndex]

    if (charIndex === 0) {
      const delayTimeout = setTimeout(() => {
        setCharIndex(1)
      }, currentCommand.delay)
      return () => clearTimeout(delayTimeout)
    }

    if (charIndex <= currentCommand.text.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentLine(currentCommand.text.slice(0, charIndex))
        setCharIndex(charIndex + 1)
      }, 28 + Math.random() * 18)
      return () => clearTimeout(intervalRef.current)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { ...currentCommand, text: currentCommand.text }])
        setCurrentLine('')
        setLineIndex(lineIndex + 1)
        setCharIndex(0)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex])

  return (
    <section id="terminal" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Editorial bg number */}
      <div className="absolute left-0 bottom-0 font-mono text-[200px] leading-none font-bold select-none pointer-events-none"
        style={{ color: 'rgba(180,30,30,0.04)', letterSpacing: '-0.05em' }}>05</div>

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
              <h2 className="section-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                Terminal<br />
                <span className="gradient-text italic">Demo</span>
              </h2>
              <p className="text-sm max-w-xs leading-relaxed sm:text-right font-light tracking-wide" style={{ color: '#9c8e8a' }}>
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
            <div className="border border-white/[0.07] rounded-sm overflow-hidden"
              style={{ background: 'rgba(4,2,2,0.98)' }}>
              {/* Title bar */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(180,30,30,0.6)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Terminal className="w-3 h-3" style={{ color: 'rgba(180,30,30,0.5)' }} />
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#8c7e7b' }}>
                    transfera-cli
                  </span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-6 min-h-[300px] font-mono text-sm leading-relaxed">
                <div className="mb-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: '#8c7e7b' }}>
                  ~/documents $
                </div>
                {displayedLines.map((line, index) => (
                  <div key={index} className="mb-1.5">
                    <span className={line.color || 'text-white/40'}>{line.text}</span>
                  </div>
                ))}
                {currentLine && (
                  <div className="mb-1.5">
                    <span className={commands[lineIndex]?.color || 'text-white/40'}>
                      {currentLine}
                    </span>
                    <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse"
                      style={{ background: 'rgba(180,30,30,0.8)', verticalAlign: 'text-bottom' }} />
                  </div>
                )}
                {!currentLine && lineIndex === 0 && (
                  <div>
                    <span className="inline-block w-1.5 h-4 animate-pulse"
                      style={{ background: 'rgba(180,30,30,0.8)', verticalAlign: 'text-bottom' }} />
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
