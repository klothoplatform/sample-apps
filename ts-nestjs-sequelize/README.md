# ts-nest-sequelize

## Description
The NestJS + Sequelize sample application is a REST API for managing users built using the NestJS web framework and Sequelize ORM.

#### Klotho Annotations Used

- [@klotho::execution_unit](../api/nodejs/exec_unit)
- [@klotho::expose](../api/nodejs/expose)
- [@klotho::persist](../api/nodejs/persist)

#### REST API Endpoints

- `POST /users` - Creates a new user in the database from the data supplied in the request body.
- `GET /users` - Gets all registered users from the database.
- `GET /users/:id` - Gets the user associated with the supplied `id` path parameter from the database.
This application uses Nest's `ExpressAdapter` to take advantage of Klotho's existing support for Express.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
