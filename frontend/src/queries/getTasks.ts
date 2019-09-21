import gql from "graphql-tag";

const GET_TASKS = gql`
  query {
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
      status {
        name
      }
      priority {
        name
      }
      tags {
        id
        name
      }
      case {
        id
      }
    }
  }
`;

export default GET_TASKS;
