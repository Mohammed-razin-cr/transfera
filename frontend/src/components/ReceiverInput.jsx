import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Key, AlertCircle } from 'lucide-react'

export default function ReceiverInput() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  function norm(p) { return p.toUpperCase().trim().replace(/\s+/g, ' ') }

  async function sha256(s) {
    const data = new TextEncoder().encode(s)
    const h = await crypto.subtle.digest('SHA-256', data)
    return new Uint8Array(h)
  }

  function hex(b) { return Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('') }

  function b64url(b) {
    let s = ''
    for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i])
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }

  async function submit() {
    setError('')
    const p = norm(value)
    if (!p || p.length < 5) { setError('Enter the Access Key'); return }
    if (!crypto || !crypto.subtle) { setError('Browser missing crypto.subtle (needs HTTPS or localhost)'); return }
    const t = await sha256('transfera:token:' + p)
    const k = await sha256('transfera:key:' + p)
    const rt = await sha256('transfera:receive-token:' + p)
    try {
      const room = await fetch('/room/' + hex(rt.slice(0, 8)))
      if (room.ok && (await room.json()).waiting) { location.href = '/u/' + hex(rt.slice(0, 8)) + '#' + b64url(k); return }
    } catch (e) {}
    location.href = '/d/' + hex(t.slice(0, 8)) + '#' + b64url(k)
  }

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 right-0 rule-line-full" />

      {/* Ambient glow */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,0,104,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="section-container relative z-10">
        <div className="section-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-5 mb-6">
              <span className="eyebrow-label">Access</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading text-[clamp(40px,5vw,62px)] leading-none">
              Receive a<br />
              <span className="gradient-text">Transfer</span>
            </h2>
            <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.012px' }}>
              Enter the Access Key shared by the Origin Node to receive your encrypted file.
            </p>
          </motion.div>

          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-2xl"
          >
            <div style={{
              background: 'var(--color-dark-mulberry)',
              borderRadius: 'var(--radius-cards)',
              padding: '32px',
              boxShadow: 'var(--shadow-xl-2)',
            }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: 'rgba(255,0,104,0.5)' }} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value.toUpperCase())}
                    onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
                    placeholder="AURORA VORTEX 73"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full py-3.5 pl-10 pr-4 font-mono text-sm tracking-wider bg-transparent transition-all duration-300 focus:outline-none placeholder:opacity-20"
                    style={{
                      background: 'rgba(16,2,10,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 'var(--radius-inputs)',
                      color: 'var(--color-frost-white)',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,0,104,0.45)'; e.target.style.boxShadow = 'var(--shadow-xl-2)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <button onClick={submit} className="btn-primary group whitespace-nowrap">
                  <span>Open Transfer</span>
                  <span className="btn-icon">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 mt-4 font-mono text-[11px] tracking-wide"
                  style={{ color: 'rgba(255,0,104,0.9)' }}>
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <p className="font-mono text-[10px] mt-5 tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Access Keys are case-insensitive and expire after 10 minutes in Vault Storage mode.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
