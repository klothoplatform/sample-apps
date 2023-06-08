package main

import (
	"context"
	"fmt"
	"gocloud.dev/runtimevar"
	"log"
	"path/filepath"
)

func GetSecret2(ctx context.Context) (string, bool) {
	path, err := filepath.Abs("my_secret_2.key")
	if err != nil {
		log.Fatal(err.Error())
	}

	/**
	 * @klotho::config {
	 *	id = "myOtherSecret"
	 *   secret = true
	 * }
	 */
	v2, err := runtimevar.OpenVariable(context.TODO(), fmt.Sprintf("file://%s?decoder=string", path))
	if err != nil {
		log.Fatal(err.Error())
	}
	defer v2.Close()
	snapshot2, err := v2.Latest(ctx)
	secretValue2, ok := snapshot2.Value.(string)

	return secretValue2, ok
}
