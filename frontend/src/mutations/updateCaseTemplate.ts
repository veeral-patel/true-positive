import gql from "graphql-tag";

const UPDATE_CASE_TEMPLATE = gql`
  mutation updateCaseTemplate($input: UpdateCaseTemplateInput!) {
    updateCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default UPDATE_CASE_TEMPLATE;
