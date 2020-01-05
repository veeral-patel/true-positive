import gql from "graphql-tag";

const REMOVE_USER_FROM_CASE_TEMPLATE = gql`
  mutation removeUserFromCaseTemplate(
    $input: RemoveUserFromCaseTemplateInput!
  ) {
    removeUserFromCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default REMOVE_USER_FROM_CASE_TEMPLATE;
