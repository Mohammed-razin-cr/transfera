import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import QrScanner from 'qr-scanner'
import { ArrowRight, Key, AlertCircle, Loader2, X, ScanLine, ImagePlus, Camera, CameraOff, ShieldCheck } from 'lucide-react'
import { resolveTransferQr } from '../utils/transferQr'

export default function ReceiverInput() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanState, setScanState] = useState('idle')
  const [scanError, setScanError] = useState('')
  const inputRef = useRef(null)
  const scanButtonRef = useRef(null)
  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  const fileInputRef = useRef(null)
  const cameraReadyRef = useRef(false)
  const lastScanRef = useRef('')

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

  const closeScanner = useCallback(() => {
    setScannerOpen(false)
    window.setTimeout(() => scanButtonRef.current?.focus(), 0)
  }, [])

  const handleDecodedQr = useCallback((result) => {
    const payload = typeof result === 'string' ? result : result?.data
    if (!payload || payload === lastScanRef.current) return false
    lastScanRef.current = payload

    const transferUrl = resolveTransferQr(payload, window.location.origin)
    if (!transferUrl) {
      setScanError('This QR code is not a valid Transfera link.')
      setScanState(cameraReadyRef.current ? 'ready' : 'error')
      return false
    }

    setScanError('')
    setScanState('success')
    scannerRef.current?.stop()
    window.setTimeout(() => window.location.assign(transferUrl), 300)
    return true
  }, [])

  useEffect(() => {
    if (!scannerOpen || !videoRef.current) return undefined

    let active = true
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeScanner()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    cameraReadyRef.current = false
    lastScanRef.current = ''
    setScanError('')
    setScanState('requesting')

    let scanner

    async function startScanner() {
      try {
        const hasCamera = await QrScanner.hasCamera()
        if (!active) return
        if (!hasCamera) {
          setScanError('No camera was found. Choose a QR image instead.')
          setScanState('error')
          return
        }

        scanner = new QrScanner(
          videoRef.current,
          handleDecodedQr,
          {
            preferredCamera: 'environment',
            maxScansPerSecond: 10,
            highlightScanRegion: false,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
            onDecodeError: () => {},
          },
        )
        scannerRef.current = scanner
        await scanner.start()
        if (!active) return
        cameraReadyRef.current = true
        setScanState('ready')
      } catch (cameraError) {
        if (!active) return
        const permissionDenied = cameraError?.name === 'NotAllowedError' || /permission|denied/i.test(String(cameraError))
        const noCamera = cameraError?.name === 'NotFoundError' || /not found|no camera/i.test(String(cameraError))
        setScanError(
          !window.isSecureContext
            ? 'Camera scanning requires HTTPS or localhost.'
            : permissionDenied
              ? 'Camera access was denied. Allow access or choose a QR image.'
              : noCamera
                ? 'No camera was found. Choose a QR image instead.'
                : 'The camera could not start. Choose a QR image instead.',
        )
        setScanState('error')
      }
    }

    startScanner()

    return () => {
      active = false
      cameraReadyRef.current = false
      scanner?.stop()
      scanner?.destroy()
      scannerRef.current = null
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeScanner, handleDecodedQr, scannerOpen])

  async function scanQrImage(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setScanError('')
    setScanState('image')
    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true })
      if (!handleDecodedQr(result)) {
        setScanState(cameraReadyRef.current ? 'ready' : 'error')
      }
    } catch {
      setScanError('No readable QR code was found in that image.')
      setScanState(cameraReadyRef.current ? 'ready' : 'error')
    }
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
                <button
                  ref={scanButtonRef}
                  type="button"
                  className="btn-secondary group whitespace-nowrap sm:min-w-[128px]"
                  onClick={() => setScannerOpen(true)}
                  aria-haspopup="dialog"
                >
                  <ScanLine className="h-4 w-4" />
                  <span>Scan QR</span>
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

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {scannerOpen && (
            <motion.div
              className="qr-scanner-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="qr-scanner-backdrop" aria-hidden="true" onClick={closeScanner} />
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="qr-scanner-title"
                aria-describedby="qr-scanner-status"
                className="qr-scanner-dialog"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="qr-scanner-header">
                  <div>
                    <span className="eyebrow-label">Secure pairing</span>
                    <h3 id="qr-scanner-title">Scan Transfer QR</h3>
                  </div>
                  <button type="button" className="icon-button h-10 w-10 rounded-lg" onClick={closeScanner} aria-label="Close QR scanner" autoFocus>
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="qr-scanner-stage">
                  <video ref={videoRef} muted playsInline aria-label="QR scanner camera preview" />
                  <div className="qr-scanner-guide" aria-hidden="true">
                    <span className="qr-scanner-line" />
                  </div>
                  {(scanState === 'requesting' || scanState === 'image') && (
                    <div className="qr-scanner-stage-state">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  )}
                  {scanState === 'error' && (
                    <div className="qr-scanner-stage-state">
                      <CameraOff className="h-7 w-7" />
                    </div>
                  )}
                  {scanState === 'success' && (
                    <div className="qr-scanner-stage-state qr-scanner-success">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div id="qr-scanner-status" className="qr-scanner-status" aria-live="polite">
                  {scanState === 'requesting' && <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Requesting camera</>}
                  {scanState === 'ready' && <><Camera className="h-3.5 w-3.5" /> Camera ready</>}
                  {scanState === 'image' && <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Reading QR image</>}
                  {scanState === 'success' && <><ShieldCheck className="h-3.5 w-3.5" /> Transfer QR verified</>}
                  {scanState === 'error' && <><CameraOff className="h-3.5 w-3.5" /> Camera unavailable</>}
                </div>

                {scanError && (
                  <div className="qr-scanner-error" role="alert">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{scanError}</span>
                  </div>
                )}

                <div className="qr-scanner-footer">
                  <button type="button" className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus className="h-4 w-4" />
                    <span>Choose QR Image</span>
                  </button>
                  <span className="qr-scanner-trust">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Transfera links only
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    aria-label="Choose an image containing a Transfera QR code"
                    onChange={scanQrImage}
                  />
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
