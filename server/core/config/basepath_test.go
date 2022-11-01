package config

import (
	"os"
	"testing"
)

func TestGetBasePath(t *testing.T) {
	os.Setenv("BASE_PATH", "")

	basePath := GetBasePath()

	expectedBasePath := "/"

	if expectedBasePath != basePath {
		t.Fatalf("Expected base path %s, but got %s", expectedBasePath, basePath)
	}
}
