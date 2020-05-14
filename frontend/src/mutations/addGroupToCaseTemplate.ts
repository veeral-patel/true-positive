import gql from "graphql-tag";

const ADD_GROUP_TO_CASE_TEMPLATE = gql`
  mutation addGroupToCaseTemplate($input: AddGroupToCaseTemplateInput!) {
    addGroupToCaseTemplate(input: $input) {
      caseTemplate {
        id
        name
      }
    }
  }
`;

export default ADD_GROUP_TO_CASE_TEMPLATE;
