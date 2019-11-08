# V1

[![Netlify Status](https://api.netlify.com/api/v1/badges/8486d8d3-031b-440f-899e-6f9c75a32ef0/deploy-status)](https://app.netlify.com/sites/tp-staging/deploys)

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

## Deploying (to `staging`)

### Backend

I deploy to Heroku automatically when I push to my master branch on GitHub, but if not, run:

```
git subtree push --prefix backend heroku master
```

To push my code manually.

### Frontend

```
yarn build
netlify deploy --prod
```

### Tips

- Remember to set the SECRET_KEY_BASE environment variable in Heroku.
- `heroku config` lists the existing environmental variables in Heroku.
