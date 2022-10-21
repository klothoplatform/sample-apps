# NextJs & TypeORM Sample app

This application is a simple blogging site created with NextJS and TypeORM that allows visitors to read or submit markdown-formatted blog posts.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`. The page auto-updates as you edit the file.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-nextjs-typeorm -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region <YOUR_REGION> -s ts-nextjs-typeorm

# Set a username and password to be used for accessing `UsersDB`
pulumi config set ts-nextjs-typeorm:usersdb_username <USERNAME> -s ts-nextjs-typeorm
pulumi config set --secret ts-nextjs-typeorm:usersdb_password <PASSWORD> -s ts-nextjs-typeorm

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s ts-nextjs-typeorm

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```

## Calling your service

For instructions on calling your service, follow the (tutorial)[https://klo.dev/docs/tutorials/use_cases/nextjs_typeorm] for complete steps.

## Clean Up
```sh
# Tear down when done
pulumi destroy -s ts-nextjs-typeorm