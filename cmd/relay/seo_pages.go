package main

import (
	"encoding/json"
	"html/template"
	"net/http"
	"strings"
)

const canonicalBaseURL = "https://transfera.onrender.com"

type seoSection struct {
	Heading    string
	Paragraphs []string
	Points     []string
}

type seoFAQ struct {
	Question string
	Answer   string
}

type seoPage struct {
	Path        string
	Title       string
	Description string
	Eyebrow     string
	H1          string
	Intro       string
	Sections    []seoSection
	FAQs        []seoFAQ
	Related     []seoLink
	Schema      template.JS
}

type seoLink struct {
	Href  string
	Label string
}

var seoPages = map[string]seoPage{
	"/secure-file-transfer": {
		Title: "Secure File Transfer Without Signup | Transfera", Description: "Send files securely between devices with browser encryption, QR pairing, and no account. Start a private Transfera session in seconds.",
		Eyebrow: "Private by design", H1: "Secure file transfer without signup", Intro: "Transfera creates a temporary encrypted connection between your devices, so you can send files without creating an account or publishing a long-lived cloud link.",
		Sections: []seoSection{
			{Heading: "Send files through a private browser session", Paragraphs: []string{"Open Transfera on the sending device, pair the receiver with an access key or QR code, and choose the files. The session is designed for a specific device handoff instead of a public upload-and-share workflow."}, Points: []string{"No sender or recipient account", "End-to-end encrypted file data", "QR code and access-key pairing", "Direct WebRTC transfer when available", "Temporary encrypted relay fallback"}},
			{Heading: "Why use Transfera for secure file sharing?", Paragraphs: []string{"Email attachments have size limits, chat uploads create extra copies, and cloud links can be forwarded. Transfera keeps the workflow focused on a temporary transfer between paired devices.", "Use it for personal documents, project files, photos, videos, or any handoff where you want less exposure and less setup."}},
			{Heading: "Works between phones, PCs, and modern browsers", Paragraphs: []string{"Transfera is browser-based, so the two devices do not need the same operating system. Send from Android or iPhone to Windows, macOS, or Linux without installing a dedicated transfer app."}},
		},
		FAQs: []seoFAQ{{"Is Transfera free to use?", "Yes. Transfera is free and open source under the MIT License."}, {"Do secure transfers require an account?", "No. A temporary access key or QR code pairs the devices."}, {"Does Transfera store my files?", "Direct transfers do not use server file storage. Encrypted relay payloads are temporary and expire automatically."}},
	},
	"/encrypted-file-transfer": {
		Title: "Encrypted File Transfer in Your Browser | Transfera", Description: "Transfer encrypted files directly between devices using browser-based encryption, WebRTC, QR pairing, and temporary relay fallback.",
		Eyebrow: "Encrypted before transport", H1: "Encrypted file transfer in your browser", Intro: "Transfera protects file data before it travels and pairs sender and receiver through a temporary access key or QR code.",
		Sections: []seoSection{
			{Heading: "Encryption is part of the transfer flow", Paragraphs: []string{"The browser encrypts file data for the paired session. When a direct WebRTC connection is available, files move between the two devices over an encrypted peer connection. When direct transfer is unavailable, the fallback relay carries encrypted data rather than a readable file."}, Points: []string{"Browser-based encryption", "Temporary session keys", "Encrypted peer transport", "Encrypted relay fallback", "No account database"}},
			{Heading: "A smaller sharing footprint", Paragraphs: []string{"Transfera avoids permanent public file pages. The receiver joins the temporary session, accepts the transfer, and saves the file on their device."}},
			{Heading: "Understand the security boundary", Paragraphs: []string{"The access key or QR code should be shared only with the intended receiver. Device security and browser integrity still matter, and highly sensitive transfers should use trusted devices and networks."}},
		},
		FAQs: []seoFAQ{{"Is the file encrypted before upload?", "File data is encrypted in the browser before relay fallback transport."}, {"What happens when WebRTC cannot connect?", "Transfera can use a temporary relay path while keeping the file payload encrypted."}, {"Can the access key be reused?", "Access keys are intended for temporary transfer sessions, not permanent sharing."}},
	},
	"/transfer-files-between-devices": {
		Title: "Transfer Files Between Devices Online | Transfera", Description: "Transfer files between phones, laptops, and computers in a browser. Pair devices with a QR code or access key, with no signup required.",
		Eyebrow: "Cross-device transfer", H1: "Transfer files between devices online", Intro: "Move files between a phone, laptop, tablet, or desktop through a temporary browser session. No cable, shared cloud folder, or matching operating system is required.",
		Sections: []seoSection{
			{Heading: "How to transfer files between two devices", Paragraphs: []string{"Start a transfer on the first device. Open the session on the second device by scanning the QR code or entering the access key. Select one or more files and keep both browser tabs open until the transfer finishes."}, Points: []string{"Open Transfera on both devices", "Pair with QR or access key", "Choose files on the sender", "Accept and save on the receiver"}},
			{Heading: "Cross-platform by default", Paragraphs: []string{"Because Transfera runs in a modern browser, it can connect devices across Windows, macOS, Linux, Android, and iOS. Browser and network capabilities determine whether the transfer uses direct WebRTC or encrypted relay fallback."}},
			{Heading: "Useful for quick local and remote handoffs", Paragraphs: []string{"Send phone photos to a laptop, move a document to a work computer, or deliver a project folder to a client without asking them to create an account."}},
		},
		FAQs: []seoFAQ{{"Do the devices need to be on the same Wi-Fi?", "No. Transfera can connect devices across networks, although network conditions affect the available transfer path."}, {"Can I transfer multiple files?", "Yes. The transfer interface supports selecting multiple files."}, {"Does it work across operating systems?", "Yes. The workflow is browser-based and works across common desktop and mobile platforms."}},
	},
	"/send-files-phone-to-pc": {
		Title: "Send Files From Phone to PC Without an App | Transfera", Description: "Send photos, videos, and documents from phone to PC with a QR code. No app install, cable, email, or signup required.",
		Eyebrow: "Phone to computer", H1: "Send files from phone to PC without an app", Intro: "Use your phone camera to scan a Transfera QR code, pair the browser session, and move files securely to your computer.",
		Sections: []seoSection{
			{Heading: "Transfer from mobile to computer in three steps", Paragraphs: []string{"Open Transfera on your PC and start a secure transfer. Scan the displayed QR code with your phone, then select the photos, videos, or documents you want to send."}, Points: []string{"No USB cable", "No email attachment", "No cloud-drive upload", "No mobile app installation"}},
			{Heading: "Keep the handoff temporary", Paragraphs: []string{"The pairing flow connects the intended devices for the current transfer. It does not require a permanent shared folder or a reusable public link."}},
			{Heading: "Send from Android or iPhone", Paragraphs: []string{"Transfera works in modern mobile browsers. Available file-picker options depend on the phone and browser, but common photos, videos, and documents can be selected directly."}},
		},
		FAQs: []seoFAQ{{"Do I need to install Transfera on my phone?", "No. Open the pairing link in a modern mobile browser."}, {"Can I send videos from phone to laptop?", "Yes, subject to available device memory, browser limits, and network conditions."}, {"Is a cable required?", "No. The devices connect through their browsers."}},
	},
	"/wetransfer-alternative": {
		Title: "Private WeTransfer Alternative Without Signup | Transfera", Description: "Looking for a private WeTransfer alternative? Transfera pairs devices for encrypted browser file transfer with no account and no permanent sharing page.",
		Eyebrow: "An honest comparison", H1: "A private WeTransfer alternative for direct file sharing", Intro: "Transfera is designed for temporary, device-to-device handoffs. It is a useful alternative when you prefer QR pairing, no signup, and encrypted browser transfer over a conventional upload link.",
		Sections: []seoSection{
			{Heading: "Transfera and WeTransfer use different sharing models", Paragraphs: []string{"WeTransfer is a mature cloud delivery service built around uploading files and sharing a download link. Transfera pairs a sender and receiver for a temporary browser session, attempting direct WebRTC transfer first and using encrypted relay fallback when necessary."}, Points: []string{"Transfera: no account required", "Transfera: QR or access-key pairing", "Transfera: direct peer transfer when available", "Transfera: open-source and self-hostable", "WeTransfer: established cloud-link workflow and broader commercial service"}},
			{Heading: "When Transfera is the better fit", Paragraphs: []string{"Choose Transfera for an immediate handoff when both parties can open the session, privacy is important, and you do not need a long-lived download page."}},
			{Heading: "When a cloud-link service may be better", Paragraphs: []string{"A conventional cloud transfer service may be more convenient when recipients need to download later, you need managed delivery features, or the sender and receiver cannot be online around the same time. Transfera does not claim feature parity with WeTransfer."}},
		},
		FAQs: []seoFAQ{{"Is Transfera owned by or affiliated with WeTransfer?", "No. Transfera is an independent open-source project and is not affiliated with WeTransfer."}, {"Does Transfera create a permanent download link?", "No. Transfera is designed around temporary device pairing and transfer sessions."}, {"Can I self-host Transfera?", "Yes. The source code and deployment files are available on GitHub under the MIT License."}},
	},
	"/private-file-sharing": {
		Title: "Private File Sharing Without an Account | Transfera", Description: "Share files privately through a temporary encrypted browser session. Pair devices with a QR code or access key and avoid permanent public links.",
		Eyebrow: "Temporary sharing", H1: "Private file sharing without an account", Intro: "Transfera helps two devices exchange files through a temporary paired session instead of a permanent shared folder or public download page.",
		Sections: []seoSection{{Heading: "Share with the intended device", Paragraphs: []string{"The receiver joins with the session QR code or access key. This pairing-first model reduces the chance of an open link circulating beyond its intended audience."}, Points: []string{"No signup", "No public profile", "No permanent shared folder", "Encrypted file data"}}, {Heading: "Designed for one-time handoffs", Paragraphs: []string{"Use Transfera for documents, creative work, personal media, and other files that need to move now without becoming part of a cloud library."}}},
		FAQs:     []seoFAQ{{"Is private file sharing anonymous?", "Transfera does not require an account, but network services can still observe connection metadata. No online tool should promise perfect anonymity."}, {"How do I share the access key?", "Send it through a trusted channel or scan the QR code directly from the receiving device."}},
	},
	"/browser-file-transfer": {
		Title: "Browser File Transfer With No App Install | Transfera", Description: "Send files from one browser to another with encrypted transport, QR pairing, WebRTC, and no account or dedicated app installation.",
		Eyebrow: "No install required", H1: "Browser file transfer between any devices", Intro: "Transfer files from one modern browser to another without installing a dedicated sharing app on either device.",
		Sections: []seoSection{{Heading: "The browser is the transfer client", Paragraphs: []string{"Transfera uses browser capabilities for file selection, encryption, session pairing, and WebRTC connectivity. That makes the same workflow available across common desktop and mobile platforms."}, Points: []string{"Works across common operating systems", "QR pairing for mobile devices", "Direct WebRTC where available", "Encrypted fallback for restrictive networks"}}, {Heading: "What you need", Paragraphs: []string{"Both devices need a current browser, a network connection, and enough memory and storage for the selected files. Keep the tabs open while the transfer is active."}}},
		FAQs:     []seoFAQ{{"Which browser should I use?", "Use a current version of Chrome, Edge, Firefox, or Safari with WebRTC and Web Crypto support."}, {"Can browser extensions affect transfers?", "Yes. Strict privacy extensions, VPNs, or corporate firewalls can affect WebRTC and may cause the fallback path to be used."}},
	},
	"/faq": {
		Title: "Secure File Transfer FAQ | Transfera", Description: "Answers about Transfera encryption, file storage, QR pairing, browser compatibility, direct transfers, relay fallback, and account-free sharing.",
		Eyebrow: "Questions and answers", H1: "Transfera secure file transfer FAQ", Intro: "Clear answers about how Transfera pairs devices, encrypts file data, handles network fallback, and protects temporary transfers.",
		Sections: []seoSection{{Heading: "Before you start", Paragraphs: []string{"Use trusted devices, keep the access key private, and leave both browser tabs open until the transfer reports completion. Transfera is designed to reduce storage and account exposure, but device and network security still matter."}}},
		FAQs:     []seoFAQ{{"What is Transfera?", "Transfera is an open-source, browser-based file transfer tool for sending encrypted files between paired devices."}, {"Do I need an account?", "No. Start a temporary transfer and pair the receiver with an access key or QR code."}, {"Are files end-to-end encrypted?", "Transfera encrypts file data for the paired session. Direct WebRTC connections also use encrypted transport, and relay fallback carries encrypted payloads."}, {"Does Transfera permanently store files?", "No. Direct transfers do not use server file storage. Temporary encrypted fallback payloads expire automatically."}, {"What is WebRTC?", "WebRTC is a browser technology that can establish a direct, encrypted connection between devices."}, {"Why would relay fallback be used?", "Some firewalls, carrier networks, or browser policies prevent a direct peer connection. The relay path keeps the transfer usable in those conditions."}, {"Can I send files from phone to PC?", "Yes. Start on the PC, scan the QR code with the phone, and select files from the mobile browser."}, {"Can I self-host Transfera?", "Yes. Transfera is available on GitHub under the MIT License."}},
	},
}

