package config

import "os"

func GetDomain() string {
	domain := os.Getenv("DOMAIN")
	return domain
}
