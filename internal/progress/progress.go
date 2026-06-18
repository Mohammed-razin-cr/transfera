package progress

import (
	"fmt"
	"os"
	"strings"
)

const barWidth = 30

type Bar struct {
	label string
	total int64
}

func New(label string, total int64) *Bar {
	return &Bar{label: label, total: total}
}

func (b *Bar) Update(current int64) {
	if b.total <= 0 {
		return
	}
	pct := float64(current) / float64(b.total)
	if pct > 1 {
		pct = 1
	}
	filled := int(pct * barWidth)
	bar := strings.Repeat("=", filled)
	if filled < barWidth {
		bar += ">"
		bar += strings.Repeat(" ", barWidth-filled-1)
	}
	fmt.Fprintf(os.Stderr, "\r  %s [%s] %3.0f%% %s/%s",
		b.label, bar, pct*100, formatBytes(current), formatBytes(b.total))
}

func (b *Bar) Finish() {
	b.Update(b.total)
	fmt.Fprintln(os.Stderr)
}

func formatBytes(b int64) string {
	switch {
	case b >= 1<<30:
		return fmt.Sprintf("%.1fGB", float64(b)/(1<<30))
	case b >= 1<<20:
		return fmt.Sprintf("%.1fMB", float64(b)/(1<<20))
	case b >= 1<<10:
		return fmt.Sprintf("%.1fKB", float64(b)/(1<<10))
	default:
		return fmt.Sprintf("%dB", b)
	}
}
