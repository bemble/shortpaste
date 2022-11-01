package public

import (
	"net/http"
	"os"
	"path"
	"shortpaste/core/config"
	"shortpaste/core/database"
	"shortpaste/core/formatter"
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
	if _, ok := r.URL.Query()["download"]; ok {
		file.DownloadCount += 1
		db.Save(&file)

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
		Src:   "/f/" + id + "?download",
		Image: strings.HasPrefix(file.MIME, "image/"),
		Size:  formatter.IECFormat(fi.Size()),
	}
	t.Execute(w, data)
}
