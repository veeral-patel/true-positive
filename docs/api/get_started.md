---
id: get_started
title: Get Started
sidebar_label: Get Started
---

Anything you can do in True Positive's web interface, you can do with
our API.

In this guide, you'll make your first call to our
[GraphQL](https://graphql.org/) API!

## Requirements

- A basic understanding of GraphQL. [Visit this site for an introduction to GraphQL](<(https://graphql.org/learn)>).
- A True Positive account.

## Generate an API token

> Guard your tokens! They provide full access to your account.

Before using the API, you need to generate an API token. Do this by visiting API > Tokens in the top navigation:

![](https://storage.googleapis.com/tp_landing_page_videos/list_of_tokens.png)

Then click "Generate Token" and provide a brief, descriptive name for your token.

## Explore the playground

Now, visit API > Playground in the top navigation.

You'll get a page like this, with a "Server cannot be reached" error:

![](https://storage.googleapis.com/tp_landing_page_videos/playground-not-reachable.png)

This is normal! To fix it, click "HTTP headers" and add an Authorization header with your API token, like this:

![](https://storage.googleapis.com/tp_landing_page_videos/query_me.png)

Then, copy the query in the screenshot above into your explorer. Here it is, for ease of copyability:

```graphql
query {
  me {
    username
    email
  }
}
```

You should see your username and email address on the right.
