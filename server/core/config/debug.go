package config

import (
	"os"
)

func IsDebug() bool {
	return os.Getenv("DEBUG") == "1" || os.Getenv("DEBUG") == "true" || os.Getenv("DEBUG") == "True"
}
