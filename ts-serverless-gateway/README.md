# Serverless Express Example

The purpose of this project is to showcase what it might look like to have an application that runs locally using express, but is structured and annotated in a way that allows Klotho to deploy it in a serverless fashion. 

```
serverless-express-sample
│   README.md   
└───src
│   │   index.ts
│   │
│   └───quotes // example of one lambda for all quote routes
│   │       quotes.ts 
│   │   
│   └───users // example of one lambda per user route
│           get-users.ts 
│           post-users.ts

```


## Run the app locally

run the terminal commands:
```sh
npm install
ts-node src/index.ts
> App listening locally
```

