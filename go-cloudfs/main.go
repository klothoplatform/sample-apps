package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/fileblob"
)

func main() {

	path, err := filepath.Abs("./files")
	if err != nil {
		return
	}
	// Create a file-based bucket.
	/**
	* @klotho::persist {
	*	id = "cloudFs"
	* }
	 */
	bucket, err := blob.OpenBucket(context.Background(), fmt.Sprintf("file://%s", path))
	if err != nil {
		log.Fatal(err.Error())
		os.Exit(1)
	}
	defer bucket.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Post("/write-file/{path}", func(writer http.ResponseWriter, req *http.Request) {
		path := chi.URLParam(req, "path")
		fmt.Println(path)
		w, err := bucket.NewWriter(req.Context(), path, nil)
		if err != nil {
			log.Fatal(err)
			writer.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		_, writeErr := fmt.Fprintln(w, "Hello, World!")
		closeErr := w.Close()
		if writeErr != nil {
			log.Fatal(writeErr)
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write([]byte(writeErr.Error()))
			return
		}
		if closeErr != nil {
			log.Fatal(closeErr)
			writer.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(closeErr.Error()))
			return
		}
		writer.Write([]byte("Wrote file!"))
	})

	r.Get("/read-file/{path}", func(w http.ResponseWriter, req *http.Request) {
		path := chi.URLParam(req, "path")
		response, err := bucket.NewReader(req.Context(), path, nil)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		closeErr := response.Close()
		if closeErr != nil {
			log.Fatal(closeErr)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(closeErr.Error()))
			return
		}
		response.WriteTo(w)
	})

	r.Delete("/delete-file/{path}", func(w http.ResponseWriter, req *http.Request) {
		path := chi.URLParam(req, "path")
		if err := bucket.Delete(req.Context(), path); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}
	})

	fmt.Println("Listening on :3000")

	/* @klotho::expose {
	 *   target = "public"
	 *   id = "app"
	 * }
	 */
	http.ListenAndServe(":3000", r)
}
