package public

import (
	"net/http"
	"os"
	"path/filepath"
	"shortpaste/core/config"
	"strings"
)

func StaticFront(w http.ResponseWriter, r *http.Request) {
	basePath := config.GetBasePath()
	if basePath != "/" && basePath[len(basePath)-1] != '/' {
		basePath += "/"
	}

	requestUri := "/" + strings.TrimPrefix(r.RequestURI, basePath)
	staticHandler := http.FileServer(http.Dir(config.GetPublicDir()))
	fs := http.StripPrefix(basePath, staticHandler)
	if _, err := os.Stat(filepath.Join(config.GetPublicDir(), requestUri)); os.IsNotExist(err) {
		// If not exists, fallback on index.html
		http.ServeFile(w, r, filepath.Join(config.GetPublicDir(), "index.html"))
	} else {
		// If file exists in public dir, serve it
		fs.ServeHTTP(w, r)
	}
}
