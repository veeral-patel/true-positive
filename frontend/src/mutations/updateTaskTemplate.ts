import gql from "graphql-tag";

const UPDATE_TASK_TEMPLATE = gql`
  mutation updateTaskTemplate($input: UpdateTaskTemplateInput!) {
    updateTaskTemplate(input: $input) {
      taskTemplate {
        id
        name
      }
    }
  }
`;

export default UPDATE_TASK_TEMPLATE;
