# True Positive

True Positive is a collaborative, web-based case management tool for incident responders. For more information, check
out [the website](https://truepositive.app).

## You may like True Positive if:

- You're using Jira, SharePoint, Google Docs, or a service desk tool for managing your security-related cases, and are looking for a more specialized tool.
- You've checked out TheHive, RTIR, or other existing case management tools and found that they don't meet all your needs.
- You're a hobbyist who likes experimenting with new DFIR tools.
- You work at an internal detection/response team, a SOC, a MSSP, or an incident response firm.

## How it works

True Positive has three components:

- A Postgres database
- A GraphQL API, built with Ruby on Rails and `graphql-ruby`
- A React frontend which uses the GraphQL API. Also built with TypeScript, Apollo, Reach Router, MobX

Additionally, you will find:
- a landing page (built with Gatsby.js) under `landing`
- a documentation site (built with Docusaurus) under `docs`

## Contributing

If you are interested in contributing, or just modifying some of the code, please see [this page](CONTRIBUTING.md) to
learn how to run True Positive locally in development mode.