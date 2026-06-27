import { useTheme } from '../App'
import { ArrowUpRight, Check, KeyRound, QrCode, ShieldCheck, Smartphone, Wifi } from 'lucide-react'

const steps = [
  { icon: KeyRound, title: 'Create a private session', text: 'Open Transfera and receive a short access key plus a QR code for the second device.' },
  { icon: QrCode, title: 'Pair the devices', text: 'Enter the access key or scan the QR code. There is no account, app install, or shared inbox.' },
  { icon: Wifi, title: 'Send the files', text: 'Choose files and transfer them through an encrypted browser connection, with encrypted relay fallback when needed.' },
]

const useCases = [
  ['Phone to computer', 'Move photos, documents, and videos from a phone to a laptop without emailing them to yourself.'],
  ['Private client delivery', 'Share sensitive project files through a temporary transfer session instead of a permanent cloud link.'],
  ['Cross-platform handoff', 'Transfer between Windows, macOS, Linux, Android, and iOS devices using a modern browser.'],
]

const faqs = [
  ['Do I need an account to transfer files?', 'No. Transfera uses a temporary access key or QR code to pair devices, so neither sender nor receiver needs to register.'],
  ['Are files encrypted?', 'Yes. Transfera encrypts file data before transport. Direct sessions use an encrypted peer connection, and relay fallback carries encrypted file data.'],
  ['Are transferred files stored permanently?', 'No. Direct transfers do not use server file storage. If encrypted relay fallback is required, the temporary payload expires automatically.'],
  ['Can I send files from a phone to a PC?', 'Yes. Open Transfera on both devices, scan the QR code or enter the access key, then choose the files on your phone.'],
]

export default function SEOContent() {
  const { theme } = useTheme()
  const isMatrix = theme === 'matrix'
  const accentHex = isMatrix ? '#22c55e' : '#b41e1e'
  
  return (
    <>
      <section id="how-it-works" className="seo-band">
        <div className="section-container"><div className="section-inner">
          <span className="eyebrow-label">Three simple steps</span>
          <div className="seo-heading-row">
            <h2 className="section-heading">How secure browser file transfer works</h2>
            <p>Transfera pairs two devices for a temporary encrypted transfer. Your files are not published to a reusable download page.</p>
          </div>
          <div className="seo-grid seo-grid-three">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article className="seo-item" key={title}>
                <span className="seo-index">0{index + 1}</span>
                <Icon aria-hidden="true" style={{ color: accentHex }} />
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div></div>
      </section>

      <section className="seo-band seo-band-muted">
        <div className="section-container"><div className="section-inner seo-split">
          <div>
            <span className="eyebrow-label">Private by design</span>
            <h2 className="section-heading">A secure file transfer alternative to cloud upload links</h2>
          </div>
          <div className="seo-prose">
            <p>Conventional sharing tools often upload a file first and create a link that can be forwarded or remain available. Transfera starts with a temporary device pairing instead.</p>
            <ul>
              <li><Check style={{ color: accentHex }} /> No signup or recipient account</li>
              <li><Check style={{ color: accentHex }} /> Browser-based encryption and secure transport</li>
              <li><Check style={{ color: accentHex }} /> QR code or access-key pairing</li>
              <li><Check style={{ color: accentHex }} /> Direct WebRTC transfer when the network allows it</li>
              <li><Check style={{ color: accentHex }} /> Temporary encrypted relay fallback</li>
            </ul>
            <a className="text-link" href="/wetransfer-alternative">Compare Transfera with WeTransfer <ArrowUpRight /></a>
          </div>
        </div></div>
      </section>

      <section className="seo-band">
        <div className="section-container"><div className="section-inner">
          <span className="eyebrow-label">Built for everyday handoffs</span>
          <h2 className="section-heading seo-section-title">Transfer files between devices without installing an app</h2>
          <div className="seo-grid seo-grid-three">
            {useCases.map(([title, text]) => (
              <article className="seo-item" key={title}>
                <Smartphone style={{ color: accentHex }} />
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <div className="seo-related">
            <a href="/transfer-files-between-devices">Transfer files between devices</a>
            <a href="/send-files-phone-to-pc">Send files from phone to PC</a>
            <a href="/private-file-sharing">Private file sharing</a>
          </div>
        </div></div>
      </section>

      <section id="faq" className="seo-band seo-band-muted">
        <div className="section-container"><div className="section-inner seo-split">
          <div>
            <span className="eyebrow-label">Common questions</span>
            <h2 className="section-heading">Secure file transfer FAQ</h2>
            <ShieldCheck className="seo-large-icon" style={{ color: accentHex }} />
          </div>
          <div className="seo-faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
            <a className="text-link" href="/faq">Read all frequently asked questions <ArrowUpRight /></a>
          </div>
        </div></div>
      </section>

      <section className="seo-cta">
        <div className="section-container"><div className="section-inner">
          <span className="eyebrow-label">No account. No install.</span>
          <h2 className="section-heading">Start an encrypted file transfer in your browser</h2>
          <p>Pair the receiving device with a QR code or access key and send your files.</p>
          <a href="/live" className="btn-primary group">Start secure transfer <span className="btn-icon"><ArrowUpRight /></span></a>
        </div></div>
      </section>
    </>
  )
}
