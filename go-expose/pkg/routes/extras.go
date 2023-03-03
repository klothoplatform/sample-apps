package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func ExtraRoutes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Extra routes"))
	})

	r.Get("/one", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Extra route one"))
	})

	r.Get("/two", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Extra route two"))
	})

	return r
}
