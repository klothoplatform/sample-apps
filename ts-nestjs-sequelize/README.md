# NestJS and Sequelize Sample App

The NestJS + Sequelize sample application is a REST API for managing users built using the [NestJS](https://nestjs.com/) web framework and [Sequelize](https://sequelize.org/) ORM.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


#### Klotho Annotations Used

- `@klotho::execution_unit`
- `@klotho::expose`
- `@klotho::persist`

#### REST API Endpoints

- `POST /users` - Creates a new user in the database from the data supplied in the request body.
- `GET /users` - Gets all registered users from the database.
- `GET /users/:id` - Gets the user associated with the supplied `id` path parameter from the database.
This application uses Nest's `ExpressAdapter` to take advantage of Klotho's existing support for Express.

## Running the app locally

```bash
npm install
npm run start
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-nestjs-sequelize -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region <YOUR_REGION> -s ts-nestjs-sequelize

# Set a username and password to be used for accessing `UsersDB`
pulumi config set ts-nestjs-sequelize:usersdb_username <USERNAME> -s ts-nestjs-sequelize
pulumi config set --secret ts-nestjs-sequelize:usersdb_password <PASSWORD> -s ts-nestjs-sequelize

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s ts-nestjs-sequelize

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```

## Calling your service

### Create a new user
```sh
curl --request POST 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users' \
--header 'Content-Type: application/json' \
--data-raw '{ "id": 1, "firstName": "John", "lastName": "Doe" }'

# status code: 201
```

### Get a single user

```shell
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users/<ID>
```
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe"
}
```
### Get all users

```shell
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users
```
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe"
  }
]
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-nestjs-sequelize
```
