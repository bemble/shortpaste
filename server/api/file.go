package api

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path"
	"shortpaste/core/config"
	"shortpaste/core/database"

	"github.com/go-chi/chi/v5"
	log "github.com/sirupsen/logrus"
	"github.com/thanhpk/randstr"
	"gopkg.in/go-playground/validator.v9"
)

func FilesList(w http.ResponseWriter, r *http.Request) {
	db := database.Get()

	var files []database.File
	db.Find(&files)

	body, _ := json.Marshal(files)
	w.Write(body)
}

func FileAdd(w http.ResponseWriter, r *http.Request) {
	file := database.File{}
	db := database.Get()

	if file.ID == "" {
		var _file database.File
		id := randstr.String(6)
		err := db.First(&_file, "id = ?", id).Error

		for err == nil {
			id = randstr.String(6)
			err = db.First(&_file, "id = ?", id).Error
		}
		file.ID = id
	}

	// Maximum upload of 10 MB files
	r.ParseMultipartForm(10 << 20)

	// Get handler for filename, size and headers
	uploadedFile, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer uploadedFile.Close()

	file.Name = handler.Filename
	file.MIME = handler.Header["Content-Type"][0]

	log.WithField("category", "file-upload").Info("Uploaded File: %+v\n", file.Name)
	log.WithField("category", "file-upload").Info("File Size: %+v\n", handler.Size)
	log.WithField("category", "file-upload").Info("MIME Header: %+v\n", file.MIME)

	filePath := path.Join(config.GetDataDirPath(), "files", file.ID, file.Name)

	// Create folder and file
	if err := os.MkdirAll(path.Dir(filePath), 0700); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dst, err := os.Create(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(dst, uploadedFile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := validator.New().Struct(file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := db.Create(&file).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	body, _ := json.Marshal(file)
	w.Write(body)
}

func FileDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := database.Get()

	var file database.File
	if err := db.First(&file, "id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	err := os.RemoveAll(path.Join(config.GetDataDirPath(), "files", file.ID))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	db.Delete(file)

	w.WriteHeader(http.StatusNoContent)
}
