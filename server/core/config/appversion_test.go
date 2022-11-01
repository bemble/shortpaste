package config

import (
	"os"
	"testing"
)

func TestAppVersion(t *testing.T) {
	os.Setenv("APP_VERSION", "")

	appVersion := AppVersion()

	expectedAppVersion := "local"

	if expectedAppVersion != appVersion {
		t.Fatalf("Expected base path %s, but got %s", expectedAppVersion, appVersion)
	}
}
