package config

import (
	"os"
	"testing"
)

func TestGetPort(t *testing.T) {
	os.Setenv("PORT", "")

	port := GetPort()

	expectedPort := "8080"

	if expectedPort != port {
		t.Fatalf("Expected api key %s, but got %s", expectedPort, port)
	}
}
