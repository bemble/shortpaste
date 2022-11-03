package config

import (
	"os"
	"testing"
)

func TestGetDomain(t *testing.T) {
	os.Setenv("DOMAIN", "")

	domain := GetDomain()

	expectedDomain := ""

	if expectedDomain != domain {
		t.Fatalf("Expected base path %s, but got %s", expectedDomain, domain)
	}
}
