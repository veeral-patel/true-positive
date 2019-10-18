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
        done
        assignedTo {
          username
        }
        case {
          id
        }
        createdBy {
          username
        }
        createdAt
        description
        comments {
          id
          comment
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
        createdAt
        createdBy {
          username
        }
      }
    }
  }
`;

export default GET_ONE_CASE;
