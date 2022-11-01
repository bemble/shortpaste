package config

import "os"

func GetBasePath() string {
	basePath := os.Getenv("BASE_PATH")
	if basePath == "" {
		return "/"
	}
	return basePath
}
