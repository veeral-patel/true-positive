import gql from "graphql-tag";

const ADD_USER_TO_CASE_TEMPLATE = gql`
  mutation addUserToCaseTemplate($input: AddUserToCaseTemplateInput!) {
    addUserToCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default ADD_USER_TO_CASE_TEMPLATE;
