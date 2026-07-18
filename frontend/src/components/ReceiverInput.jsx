import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Key, AlertCircle, Loader2, X } from 'lucide-react'

export default function ReceiverInput() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    if (isSubmitting) return
    setError('')
    const p = norm(value)
    if (!p || p.length < 5) {
      setError('Enter a valid Access Key')
      inputRef.current?.focus()
      return
    }
    if (!window.crypto?.subtle) {
      setError('Secure browser encryption is unavailable')
      return
    }

    setIsSubmitting(true)
    try {
      const t = await sha256('transfera:token:' + p)
      const k = await sha256('transfera:key:' + p)
      const rt = await sha256('transfera:receive-token:' + p)

      try {
        const room = await fetch('/room/' + hex(rt.slice(0, 8)))
        if (room.ok && (await room.json()).waiting) {
          location.href = '/u/' + hex(rt.slice(0, 8)) + '#' + b64url(k)
          return
        }
      } catch {
        // Room lookup is optional; the direct download route remains available.
      }

      location.href = '/d/' + hex(t.slice(0, 8)) + '#' + b64url(k)
    } catch {
      setError('Could not open this transfer. Check the key and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 sm:py-24 lg:py-32">
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
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-5 mb-6">
              <span className="eyebrow-label">Access</span>
              <div className="flex-1 rule-line-full" />
            </div>
            <h2 className="section-heading section-title leading-none">
              Receive a<br />
              <span className="gradient-text">Transfer</span>
            </h2>
            <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: 0 }}>
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
            <div className="glow-card-subtle receive-panel">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label htmlFor="access-key" className="font-semibold text-sm text-white">Access Key</label>
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Case insensitive
                </span>
              </div>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(event) => { event.preventDefault(); submit() }}>
                <div className="relative flex-1">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: 'rgba(255,0,104,0.5)' }} />
                  <input
                    id="access-key"
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => { setValue(e.target.value.toUpperCase()); if (error) setError('') }}
                    placeholder="AURORA VORTEX 73"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck="false"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'access-key-error access-key-help' : 'access-key-help'}
                    className="access-key-input w-full py-3.5 pl-10 pr-11 font-mono text-sm tracking-wider placeholder:opacity-20"
                  />
                  {value && !isSubmitting && (
                    <button
                      type="button"
                      className="icon-button absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg"
                      aria-label="Clear Access Key"
                      onClick={() => { setValue(''); setError(''); inputRef.current?.focus() }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary group whitespace-nowrap sm:min-w-[174px]">
                  <span>{isSubmitting ? 'Checking Key' : 'Open Transfer'}</span>
                  <span className="btn-icon">
                    {isSubmitting
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </button>
              </form>

              {error && (
                <div id="access-key-error" role="alert" className="flex items-center gap-2 mt-4 font-mono text-[11px] tracking-wide"
                  style={{ color: 'rgba(255,0,104,0.9)' }}>
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <p id="access-key-help" className="font-mono text-[10px] mt-5 tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Access Keys are case-insensitive and expire after 10 minutes in Vault Storage mode.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
