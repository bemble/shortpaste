package api

import (
	"encoding/json"
	"net/http"
	"shortpaste/core/config"
)

func StatusList(w http.ResponseWriter, r *http.Request) {
	var list = map[string]interface{}{
		"status":  "up",
		"version": config.AppVersion(),
	}
	body, _ := json.Marshal(list)
	w.Write(body)
}
