import gql from "graphql-tag";

const UPDATE_TASK_GROUP = gql`
  mutation updateTaskGroup($input: UpdateTaskGroupInput!) {
    updateTaskGroup(input: $input) {
      taskGroup {
        id
        name
      }
    }
  }
`;

export default UPDATE_TASK_GROUP;
