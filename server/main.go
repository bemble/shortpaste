package main

import (
	"net/http"
	"os"
	"shortpaste/api"
	"shortpaste/core/config"
	"shortpaste/core/database"
	"shortpaste/public"

	nested "github.com/antonfisher/nested-logrus-formatter"
	log "github.com/sirupsen/logrus"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func init() {
	logLevel := log.InfoLevel
	if config.IsDebug() {
		logLevel = log.DebugLevel
	}

	log.SetLevel(logLevel)
	log.SetFormatter(&nested.Formatter{
		HideKeys:    true,
		FieldsOrder: []string{"component", "category"},
	})

	dataDir := config.GetDataDirPath()
	os.MkdirAll(dataDir, os.ModePerm)

	database.Get()
}

func main() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	if config.IsDebug() {
		r.Use(middleware.Logger)
	}
	r.Use(middleware.Recoverer)

	basePath := config.GetBasePath()

	r.Route(basePath, public.Router)
	r.Route(basePath+"api", api.Router)

	log.WithField("category", "general").Info("Server started: http://0.0.0.0:" + config.GetPort())

	log.Fatal(http.ListenAndServe(":"+config.GetPort(), r))
}
