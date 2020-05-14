import gql from "graphql-tag";

const CHANGE_TASK_POSITION = gql`
  mutation changeTaskPosition($input: ChangeTaskPositionInput!) {
    changeTaskPosition(input: $input) {
      task {
        id
        name
      }
    }
  }
`;

export default CHANGE_TASK_POSITION;
