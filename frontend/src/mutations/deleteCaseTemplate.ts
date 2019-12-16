import gql from "graphql-tag";

const DELETE_A_CASE_TEMPLATE = gql`
  mutation deleteCaseTemplate($input: DeleteCaseTemplateInput!) {
    deleteCaseTemplate(input: $input) {
      id
    }
  }
`;

export default DELETE_A_CASE_TEMPLATE;
