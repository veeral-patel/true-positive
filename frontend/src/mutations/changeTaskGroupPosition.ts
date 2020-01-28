import gql from "graphql-tag";

const CHANGE_TASK_GROUP_POSITION = gql`
  mutation changeTaskGroupPosition($input: ChangeTaskGroupPositionInput!) {
    changeTaskGroupPosition(input: $input) {
      taskGroup {
        id
        name
      }
    }
  }
`;

export default CHANGE_TASK_GROUP_POSITION;
