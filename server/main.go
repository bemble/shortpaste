package main

import (
	"net/http"
	"os"
	"shortpaste/api"
	"shortpaste/core/config"
	"shortpaste/core/constants"
	"shortpaste/core/database"
	"shortpaste/core/tools/front"
	"shortpaste/public"

	nested "github.com/antonfisher/nested-logrus-formatter"
	"github.com/sirupsen/logrus"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func init() {
	logLevel := logrus.InfoLevel
	if config.IsDebug() {
		logLevel = logrus.DebugLevel
	}

	logrus.SetLevel(logLevel)
	logrus.SetFormatter(&nested.Formatter{
		HideKeys:    true,
		FieldsOrder: []string{"component", "category"},
	})

	dataDir := config.GetDataDirPath()
	os.MkdirAll(dataDir, os.ModePerm)

	// Init database
	database.Init()

	// Replace placeholders
	front.ReplacePlaceHolders()
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
	if basePath != "/" && basePath[len(basePath)-1] != '/' {
		r.Get(basePath, http.RedirectHandler(basePath+"/", 301).ServeHTTP)
		basePath += "/"
	}

	r.Route(basePath, public.Router)
	r.Route(basePath+"api/v"+constants.API_VERSION, api.Router)

	logrus.WithField("category", "general").Info("Server started: http://0.0.0.0:" + config.GetPort())

	logrus.Fatal(http.ListenAndServe(":"+config.GetPort(), r))
}
