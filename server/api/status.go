package api

import (
	"encoding/json"
	"net/http"
)

func StatusList(w http.ResponseWriter, r *http.Request) {
	var list = map[string]interface{}{
		"status": "up",
	}
	body, _ := json.Marshal(list)
	w.Write(body)
}
