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
      tags
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
        tags
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
