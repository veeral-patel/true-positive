# CONTRIBUTING

## Architecture

True Positive has three components:

- A Postgres database, which stores our data
- A GraphQL API, built with Ruby on Rails, which you can use to create/update/delete cases/tasks/indicators/other objects
- A React frontend, which uses the GraphQL API

## API

> You will need to install Ruby, Rails, and Bundler for this.

To start the API locally, run:

```
cd backend

# install dependencies
bundle install

# create, migrate our database
rails db:create db:migrate
```

Now, start our local server.

```
rails s -p 4000
```

Then visit http://localhost:4000

## Frontend

> You will need to install `yarn` for this.

To start the frontend locally, run:

```

cd frontend

# install dependencies

yarn install

# start local server

yarn start

```

Then visit http://localhost:3000

```

```
