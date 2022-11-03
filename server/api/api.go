package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func Router(r chi.Router) {
	r.Use(middleware.SetHeader("Content-Type", "application/json"))
	r.Use(CheckApiKey)

	r.Get(`/config`, ConfigList)
	r.Get(`/status`, StatusList)

	r.Get(`/links`, LinksList)
	r.Post(`/links`, LinkAdd)
	r.Delete(`/links/{id}`, LinkDelete)

	r.Get(`/files`, FilesList)
	r.Post(`/files`, FileAdd)
	r.Delete(`/files/{id}`, FileDelete)

	r.Get(`/texts`, TextsList)
	r.Post(`/texts`, TextAdd)
	r.Delete(`/texts/{id}`, TextDelete)
}
