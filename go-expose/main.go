package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/klothoplatform/demo-app/pkg/routes"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello!"))
	})

	r.Get("/expose", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello From Klotho Expose!"))
	})

	r.Mount("/extra", routes.ExtraRoutes())

	fmt.Println("Listening on :3000")

	/* @klotho::expose {
	 *   target = "public"
	 *   id = "app"
	 * }
	 */
	http.ListenAndServe(":3000", r)
}
