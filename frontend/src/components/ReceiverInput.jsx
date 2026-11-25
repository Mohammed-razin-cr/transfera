import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import QrScanner from 'qr-scanner'
import {
  ArrowRight,
  Key,
  AlertCircle,
  Loader2,
  X,
  ScanLine,
  ImagePlus,
  Camera,
  CameraOff,
  ShieldCheck,
} from 'lucide-react'
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
    <section id="receive" className="border-b border-[#27272A] py-16 sm:py-20 lg:py-24">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left Copy */}
            <div className="lg:col-span-5">
              <span className="eyebrow-label">Receive files</span>
              <h2 className="section-heading mt-3">Open a shared transfer</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                Enter the Access Key shown on the sending device, or scan its QR code to pair directly.
              </p>
            </div>

            {/* Right Interactive Panel */}
            <div className="lg:col-span-7">
              <div className="surface-panel p-5 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="access-key" className="text-sm font-medium text-[#F4F4F5]">
                    Access Key
                  </label>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Case insensitive
                  </span>
                </div>

                <form
                  className="flex flex-col gap-3 sm:flex-row"
                  onSubmit={(event) => {
                    event.preventDefault()
                    submit()
                  }}
                >
                  <div className="relative flex-1">
                    <Key
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]"
                      aria-hidden="true"
                    />
                    <input
                      id="access-key"
                      ref={inputRef}
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value.toUpperCase())
                        if (error) setError('')
                      }}
                      placeholder="AURORA VORTEX 73"
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck="false"
                      disabled={isSubmitting}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'access-key-error access-key-help' : 'access-key-help'}
                      className="access-key-input w-full py-2.5 pl-10 pr-10 font-mono text-sm tracking-wider placeholder:text-[#52525B]"
                    />
                    {value && !isSubmitting && (
                      <button
                        type="button"
                        className="icon-button absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2"
                        aria-label="Clear Access Key"
                        onClick={() => {
                          setValue('')
                          setError('')
                          inputRef.current?.focus()
                        }}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full sm:w-auto"
                    >
                      <span>{isSubmitting ? 'Checking...' : 'Open transfer'}</span>
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      ref={scanButtonRef}
                      type="button"
                      className="btn-secondary w-full sm:w-auto"
                      onClick={() => setScannerOpen(true)}
                      aria-haspopup="dialog"
                    >
                      <ScanLine className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                      <span>Scan QR</span>
                    </button>
                  </div>
                </form>

                {error && (
                  <div
                    id="access-key-error"
                    role="alert"
                    className="mt-3 flex items-center gap-2 text-xs text-[#FDA4AF]"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#F00064]" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <p id="access-key-help" className="mt-4 font-mono text-xs text-[#71717A]">
                  Keys are hashed locally with SHA-256. Vault payloads expire automatically after 10 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          scannerOpen && (
            <div className="qr-scanner-overlay">
              <div className="qr-scanner-backdrop" aria-hidden="true" onClick={closeScanner} />
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="qr-scanner-title"
                aria-describedby="qr-scanner-status"
                className="qr-scanner-dialog"
              >
                <div className="qr-scanner-header">
                  <div>
                    <span className="eyebrow-label">Secure pairing</span>
                    <h3 id="qr-scanner-title">Scan Transfer QR</h3>
                  </div>
                  <button
                    type="button"
                    className="icon-button h-9 w-9"
                    onClick={closeScanner}
                    aria-label="Close QR scanner"
                    autoFocus
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="qr-scanner-stage">
                  <video ref={videoRef} muted playsInline aria-label="QR scanner camera preview" />
                  <div className="qr-scanner-guide" aria-hidden="true">
                    <span className="qr-scanner-line" />
                  </div>
                  {(scanState === 'requesting' || scanState === 'image') && (
                    <div className="qr-scanner-stage-state">
                      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
                    </div>
                  )}
                  {scanState === 'error' && (
                    <div className="qr-scanner-stage-state">
                      <CameraOff className="h-7 w-7" aria-hidden="true" />
                    </div>
                  )}
                  {scanState === 'success' && (
                    <div className="qr-scanner-stage-state qr-scanner-success">
                      <ShieldCheck className="h-8 w-8" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div id="qr-scanner-status" className="qr-scanner-status" aria-live="polite">
                  {scanState === 'requesting' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Requesting camera
                    </>
                  )}
                  {scanState === 'ready' && (
                    <>
                      <Camera className="h-3.5 w-3.5" aria-hidden="true" /> Camera ready
                    </>
                  )}
                  {scanState === 'image' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Reading QR image
                    </>
                  )}
                  {scanState === 'success' && (
                    <>
                      <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" /> Transfer QR verified
                    </>
                  )}
                  {scanState === 'error' && (
                    <>
                      <CameraOff className="h-3.5 w-3.5" aria-hidden="true" /> Camera unavailable
                    </>
                  )}
                </div>

                {scanError && (
                  <div className="qr-scanner-error" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0 text-[#F00064]" aria-hidden="true" />
                    <span>{scanError}</span>
                  </div>
                )}

                <div className="qr-scanner-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="h-4 w-4" aria-hidden="true" />
                    <span>Choose QR Image</span>
                  </button>
                  <span className="qr-scanner-trust">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
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
              </section>
            </div>
          ),
          document.body,
        )}
    </section>
  )
}
