import gql from "graphql-tag";

const DELETE_A_TASK_TEMPLATE = gql`
  mutation deleteTaskTemplate($input: DeleteTaskTemplateInput!) {
    deleteTaskTemplate(input: $input) {
      id
    }
  }
`;

export default DELETE_A_TASK_TEMPLATE;
