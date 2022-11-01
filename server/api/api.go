package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

const API_VERSION = "1"

func Router(r chi.Router) {
	r.Use(middleware.SetHeader("Content-Type", "application/json"))
	r.Use(CheckApiKey)

	r.Get("/v"+API_VERSION+`/links`, LinksList)
	r.Post("/v"+API_VERSION+`/links`, LinkAdd)
	r.Delete("/v"+API_VERSION+`/links/{id}`, LinkDelete)

	r.Get("/v"+API_VERSION+`/files`, FilesList)
	r.Post("/v"+API_VERSION+`/files`, FileAdd)
	r.Delete("/v"+API_VERSION+`/files/{id}`, FileDelete)

	r.Get("/v"+API_VERSION+`/texts`, TextsList)
	r.Post("/v"+API_VERSION+`/texts`, TextAdd)
	r.Delete("/v"+API_VERSION+`/texts/{id}`, TextDelete)
}
