package config

import (
	"fmt"
	"os"
	"testing"
)

func TestGetAppDirPath(t *testing.T) {
	dir, _ := GetAppDirPath()

	expectedDir, _ := os.Getwd()

	if expectedDir != fmt.Sprintf("%s/server/core/config", dir) {
		t.Fatalf("Expected path %s, but got %s", expectedDir, dir)
	}
}

func TestGetDataDirPath(t *testing.T) {
	appDir, _ := GetAppDirPath()
	dir := GetDataDirPath()

	expectedDir := fmt.Sprintf("%s/data", appDir)

	if expectedDir != dir {
		t.Fatalf("Expected path %s, but got %s", expectedDir, dir)
	}
}
func TestGetTemplateDirPath(t *testing.T) {
	appDir, _ := GetAppDirPath()
	dir := GetTemplatesDirPath()

	expectedDir := fmt.Sprintf("%s/templates", appDir)

	if expectedDir != dir {
		t.Fatalf("Expected path %s, but got %s", expectedDir, dir)
	}
}
