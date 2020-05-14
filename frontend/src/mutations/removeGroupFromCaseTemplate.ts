import gql from "graphql-tag";

const REMOVE_GROUP_FROM_CASE_TEMPLATE = gql`
  mutation removeGroupFromCaseTemplate(
    $input: RemoveGroupFromCaseTemplateInput!
  ) {
    removeGroupFromCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default REMOVE_GROUP_FROM_CASE_TEMPLATE;
