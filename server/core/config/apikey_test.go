package config

import (
	"os"
	"testing"
)

func TestGetApiKey(t *testing.T) {
	os.Setenv("API_KEY", "")

	apiKey := GetApiKey()

	expectedApiKey := "CHANGE-IT-ASAP"

	if expectedApiKey != apiKey {
		t.Fatalf("Expected api key %s, but got %s", expectedApiKey, apiKey)
	}
}
