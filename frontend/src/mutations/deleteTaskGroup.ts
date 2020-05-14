import gql from "graphql-tag";

const DELETE_A_TASK_GROUP = gql`
  mutation deleteTaskGroup($input: DeleteTaskGroupInput!) {
    deleteTaskGroup(input: $input) {
      id
    }
  }
`;

export default DELETE_A_TASK_GROUP;
