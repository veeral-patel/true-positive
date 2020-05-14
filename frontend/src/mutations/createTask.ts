import gql from "graphql-tag";

const CREATE_A_TASK = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        name
      }
    }
  }
`;

export default CREATE_A_TASK;
