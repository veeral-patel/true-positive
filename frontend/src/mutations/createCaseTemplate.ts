import gql from "graphql-tag";

const CREATE_A_CASE_TEMPLATE = gql`
  mutation createCaseTemplate($input: CreateCaseTemplateInput!) {
    createCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default CREATE_A_CASE_TEMPLATE;
