import gql from "graphql-tag";

const GET_TASKS = gql`
  query {
    tasks {
      id
      name
      done
      assignedTo {
        username
      }
      createdBy {
        username
      }
      createdAt
      case {
        id
        name
      }
    }
  }
`;

export default GET_TASKS;
