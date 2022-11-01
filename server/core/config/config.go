package config

import (
	"fmt"
	"path"
	"path/filepath"
	"runtime"
)

func GetAppDirPath() (string, error) {
	_, currentFilePath, _, _ := runtime.Caller(0)
	currentFileDir := path.Dir(currentFilePath)
	return filepath.Abs(fmt.Sprintf(`%s/../../..`, currentFileDir))
}

func GetDataDirPath() string {
	dir, _ := GetAppDirPath()
	return filepath.Clean(fmt.Sprintf(`%s/data`, dir))
}

func GetTemplatesDirPath() string {
	dir, _ := GetAppDirPath()
	return filepath.Clean(fmt.Sprintf(`%s/templates`, dir))
}
