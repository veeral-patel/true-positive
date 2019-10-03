# V1

This is the next version of [INCIDENTS](https://github.com/veeral-patel/incidents).

It's composed of a Rails-powered GraphQL API and a React frontend.

## To run

Frontend:

```
yarn start
```

Runs at http://localhost:3000

Backend:

```
rails s -p 4000
```

Runs at http://localhost:4000

## Deploying to Heroku

```
git subtree push --prefix backend heroku master
```

### Tips

- Remember to set the SECRET_KEY_BASE environment variable in Heroku.
- `heroku config` lists the existing environmental variables in Heroku.
