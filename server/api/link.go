package api

import (
	"encoding/json"
	"net/http"
	"shortpaste/core/database"

	"github.com/go-chi/chi/v5"
	"github.com/thanhpk/randstr"
	"gopkg.in/go-playground/validator.v9"
)

func LinksList(w http.ResponseWriter, r *http.Request) {
	db := database.Get()

	var links []database.Link
	db.Find(&links)

	body, _ := json.Marshal(links)
	w.Write(body)
}

func LinkAdd(w http.ResponseWriter, r *http.Request) {
	link := database.Link{}
	db := database.Get()

	if err := json.NewDecoder(r.Body).Decode(&link); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if link.ID == "" {
		var _link database.Link
		id := randstr.String(6)
		err := db.First(&_link, "id = ?", id).Error

		for err == nil {
			id = randstr.String(6)
			err = db.First(&_link, "id = ?", id).Error
		}
		link.ID = id
	}

	if err := validator.New().Struct(link); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := db.Create(&link).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	body, _ := json.Marshal(link)
	w.Write(body)
}

func LinkDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var link database.Link
	if err := db.First(&link, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	db.Delete(link)

	w.WriteHeader(http.StatusNoContent)
}
