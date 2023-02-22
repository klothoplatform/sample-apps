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

	r.Post("/write-file", func(writer http.ResponseWriter, r *http.Request) {
		w, err := bucket.NewWriter(r.Context(), "foo.txt", nil)
		if err != nil {
			w.Write([]byte(err.Error()))
		}
		_, writeErr := fmt.Fprintln(w, "Hello, World!")
		closeErr := w.Close()
		if writeErr != nil {
			log.Fatal(writeErr)
		}
		if closeErr != nil {
			log.Fatal(closeErr)
		}
		writer.Write([]byte("Wrote file!"))
	})

	r.Get("/read-file", func(w http.ResponseWriter, req *http.Request) {
		// Open the key "foo.txt" for reading with the default options.
		r, err := bucket.NewReader(req.Context(), "foo.txt", nil)
		if err != nil {
			w.Write([]byte(err.Error()))
		}
		defer r.Close()
		r.WriteTo(w)
	})

	r.Delete("/delete-file", func(w http.ResponseWriter, req *http.Request) {
		if err := bucket.Delete(req.Context(), "foo.txt"); err != nil {
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
