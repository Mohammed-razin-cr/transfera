import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  FileArchive,
  FileText,
  Laptop,
  Lock,
  Smartphone,
  UploadCloud,
  Wifi,
} from 'lucide-react'

const stages = [
  { id: 'select', label: '1. Select files' },
  { id: 'pair', label: '2. Pair device' },
  { id: 'transfer', label: '3. Transfer' },
  { id: 'complete', label: '4. Complete' },
]

const sampleFiles = [
  { name: 'design-system-v4.fig', size: '42.8 MB', type: 'Figma Archive', icon: FileArchive },
  { name: 'release-notes-q4.pdf', size: '3.4 MB', type: 'PDF Document', icon: FileText },
]

function PreviewQrSvg() {
  // Crisp, deterministic 7x7 finder-pattern QR illustration for preview
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

  const handleCopyKey = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="surface-panel overflow-hidden shadow-2xl shadow-black/50">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] bg-[#111114] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#F4F4F5]">transfera.live</span>
          <span className="hidden text-xs text-[#71717A] sm:inline">·</span>
          <span className="hidden font-mono text-xs text-[#A1A1AA] sm:inline">
            Interactive workflow preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#27272A] bg-[#17171B] px-2.5 py-1 font-mono text-[11px] text-[#A1A1AA]">
            <Lock className="h-3 w-3 text-[#F00064]" aria-hidden="true" />
            NaCl secretbox
          </span>
        </div>
      </div>

      {/* Stage Switcher */}
      <div
        role="tablist"
        aria-label="Transfer workflow stages"
        className="grid grid-cols-2 border-b border-[#27272A] bg-[#09090B]/60 sm:grid-cols-4"
      >
        {stages.map((stage) => {
          const isActive = activeStage === stage.id
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStage(stage.id)}
              className={`relative px-3 py-2.5 text-left font-mono text-xs transition-colors sm:text-center ${
                isActive
                  ? 'bg-[#17171B] text-[#F4F4F5]'
                  : 'text-[#71717A] hover:bg-[#111114] hover:text-[#A1A1AA]'
              }`}
            >
              {stage.label}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[#F00064]"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Main Preview Workspace */}
      <div className="grid grid-cols-1 divide-y divide-[#27272A] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left: File & Transfer State */}
        <div className="p-5 sm:p-6 lg:col-span-7">
          {activeStage === 'select' && (
            <div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#3F3F46] bg-[#09090B]/70 px-6 py-8 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B]">
                  <UploadCloud className="h-5 w-5 text-[#F00064]" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-[#F4F4F5]">
                  Drop files or folders here
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Encrypted in your browser before a single byte leaves your device
                </p>
                <a
                  href="/live"
                  className="btn-secondary mt-4 !min-h-[34px] !px-3.5 !py-1.5 text-xs"
                >
                  Open live sender
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-4 space-y-2">
                {sampleFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#17171B] px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <file.icon className="h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[#F4F4F5]">{file.name}</p>
                        <p className="text-[11px] text-[#71717A]">{file.type}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#A1A1AA] shrink-0 ml-3">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStage === 'pair' && (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="shrink-0 self-start rounded-lg border border-[#27272A] bg-[#17171B] p-3">
                <PreviewQrSvg />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA]">
                  Session Access Key
                </p>
                <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#27272A] bg-[#09090B] px-3.5 py-2.5">
                  <span className="font-mono text-sm font-semibold tracking-wider text-[#F4F4F5] truncate">
                    AURORA VORTEX 73
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-[#A1A1AA] hover:bg-[#17171B] hover:text-[#F4F4F5]"
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
                  Scan the QR code on your receiving device or enter the 3-part Access Key. Keys are derived locally with SHA-256 and never sent to the server.
                </p>
              </div>
            </div>
          )}

          {activeStage === 'transfer' && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileArchive className="h-4 w-4 shrink-0 text-[#F00064]" aria-hidden="true" />
                  <span className="truncate text-sm font-medium text-[#F4F4F5]">
                    design-system-v4.fig
                  </span>
                </div>
                <span className="font-mono text-xs text-[#A1A1AA] shrink-0">31.4 / 42.8 MB</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#27272A]">
                  <div
                    className="h-full rounded-full bg-[#F00064]"
                    style={{ width: '73%' }}
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#A1A1AA]">
                  <span>73% · 18.4 MB/s</span>
                  <span className="text-[#F4F4F5]">~1s remaining</span>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#27272A] bg-[#17171B] px-3 py-2.5">
                  <p className="font-mono text-[11px] text-[#71717A]">Transport</p>
                  <p className="mt-0.5 text-xs font-medium text-[#F4F4F5]">WebRTC Direct</p>
                </div>
                <div className="rounded-lg border border-[#27272A] bg-[#17171B] px-3 py-2.5">
                  <p className="font-mono text-[11px] text-[#71717A]">Cipher</p>
                  <p className="mt-0.5 text-xs font-medium text-[#F4F4F5]">XSalsa20-Poly1305</p>
                </div>
                <div className="col-span-2 rounded-lg border border-[#27272A] bg-[#17171B] px-3 py-2.5 sm:col-span-1">
                  <p className="font-mono text-[11px] text-[#71717A]">Server disk</p>
                  <p className="mt-0.5 text-xs font-medium text-[#10B981]">0 bytes stored</p>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'complete' && (
            <div>
              <div className="flex items-start gap-3 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-[#F4F4F5]">
                    2 files delivered and verified
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    46.2 MB decrypted locally on destination device in 2.5s. Session keys cleared from memory.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {sampleFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#17171B] px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <file.icon className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                      <span className="truncate text-xs font-medium text-[#F4F4F5]">{file.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#10B981] shrink-0 ml-3">Saved · {file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Connected Devices */}
        <div className="flex flex-col justify-between bg-[#09090B]/40 p-5 sm:p-6 lg:col-span-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              Peer connection
            </p>

            <div className="mt-4 space-y-3">
              {/* Origin Node */}
              <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#17171B] px-3.5 py-2.5">
                <div className="flex items-center gap-3">
                  <Laptop className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-[#F4F4F5]">Origin Node</p>
                    <p className="text-[11px] text-[#71717A]">MacBook Pro · Chrome</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#A1A1AA]">Sender</span>
              </div>

              {/* Link Indicator */}
              <div className="flex items-center justify-center gap-2 py-0.5 font-mono text-[11px] text-[#A1A1AA]">
                <Wifi className="h-3.5 w-3.5 text-[#F00064]" aria-hidden="true" />
                <span>Encrypted WebRTC DataChannel</span>
              </div>

              {/* Destination Node */}
              <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#17171B] px-3.5 py-2.5">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-[#F4F4F5]">Destination Node</p>
                    <p className="text-[11px] text-[#71717A]">iPhone · Safari</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                  Paired
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#27272A] pt-4">
            <span className="text-xs text-[#71717A]">Ready to send real files?</span>
            <a
              href="/live"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#F00064] hover:text-[#FF1F7A]"
            >
              <span>Start live session</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
