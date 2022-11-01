package public

import (
	"net/http"
	"shortpaste/core/database"

	"github.com/go-chi/chi/v5"
)

func LinkRedirect(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var link database.Link
	if err := db.First(&link, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	link.HitCount += 1
	db.Save(&link)

	http.Redirect(w, r, link.Link, http.StatusTemporaryRedirect)
}
