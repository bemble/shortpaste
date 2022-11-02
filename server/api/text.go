package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"shortpaste/core/config"
	"shortpaste/core/database"

	"github.com/go-chi/chi/v5"
	"github.com/thanhpk/randstr"
	"gopkg.in/go-playground/validator.v9"
)

func TextsList(w http.ResponseWriter, r *http.Request) {
	db := database.Get()

	var texts []database.Text
	db.Find(&texts)

	for i := range texts {
		text := texts[i]
		filePath := path.Join(config.GetDataDirPath(), "texts", text.ID+"."+text.Type)
		textContent, err := ioutil.ReadFile(filePath)
		if err != nil {
			text.Text = ""
		}
		texts[i].Text = string(textContent)
	}

	body, _ := json.Marshal(texts)
	w.Write(body)
}

func TextAdd(w http.ResponseWriter, r *http.Request) {
	text := database.Text{}
	db := database.Get()

	if err := json.NewDecoder(r.Body).Decode(&text); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if text.Type == "" {
		text.Type = "txt"
	}

	if text.ID == "" {
		var _text database.Text
		id := randstr.String(6)
		err := db.First(&_text, "id = ?", id).Error

		for err == nil {
			id = randstr.String(6)
			err = db.First(&_text, "id = ?", id).Error
		}
		text.ID = id
	}

	filePath := path.Join(config.GetDataDirPath(), "texts", text.ID+"."+text.Type)
	if err := os.MkdirAll(path.Dir(filePath), 0700); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := ioutil.WriteFile(filePath, []byte(text.Text), 0600); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := validator.New().Struct(text); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := db.Create(&text).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	body, _ := json.Marshal(text)
	w.Write(body)
}

func TextDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var text database.Text
	if err := db.First(&text, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	err := os.RemoveAll(path.Join(config.GetDataDirPath(), "texts", text.ID+"."+text.Type))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	db.Delete(text)

	w.WriteHeader(http.StatusNoContent)
}
