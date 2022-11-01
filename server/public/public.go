package public

import (
	"github.com/go-chi/chi/v5"
)

func Router(r chi.Router) {
	r.Get(`/f/{id}`, FileGet)
	r.Get(`/l/{id}`, LinkRedirect)
	r.Get(`/t/{id}`, TextGet)
}
