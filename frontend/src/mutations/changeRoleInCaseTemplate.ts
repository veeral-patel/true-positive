import gql from "graphql-tag";

const CHANGE_ROLE_IN_CASE_TEMPLATE = gql`
  mutation changeRoleInCaseTemplate($input: ChangeRoleInCaseTemplateInput!) {
    changeRoleInCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default CHANGE_ROLE_IN_CASE_TEMPLATE;
