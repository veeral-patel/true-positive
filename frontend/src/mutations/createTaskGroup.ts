import gql from "graphql-tag";

const CREATE_A_TASK_GROUP = gql`
  mutation createTaskGroup($input: CreateTaskGroupInput!) {
    createTaskGroup(input: $input) {
      taskGroup {
        id
        name
      }
    }
  }
`;

export default CREATE_A_TASK_GROUP;