var defaultRelated = []seoLink{
	{Href: "/secure-file-transfer", Label: "Secure file transfer"},
	{Href: "/transfer-files-between-devices", Label: "Transfer files between devices"},
	{Href: "/send-files-phone-to-pc", Label: "Send files from phone to PC"},
	{Href: "/wetransfer-alternative", Label: "WeTransfer alternative"},
	{Href: "/faq", Label: "File transfer FAQ"},
}

var seoPageTemplate = template.Must(template.New("seo-page").Parse(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{.Title}}</title><meta name="description" content="{{.Description}}"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="` + canonicalBaseURL + `{{.Path}}"><link rel="icon" href="/static/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/static/seo.css">
<meta property="og:type" content="website"><meta property="og:site_name" content="Transfera"><meta property="og:title" content="{{.Title}}"><meta property="og:description" content="{{.Description}}"><meta property="og:url" content="` + canonicalBaseURL + `{{.Path}}">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="{{.Title}}"><meta name="twitter:description" content="{{.Description}}"><script type="application/ld+json">{{.Schema}}</script></head>
<body><header class="site-header"><a class="brand" href="/" aria-label="Transfera home"><span>[T]</span> Transfera</a><nav aria-label="Primary"><a href="/secure-file-transfer">Secure transfer</a><a href="/transfer-files-between-devices">Between devices</a><a href="/faq">FAQ</a></nav><a class="button small" href="/live">Start transfer -&gt;</a></header>
<main><section class="hero"><p class="eyebrow">{{.Eyebrow}}</p><h1>{{.H1}}</h1><p class="lead">{{.Intro}}</p><div class="actions"><a class="button" href="/live">Start secure transfer -&gt;</a><a class="secondary" href="#details">Learn how it works</a></div><div class="trust"><span>+ No signup</span><span>+ Encrypted transfer</span><span>+ QR pairing</span></div></section>
<div id="details">{{range .Sections}}<section class="content"><div><p class="eyebrow">Transfera</p><h2>{{.Heading}}</h2></div><div class="copy">{{range .Paragraphs}}<p>{{.}}</p>{{end}}{{if .Points}}<ul>{{range .Points}}<li>+ {{.}}</li>{{end}}</ul>{{end}}</div></section>{{end}}</div>
{{if .FAQs}}<section class="faq"><p class="eyebrow">Common questions</p><h2>Frequently asked questions</h2><div class="faq-grid">{{range .FAQs}}<details><summary>{{.Question}}</summary><p>{{.Answer}}</p></details>{{end}}</div></section>{{end}}
<section class="related"><p class="eyebrow">Explore Transfera</p><h2>Related secure transfer guides</h2><div>{{range .Related}}<a href="{{.Href}}">{{.Label}} -&gt;</a>{{end}}</div></section>
<section class="closing"><h2>Ready to send files securely?</h2><p>Pair two devices and start an encrypted browser transfer. No account required.</p><a class="button" href="/live">Start secure transfer -&gt;</a></section></main>
<footer><a class="brand" href="/">Transfera</a><p>Open-source secure file transfer by Mohammed Razin CR.</p><nav><a href="/private-file-sharing">Private sharing</a><a href="/browser-file-transfer">Browser transfer</a><a href="https://github.com/Mohammed-razin-cr/transfera">GitHub</a></nav></footer></body></html>`))

func prepareSEOPages() {
	for path, page := range seoPages {
		page.Path = path
		page.Related = defaultRelated
		page.Schema = buildPageSchema(page)
		seoPages[path] = page
	}
}

func buildPageSchema(page seoPage) template.JS {
	schema := map[string]any{"@context": "https://schema.org", "@type": "WebPage", "name": page.H1, "description": page.Description, "url": canonicalBaseURL + page.Path, "isPartOf": map[string]any{"@type": "WebSite", "name": "Transfera", "url": canonicalBaseURL + "/"}}
	if len(page.FAQs) > 0 {
		entities := make([]map[string]any, 0, len(page.FAQs))
		for _, item := range page.FAQs {
			entities = append(entities, map[string]any{"@type": "Question", "name": item.Question, "acceptedAnswer": map[string]any{"@type": "Answer", "text": item.Answer}})
		}
		schema = map[string]any{"@context": "https://schema.org", "@graph": []any{schema, map[string]any{"@type": "FAQPage", "mainEntity": entities}}}
	}
	b, _ := json.Marshal(schema)
	return template.JS(b)
}

func (s *server) handleSEOPage(w http.ResponseWriter, r *http.Request) {
	page, ok := seoPages[r.URL.Path]
	if !ok {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "public, max-age=300")
	if err := seoPageTemplate.Execute(w, page); err != nil {
		s.log.Error("render SEO page", "path", r.URL.Path, "err", err)
	}
}

func (s *server) handleRobots(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Write([]byte("User-agent: *\nAllow: /\nDisallow: /d/\nDisallow: /u/\nDisallow: /raw/\nDisallow: /room/\nDisallow: /ws/\nSitemap: " + canonicalBaseURL + "/sitemap.xml\n"))
}

func (s *server) handleSitemap(w http.ResponseWriter, _ *http.Request) {
	paths := []string{"/", "/secure-file-transfer", "/encrypted-file-transfer", "/transfer-files-between-devices", "/send-files-phone-to-pc", "/wetransfer-alternative", "/private-file-sharing", "/browser-file-transfer", "/faq"}
	var out strings.Builder
	out.WriteString(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
	for _, path := range paths {
		out.WriteString("<url><loc>" + canonicalBaseURL + path + "</loc></url>")
	}
	out.WriteString("</urlset>")
	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	w.Write([]byte(out.String()))
}

func init() {
	prepareSEOPages()
}
