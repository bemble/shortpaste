package public

import (
	"html"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"shortpaste/core/config"
	"shortpaste/core/database"
	"shortpaste/core/tools"
	"text/template"

	"github.com/go-chi/chi/v5"
)

func TextGet(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var text database.Text
	if err := db.First(&text, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	filePath := path.Join(config.GetDataDirPath(), "texts", text.ID+"."+text.Type)

	if _, ok := r.URL.Query()["download"]; ok {
		text.DownloadCount += 1
		db.Save(&text)

		w.Header().Set("Content-Disposition", "attachment; filename="+text.ID+"."+text.Type)
		http.ServeFile(w, r, filePath)
		return
	}

	text.HitCount += 1
	db.Save(&text)

	t, err := template.ParseFS(templateFS, "templates/text.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	textContent, err := ioutil.ReadFile(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var highlight string
	if text.NoHighlight {
		highlight = "language-plaintext"
	}

	fi, err := os.Stat(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	data := struct {
		ID    string
		Class string
		Name  string
		Src   string
		Text  string
		Size  string
	}{
		ID:    text.ID,
		Class: highlight,
		Name:  text.ID + "." + text.Type,
		Src:   "/t/" + id + "?download",
		Text:  html.EscapeString(string(textContent)),
		Size:  tools.IECFormat(fi.Size()),
	}
	t.Execute(w, data)
}
