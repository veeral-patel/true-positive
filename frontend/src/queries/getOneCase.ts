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
      mergedAt
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
      tasks {
        id
        name
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
          comment
          formattedCreatedAt
          createdAt
          createdBy {
            username
          }
        }
        indicators {
          id
          name
          createdAt
          description
          tags {
            name
          }
          createdBy {
            username
          }
          comments {
            comment
            createdAt
            createdBy {
              username
            }
          }
        }
        tags {
          id
          name
        }
      }
      comments {
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
