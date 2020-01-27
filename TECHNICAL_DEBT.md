## Backend

- `user_mailer.rb` -- don't hard-code `/profile`
- clean up my policy classes
  - stop having one method per mutation
  - `comment_policy.rb`, `attachment_policy.rb` -- code is messy

## Frontend

- remove all my domain stores
- remove `inject` and `observer` from my codebase (switch to the `useStore` API)
