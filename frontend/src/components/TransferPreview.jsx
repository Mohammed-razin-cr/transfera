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
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] bg-[#111114] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
          <span className="text-sm font-medium text-[#F4F4F5]">Transfera</span>
          <span className="text-xs text-[#94949E]">·</span>
          <span className="text-xs text-[#94949E]">Workflow preview</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#17171B] px-3 py-1 text-xs text-[#A1A1AA]">
            <Lock className="h-3 w-3 text-[#FF4D8D]" aria-hidden="true" />
            <span>NaCl secretbox</span>
          </span>
        </div>
      </div>

      {/* Segmented Stage Bar */}
      <div className="border-b border-[#27272A] bg-[#09090B]/50 px-4 py-2.5 sm:px-5">
        <div
          role="tablist"
          aria-label="Transfer workflow stages"
          className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
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
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#17171B] text-[#F4F4F5] ring-1 ring-[#3F3F46]'
                    : 'text-[#94949E] hover:bg-[#111114] hover:text-[#F4F4F5]'
                }`}
              >
                {stage.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 divide-y divide-[#27272A] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left: Active Stage Content */}
        <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-7">
          {activeStage === 'select' && (
            <div className="space-y-5">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#3F3F46] bg-[#09090B]/60 px-6 py-7 text-center">
                <UploadCloud className="mb-2.5 h-5 w-5 text-[#FF4D8D]" aria-hidden="true" />
                <p className="text-sm font-medium text-[#F4F4F5]">
                  Drop files or folders here
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Encrypted in your browser before leaving your device
                </p>
                <a
                  href="/live"
                  className="btn-secondary mt-4 !min-h-[34px] !px-3.5 !py-1.5 text-xs"
                >
                  Open live sender
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
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
            </div>
          )}

          {activeStage === 'pair' && (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
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
            </div>
          )}

          {activeStage === 'transfer' && (
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                {/* File Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B]">
                      <FileArchive className="h-4 w-4 text-[#FF4D8D]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#F4F4F5]">
                        design-system-v4.fig
                      </p>
                      <p className="text-xs text-[#94949E]">Figma Archive</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#A1A1AA] shrink-0">
                    31.4 / 42.8 MB
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#27272A]">
                    <div
                      className="h-full rounded-full bg-[#F00064]"
                      style={{ width: '73%' }}
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#A1A1AA]">
                      73% <span className="mx-1 text-[#94949E]">·</span>{' '}
                      <span className="font-mono">18.4 MB/s</span>
                    </span>
                    <span className="text-[#F4F4F5]">~1s remaining</span>
                  </div>
                </div>
              </div>

              {/* Clean Hairline Spec Strip (no nested boxes) */}
              <dl className="grid grid-cols-1 gap-4 border-t border-[#27272A] pt-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#27272A]">
                <div className="sm:pr-4">
                  <dt className="text-xs text-[#94949E]">Transport</dt>
                  <dd className="mt-1 text-xs font-medium text-[#F4F4F5]">WebRTC Direct</dd>
                </div>
                <div className="sm:px-4">
                  <dt className="text-xs text-[#94949E]">Cipher</dt>
                  <dd className="mt-1 font-mono text-xs text-[#F4F4F5]">XSalsa20-Poly1305</dd>
                </div>
                <div className="sm:pl-4">
                  <dt className="text-xs text-[#94949E]">Server disk</dt>
                  <dd className="mt-1 text-xs font-medium text-[#10B981]">0 bytes stored</dd>
                </div>
              </dl>
            </div>
          )}

          {activeStage === 'complete' && (
            <div className="space-y-5">
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
            </div>
          )}
        </div>

        {/* Right: Clean Connection Timeline */}
        <div className="flex flex-col justify-between bg-[#09090B]/40 p-5 sm:p-7 lg:col-span-5">
          <div>
            <p className="text-xs font-medium text-[#94949E]">Peer connection</p>

            <div className="mt-5">
              {/* Origin Node */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B]">
                    <Laptop className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#F4F4F5]">Origin Node</p>
                    <p className="text-[11px] text-[#94949E]">MacBook Pro · Chrome</p>
                  </div>
                </div>
                <span className="text-xs text-[#A1A1AA]">Sender</span>
              </div>

              {/* Vertical Connector */}
              <div className="ml-4 flex items-center gap-3 border-l border-[#27272A] py-3.5 pl-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]" aria-hidden="true" />
                <span className="text-xs text-[#A1A1AA]">Encrypted WebRTC DataChannel</span>
              </div>

              {/* Destination Node */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#27272A] bg-[#17171B]">
                    <Smartphone className="h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#F4F4F5]">Destination Node</p>
                    <p className="text-[11px] text-[#94949E]">iPhone · Safari</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                  Paired
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#27272A] pt-4">
            <span className="text-xs text-[#94949E]">Ready to send real files?</span>
            <a
              href="/live"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#FF4D8D] hover:text-[#FF70A4]"
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
