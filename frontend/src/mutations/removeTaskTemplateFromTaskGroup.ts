import gql from "graphql-tag";

const REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP = gql`
  mutation removeTaskTemplateFromTaskGroup(
    $input: RemoveTaskTemplateFromTaskGroupInput!
  ) {
    removeTaskTemplateFromTaskGroup(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP;
