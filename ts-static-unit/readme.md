# Static Unit

In this sample application, we showcase how we can staticly host the [TypeScript-React TodoMVC application](https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react) using `@klotho::static_unit` annotation`.


### Run the application locally

To run the initial application locally, we will follow the instructions below


 ```sh
 npm install typescript
 ```

 To compile the TypeScript in this project:

 ```sh
 $ ./node_modules/typescript/bin/tsc -p ./js/
 ```

 To be able to run the output JS files in the browser:

 ```sh
 $ ./node_modules/browserify/bin/cmd.js ./js/app.js -o ./js/bundle.js
 ```

 ```sh
 $ npm run start
 ```


### from examples/typescript-react

```
$ npm run start
```


## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app ts-static-unit -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-static-unit

# npm install
npm install

# Deploy
pulumi up -s ts-static-unit

#     frontendUrls    : [
#        [0]: "<...>.cloudfront.net"
#    ]
```
## Using your service

Navigate to the output frontendUrl in your browser to see your static site.

## Clean Up
From within the compiled directory
```sh
# Tear down when done
pulumi destroy -s ts-static-unit
```
