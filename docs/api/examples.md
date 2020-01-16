---
id: examples
title: Examples
sidebar_label: Examples
---

GraphQL is self-documenting, so please use the "Docs" section in the [Playground](https://api.truepositive.app) for a full reference.

But here's a couple examples of queries and mutations, to help you get started.

## List cases

Lists all the cases in your True Positive tenant.

```graphql
query {
  cases {
    id
    name
  }
}
```

### Example response

```json
{
  "data": {
    "cases": [
      {
        "id": "8",
        "name": "Ryuk sighting"
      }
    ]
  }
}
```

## Retrieve one case

Get data about a specific case by ID.

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

### Example response

```json
{
  "data": {
    "cases": [
      {
        "id": "8",
        "name": "Ryuk sighting",
        "status": {
          "name": "Open"
        },
        "priority": {
          "name": "Low"
        },
        "description": null,
        "assignedTo": {
          "username": "gennie.mertz"
        },
        "tasks": [],
        "indicators": []
      }
    ]
  }
}
```
