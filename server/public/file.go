package public

import (
	"net/http"
	"os"
	"path"
	"shortpaste/core/config"
	"shortpaste/core/database"
	"shortpaste/core/tools"
	"strings"
	"text/template"

	"github.com/go-chi/chi/v5"
)

func FileGet(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var file database.File
	if err := db.First(&file, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	filePath := path.Join(config.GetDataDirPath(), "files", file.ID, file.Name)
	_, isDownload := r.URL.Query()["download"]
	_, isView := r.URL.Query()["view"]
	if isDownload || isView {
		if isDownload {
			file.DownloadCount += 1
			db.Save(&file)
		}

		w.Header().Set("Content-Disposition", "attachment; filename="+file.Name)
		http.ServeFile(w, r, filePath)
		return
	}

	file.HitCount += 1
	db.Save(&file)

	t, err := template.ParseFS(templateFS, "templates/file.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fi, err := os.Stat(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	data := struct {
		Name  string
		Src   string
		Image bool
		Size  string
	}{
		Name:  file.Name,
		Src:   "/f/" + id + "?view",
		Image: strings.HasPrefix(file.MIME, "image/"),
		Size:  tools.IECFormat(fi.Size()),
	}
	t.Execute(w, data)
}
