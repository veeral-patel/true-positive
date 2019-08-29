import gql from "graphql-tag";

const GET_ONE_TASK = gql`
  query getOneTask($id: ID!) {
    task(id: $id) {
      id
      name
      status {
        name
      }
      priority {
        name
      }
      createdBy {
        username
      }
      assignedTo {
        username
      }
      description
    }
  }
`;

export default GET_ONE_TASK;
