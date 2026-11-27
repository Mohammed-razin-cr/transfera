import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  FileArchive,
  FileText,
  Lock,
  QrCode,
  Send,
  UploadCloud,
} from 'lucide-react'

const stages = [
  { id: 'select', label: 'Select files', icon: UploadCloud },
  { id: 'pair', label: 'Pair device', icon: QrCode },
  { id: 'transfer', label: 'Transfer', icon: Send },
  { id: 'complete', label: 'Complete', icon: CheckCircle2 },
]

const sampleFiles = [
  { name: 'design-system-v4.fig', size: '42.8 MB', type: 'Figma Archive', icon: FileArchive },
  { name: 'release-notes-q4.pdf', size: '3.4 MB', type: 'PDF Document', icon: FileText },
]

function PreviewQrSvg() {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,0,1,1,0,1,1,0,1],
    [0,1,0,1,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0],
    [1,1,0,0,1,1,1,0,1,1,0,0,1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,0,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1],
  ]

  return (
    <svg
      viewBox="0 0 19 19"
      className="h-24 w-24 rounded-md bg-[#F4F4F5] p-2"
      role="img"
      aria-label="Sample pairing QR code"
    >
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#09090B" /> : null
        )
      )}
    </svg>
  )
}

export default function TransferPreview() {
  const [activeStage, setActiveStage] = useState('transfer')
  const [copied, setCopied] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleCopyKey = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="surface-panel relative mx-auto max-w-2xl overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Subtle Top Ambient Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F00064]/50 to-transparent"
      />

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] bg-[#111114] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.65)]" aria-hidden="true" />
          <span className="text-sm font-medium text-[#F4F4F5]">Transfera</span>
          <span className="text-xs text-[#94949E]">·</span>
          <span className="text-xs text-[#94949E]">Workflow preview</span>
        </div>

        {/* Dot Indicator Status Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#17171B] px-3 py-1 text-xs text-[#A1A1AA]">
            <Lock className="h-3 w-3 text-[#FF4D8D]" aria-hidden="true" />
            <span>End-to-end encrypted</span>
          </span>
        </div>
      </div>

      {/* Floating Nav Pill Tabs (adapted from Uilora Floating Nav) */}
      <div className="border-b border-[#27272A] bg-[#09090B]/60 px-4 py-3 sm:px-5">
        <div
          role="tablist"
          aria-label="Transfer workflow stages"
          className="mx-auto grid max-w-2xl grid-cols-2 gap-1 rounded-xl border border-[#27272A] bg-[#111114] p-1 sm:grid-cols-4 sm:rounded-full"
        >
          {stages.map((stage) => {
            const isActive = activeStage === stage.id
            const Icon = stage.icon
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStage(stage.id)}
                className={`relative flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:rounded-full ${
                  isActive
                    ? 'text-[#F4F4F5]'
                    : 'text-[#94949E] hover:text-[#F4F4F5]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="preview-tab-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg border border-[#3F3F46] bg-[#17171B] sm:rounded-full"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={`relative z-10 h-3.5 w-3.5 ${isActive ? 'text-[#FF4D8D]' : 'text-[#94949E]'}`}
                  aria-hidden="true"
                />
                <span className="relative z-10">{stage.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Organized Workflow Stage */}
      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {activeStage === 'select' && (
            /* Minimal Glass Upload Pattern (adapted from Uilora Minimal Glass) */
            <motion.div
              key="select"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B]">
                    <UploadCloud className="h-4 w-4 text-[#FF4D8D]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F4F4F5]">Encrypted dropzone</p>
                    <p className="text-xs text-[#94949E]">Files encrypt locally before leaving your device</p>
                  </div>
                </div>
                <a
                  href="/live"
                  className="btn-primary !min-h-[34px] !rounded-full !px-3.5 !py-1.5 text-xs"
                >
                  <span>Browse</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#3F3F46] bg-[#09090B]/60 px-6 py-6 text-center transition-colors hover:border-[#FF4D8D]/50">
                <p className="text-xs font-medium text-[#F4F4F5]">
                  Drop files or folders here
                </p>
                <p className="mt-1 text-[11px] text-[#94949E]">
                  Any file type · Multi-file batches supported
                </p>
              </div>

              <div className="divide-y divide-[#27272A] border-t border-[#27272A]">
                {sampleFiles.map((file) => (
                  <div key={file.name} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <file.icon className="h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[#F4F4F5]">{file.name}</p>
                        <p className="text-[11px] text-[#94949E]">{file.type}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#A1A1AA] shrink-0 ml-3">{file.size}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeStage === 'pair' && (
            <motion.div
              key="pair"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-5 sm:flex-row sm:items-center"
            >
              <div className="shrink-0 self-start rounded-lg border border-[#27272A] bg-[#09090B] p-2.5">
                <PreviewQrSvg />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[#A1A1AA]">Session Access Key</p>
                <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#27272A] bg-[#09090B] px-3.5 py-2.5">
                  <span className="truncate font-mono text-xs font-semibold tracking-wider text-[#F4F4F5]">
                    AURORA VORTEX SIGNAL CLOUD 73
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 text-xs font-medium text-[#A1A1AA] hover:bg-[#17171B] hover:text-[#F4F4F5]"
                    aria-label="Copy sample access key"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
                        <span className="text-[#10B981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#A1A1AA]">
                  Scan the QR code on your receiving device or enter the Access Key. Keys are derived locally with SHA-256.
                </p>
              </div>
            </motion.div>
          )}

          {activeStage === 'transfer' && (
            <motion.div
              key="transfer"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex h-full flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#27272A] bg-[#09090B]/65 p-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F00064]/25 bg-[#F00064]/10">
                      <FileArchive className="h-4 w-4 text-[#FF4D8D]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#F4F4F5]">
                        design-system-v4.fig
                      </p>
                      <p className="text-xs text-[#94949E]">Figma Archive</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md border border-[#27272A] bg-[#111114] px-2.5 py-1 font-mono text-xs text-[#D4D4D8] tabular-nums">
                    31.4 / 42.8 MB
                  </span>
                </div>

                <div className="mt-5">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#27272A]">
                    <div
                      className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#D9005A] to-[#FF4D8D] shadow-[0_0_12px_rgba(240,0,100,0.45)]"
                      style={{ width: '73%' }}
                    >
                      {!prefersReducedMotion && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs tabular-nums">
                    <span className="font-medium text-[#A1A1AA]">
                      <span className="text-[#F4F4F5]">73%</span>
                      <span className="mx-1.5 text-[#52525B]">·</span>
                      <span className="font-mono text-[#D4D4D8]">84.6 MB/s</span>
                    </span>
                    <span className="font-mono text-[#A1A1AA]">~0.1s remaining</span>
                  </div>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-3 rounded-xl border border-[#27272A] bg-[#09090B]/50 p-3.5 sm:grid-cols-12 sm:gap-0 sm:divide-x sm:divide-[#27272A]">
                <div className="sm:col-span-4 sm:pr-3">
                  <dt className="text-[11px] uppercase tracking-wider text-[#94949E]">Transport</dt>
                  <dd className="mt-1 whitespace-nowrap text-xs font-medium text-[#F4F4F5]">WebRTC Direct</dd>
                </div>
                <div className="sm:col-span-5 sm:px-3">
                  <dt className="text-[11px] uppercase tracking-wider text-[#94949E]">Cipher</dt>
                  <dd className="mt-1 whitespace-nowrap font-mono text-xs text-[#F4F4F5]">AES-256-GCM</dd>
                </div>
                <div className="sm:col-span-3 sm:pl-3">
                  <dt className="text-[11px] uppercase tracking-wider text-[#94949E]">Server disk</dt>
                  <dd className="mt-1 whitespace-nowrap text-xs font-medium text-[#10B981]">0 bytes</dd>
                </div>
              </dl>
            </motion.div>
          )}

          {activeStage === 'complete' && (
            <motion.div
              key="complete"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <div className="flex items-start gap-3 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-[#F4F4F5]">
                    2 files delivered and verified
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    46.2 MB decrypted locally on destination device in 2.5s.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#27272A] border-t border-[#27272A]">
                {sampleFiles.map((file) => (
                  <div key={file.name} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <file.icon className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                      <span className="truncate text-xs font-medium text-[#F4F4F5]">{file.name}</span>
                    </div>
                    <span className="font-mono text-xs text-[#10B981] shrink-0 ml-3">Saved · {file.size}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          </AnimatePresence>
      </div>

      {/* Organized Footer CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#27272A] bg-[#09090B]/60 px-5 py-3.5 sm:px-7">
        <span className="text-xs text-[#94949E]">Ready to send real files?</span>
        <a
          href="/live"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#F00064]/30 bg-[#F00064]/10 px-3.5 py-1.5 text-xs font-medium text-[#FF4D8D] transition-colors hover:border-[#F00064]/55 hover:bg-[#F00064]/20 hover:text-[#FF70A4]"
        >
          <span>Start live session</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
