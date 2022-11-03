package api

import (
	"encoding/json"
	"net/http"
	"shortpaste/core/config"
)

func ConfigList(w http.ResponseWriter, r *http.Request) {
	var list = map[string]interface{}{
		"domain":  config.GetDomain(),
		"version": config.AppVersion(),
	}
	body, _ := json.Marshal(list)
	w.Write(body)
}
