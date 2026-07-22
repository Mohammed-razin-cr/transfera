const TRANSFER_PATH = /^\/(?:d|u)\/[a-f0-9]{16}$/i
const TRANSFER_KEY = /^#[A-Za-z0-9_-]{43}$/

export function resolveTransferQr(payload, expectedOrigin) {
  if (typeof payload !== 'string' || !payload.trim()) return null

  try {
    const url = new URL(payload.trim())
    if (url.origin !== expectedOrigin) return null
    if (url.username || url.password || url.search) return null
    if (!TRANSFER_PATH.test(url.pathname) || !TRANSFER_KEY.test(url.hash)) return null
    return url.href
  } catch {
    return null
  }
}
