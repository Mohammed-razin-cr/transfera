package main

import (
	"log/slog"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestSEOPageHasUniqueMetadataAndContent(t *testing.T) {
	s := &server{log: slog.Default()}
	for path, expected := range map[string]string{
		"/secure-file-transfer":           "Secure file transfer without signup",
		"/transfer-files-between-devices": "Transfer files between devices online",
		"/wetransfer-alternative":         "A private WeTransfer alternative",
		"/faq":                            "Transfera secure file transfer FAQ",
	} {
		t.Run(path, func(t *testing.T) {
			req := httptest.NewRequest("GET", path, nil)
			res := httptest.NewRecorder()
			s.handleSEOPage(res, req)
			body := res.Body.String()
			if res.Code != 200 || !strings.Contains(body, expected) {
				t.Fatalf("status=%d, expected body to contain %q", res.Code, expected)
			}
			if !strings.Contains(body, `<link rel="canonical"`) || !strings.Contains(body, `application/ld+json`) {
				t.Fatal("page is missing canonical metadata or structured data")
			}
		})
	}
}

func TestSitemapAndRobots(t *testing.T) {
	s := &server{}
	sitemap := httptest.NewRecorder()
	s.handleSitemap(sitemap, httptest.NewRequest("GET", "/sitemap.xml", nil))
	if !strings.Contains(sitemap.Body.String(), canonicalBaseURL+"/secure-file-transfer") {
		t.Fatal("sitemap is missing secure file transfer page")
	}
	robots := httptest.NewRecorder()
	s.handleRobots(robots, httptest.NewRequest("GET", "/robots.txt", nil))
	if !strings.Contains(robots.Body.String(), "Sitemap: "+canonicalBaseURL+"/sitemap.xml") {
		t.Fatal("robots.txt is missing sitemap URL")
	}
}
