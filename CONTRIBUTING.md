# Contributing

If you are interested in running True Positive in development mode, please see the setup instructions below.

## API Setup

> You will need to install Ruby, Rails, and Bundler for this.

To start the API locally, run:

```
cd backend

# install dependencies
bundle install

# create, migrate our database
rails db:create db:migrate
```

Run `rails console` in `backend` and let's create our first user:

```
User.create(username: "plato", email: "plato@thegreeks.net", password: "thegreeks")
```

Now, start our local server.

```
rails s -p 4000
```

Then visit http://localhost:4000. Note that all the GraphQL queries right now you try to make will give you an "unauthorized" error; this is normal.

## Frontend Setup

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

Assuming you ran the same create user command as above, your credentials to log in will be:

Username: plato  
Password: thegreeks
