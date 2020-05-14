import gql from "graphql-tag";

const ADD_TASK_TEMPLATE_TO_TASK_GROUP = gql`
  mutation addTaskTemplateToTaskGroup(
    $input: AddTaskTemplateToTaskGroupInput!
  ) {
    addTaskTemplateToTaskGroup(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default ADD_TASK_TEMPLATE_TO_TASK_GROUP;
