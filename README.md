# True Positive

True Positive is a collaborative, web-based case management tool for incident responders.

- Website: [link](https://truepositive.app)
- Documentation: [link](https://docs.truepositive.app)

## Screenshots

![](https://storage.googleapis.com/tp_landing_page_videos/one_case.png)  

![](https://storage.googleapis.com/tp_landing_page_videos/list_of_case_templates.png)  

![](https://storage.googleapis.com/tp_landing_page_videos/query_me.png)

## Key features

- **Add tasks** to cases, which you can then assign and comment on
- **Add IOCs** like IP hashes, domains, URLs to a case, and then tag them and comment on them
- Build **case and task templates** to standardize incident handling for different case types
- Create cases from inbound emails
- **Restricts access to cases** to those users/groups who are given explicit access
- **GraphQL API** with interactive playground that lets you automate anything you can do via the UI
- **Customize case statuses and priorities** to suit your organization's workflow
- **Merge duplicate cases** together
- **Dark mode**

## You may like True Positive if:

- You're using Jira, SharePoint, Google Docs, or a service desk tool and are looking for a more specialized tool.
- You've checked out TheHive, RTIR, or other existing case management tools and found that they don't meet all your needs.
- You work at an internal detection/response team, a SOC, a MSSP, or an incident response firm.

## Getting started

Please see [this page](CONTRIBUTING.md) to get True Positive running locally!

## Tech stack

True Positive has three components:

- A Postgres database
- A GraphQL API, built with Ruby on Rails
- A React SPA, built with TypeScript, Apollo, Reach Router, MobX

Additionally, our landing page is built with [Gatsby.js](https://www.gatsbyjs.com/) and our documentation site is built
with [Docusaurus](https://docusaurus.io/).