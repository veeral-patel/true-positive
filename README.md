# True Positive

True Positive is a collaborative, web-based case management tool for incident responders. For more information, check
out [the website](https://truepositive.app).

![](https://storage.googleapis.com/tp_landing_page_videos/one_case.png)

## Key features

- Divide work to complete for a case into tasks, which you can assign and comment on
- **Add IOCs** like IP hashes, domains, URLs to a case, and then tag them and comment on them
- Build **case and task templates** to standardize incident handling for different case types
- Create cases from inbound emails
- **Restricts access to cases** to those users/groups who are given explicit access
- **GraphQL API** with interactive playground that lets you automate anything you can do via the UI
- **Customize case statuses and priorities** to suit your organization's workflow
- **Merge duplicate cases** together

## You may like True Positive if:

- You're using Jira, SharePoint, Google Docs, or a service desk tool and are looking for a more specialized tool.
- You've checked out TheHive, RTIR, or other existing case management tools and found that they don't meet all your needs.
- You work at an internal detection/response team, a SOC, a MSSP, or an incident response firm.

## Tech stack

True Positive has three components:

- A Postgres database
- A GraphQL API, built with Ruby on Rails
- A React SPA, built with TypeScript, Apollo, Reach Router, MobX

Additionally, our landing page is built with [Gatsby.js](https://www.gatsbyjs.com/) and our documentation site is built
with [Docusaurus](https://docusaurus.io/).

## Contributing

If you are interested in contributing, or just modifying some of the code, please see [this page](CONTRIBUTING.md) to
learn how to run True Positive locally in development mode.