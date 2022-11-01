package config

import "os"

func GetApiKey() string {
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "CHANGE-IT-ASAP"
	}
	return apiKey
}
