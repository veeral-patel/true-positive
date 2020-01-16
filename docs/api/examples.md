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

#### Example response

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

#### Example response

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

## Create a case

```graphql
mutation {
  createCase(
    input: {
      # required ---
      name: "Ryuk sighting"
      status: "Open"
      priority: "Low"
      # optional ---
      tags: ["ransomware"]
      description: "A HR employee opened a malicious download link"
      assignedTo: "gennie.mertz"
    }
  ) {
    case {
      id
      name
      status {
        name
      }
      priority {
        name
      }
      tags {
        name
      }
      description
      assignedTo {
        username
      }
    }
  }
}
```

#### Example response

```json
{
  "data": {
    "createCase": {
      "case": {
        "id": "9",
        "name": "Ryuk sighting",
        "status": {
          "name": "Open"
        },
        "priority": {
          "name": "Low"
        },
        "tags": [
          {
            "name": "ransomware"
          }
        ],
        "description": "A HR employee opened a malicious download link",
        "assignedTo": {
          "username": "gennie.mertz"
        }
      }
    }
  }
}
```

## Update a case

```graphql
mutation {
  updateCase(
    input: {
      caseId: 9
      name: "Ryuk infection"
      status: "Closed"
      priority: "High"
      assignedTo: "N/A"
    }
  ) {
    case {
      id
      name
      status {
        name
      }
      priority {
        name
      }
      assignedTo {
        username
      }
    }
  }
}
```

##### Example response

```json
{
  "data": {
    "updateCase": {
      "case": {
        "id": "9",
        "name": "Ryuk infection",
        "status": {
          "name": "Closed"
        },
        "priority": {
          "name": "High"
        },
        "assignedTo": null
      }
    }
  }
}
```
