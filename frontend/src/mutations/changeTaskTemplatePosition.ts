import gql from "graphql-tag";

const CHANGE_TASK_TEMPLATE_POSITION = gql`
  mutation changeTaskTemplatePosition(
    $input: ChangeTaskTemplatePositionInput!
  ) {
    changeTaskTemplatePosition(input: $input) {
      taskTemplate {
        id
        name
      }
    }
  }
`;

export default CHANGE_TASK_TEMPLATE_POSITION;
