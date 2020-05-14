import gql from "graphql-tag";

const CREATE_A_TASK_TEMPLATE = gql`
  mutation createTaskTemplate($input: CreateTaskTemplateInput!) {
    createTaskTemplate(input: $input) {
      taskTemplate {
        id
        name
      }
    }
  }
`;

export default CREATE_A_TASK_TEMPLATE;
