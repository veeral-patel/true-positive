---
id: examples
title: Examples
sidebar_label: Examples
---

GraphQL is self-documenting, so please use the "Docs" section in the [Playground](https://api.truepositive.app) for a full reference.

But here's a couple examples of queries and mutations, to help you get started.

## List cases

```graphql
query {
  cases {
    id
    name
  }
}
```

## Retrieve one case

```graphql
query {
  case(id: 12) {
    id
    name
    status {
      name
    }
    priority {
      name
    }
    description
    assignedTo {
      username
    }
    tasks {
      name
    }
    indicators {
      indicator
    }
  }
}
```
