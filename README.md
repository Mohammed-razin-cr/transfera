# Transfera

> End-to-end encrypted file transfer. No accounts. No server storage. Just a key and a direct connection.

🌐 **Live Demo:** [transfera.onrender.com](https://transfera.onrender.com)

---

## How it works

1. **Origin Node** opens `transfera.onrender.com` and gets an **Access Key** + QR code
2. **Destination Node** enters the same key on any device
3. Files are **encrypted in the browser** with NaCl secretbox (XSalsa20 + Poly1305) before leaving your device
4. Transfer goes **direct over WebRTC** - the server only sees encrypted handshake bytes
5. If a direct link fails, it falls back through the **Secure Gateway** - still fully encrypted

The server never sees plaintext. Ever.

---

## Features

| | |
|---|---|
| 🔒 **E2E Encrypted** | NaCl secretbox, 256-bit keys derived from your Access Key |
| ⚡ **Direct P2P** | WebRTC DataChannel - no relay overhead when NAT allows |
| 📱 **QR Pairing** | Scan to join instantly, no typing required |
| 📦 **Multi-file** | Send entire batches in one session |
| 🕐 **Vault Storage** | Holds encrypted files for 10 min when receiver is offline |
| 🚫 **Zero Accounts** | No sign-up, no login, no tracking |

---

## Stack

- **Backend** - Go, WebSocket signaling, minimal relay
- **Frontend** - Vanilla JS + Web Crypto API + WebRTC
- **Encryption** - [TweetNaCl](https://tweetnacl.js.org/) (`nacl.secretbox`)
- **Landing page** - React + Vite

---

## Self-host

```bash
git clone https://github.com/Mohammed-razin-cr/transfera
cd Transfera

# Run the relay server
go run ./cmd/relay
```

Server starts at `http://localhost:8088`. Transfer UI at `/live`.

### Docker

```bash
docker compose up -d --build
```

The gateway is available at `http://localhost:8088`. This builds the local
source so Docker setup does not depend on pulling a registry image.

---

## Security model

```
[Your Device] ──encrypt──► [Gateway] ──encrypted──► [Their Device]
                              ↑
                    only sees ciphertext
```

- Keys are derived locally from the Access Key using SHA-256
- The gateway only routes encrypted binary blobs and 16-char room tokens
- Files are **never written to disk** on the server

---

## License

MIT © [Mohammed Razin CR](https://github.com/Mohammed-razin-cr)
