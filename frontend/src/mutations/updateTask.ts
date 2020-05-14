import gql from "graphql-tag";

const UPDATE_TASK = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        name
      }
    }
  }
`;

export default UPDATE_TASK;
