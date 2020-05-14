import gql from "graphql-tag";

const DELETE_A_TASK = gql`
  mutation deleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export default DELETE_A_TASK;
