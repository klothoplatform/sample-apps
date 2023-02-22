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
	"gocloud.dev/runtimevar"
	_ "gocloud.dev/runtimevar/filevar"
)

func main() {

	// Create a file-based bucket.

	path, err := filepath.Abs("my_secret.key")
	if err != nil {
		log.Fatal(err.Error())
	}
	/**
	* @klotho::config {
	*	id = "mySecret"
	*   secret = true
	* }
	 */
	v, err := runtimevar.OpenVariable(context.TODO(), fmt.Sprintf("file://%s?decoder=string", path))
	if err != nil {
		log.Fatal(err.Error())
		os.Exit(1)
	}
	defer v.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, req *http.Request) {
		snapshot, err := v.Latest(req.Context())
		fmt.Printf("%+v\n", v)
		if err != nil {
			w.Write([]byte(err.Error()))
		}
		secretValue, ok := snapshot.Value.(string)
		if !ok {
			w.Write([]byte("Unable to receive secret value. Secret is not a string"))
			return
		}

		w.Write([]byte(secretValue))
	})
	fmt.Println("Listening on :3000")

	/* @klotho::expose {
	 *   target = "public"
	 *   id = "app"
	 * }
	 */
	http.ListenAndServe(":3000", r)
}
