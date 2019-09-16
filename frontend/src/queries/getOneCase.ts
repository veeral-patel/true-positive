import gql from "graphql-tag";

const GET_ONE_CASE = gql`
  query getOneCase($id: ID!) {
    case(id: $id) {
      id
      name
      isMerged
      mergedInto {
        id
        name
      }
      mergedCases {
        id
        name
        description
      }
      caseMembers {
        role
        user {
          username
          email
        }
      }
      description
      createdAt
      formattedCreatedAt
      priority {
        name
      }
      status {
        name
      }
      createdBy {
        username
      }
      assignedTo {
        username
      }
      tags {
        id
        name
      }
      indicators {
        id
        name
        tags {
          name
        }
        createdBy {
          username
        }
      }
      tasks {
        id
        name
        assignedTo {
          username
        }
        createdBy {
          username
        }
        createdAt
        description
        status {
          name
        }
        priority {
          name
        }
        comments {
          id
          comment
          formattedCreatedAt
          createdAt
          createdBy {
            username
          }
        }
        tags {
          id
          name
        }
      }
      comments {
        id
        comment
        formattedCreatedAt
        createdAt
        createdBy {
          username
        }
      }
    }
  }
`;

export default GET_ONE_CASE;
