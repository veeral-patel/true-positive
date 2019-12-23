import gql from "graphql-tag";

const CREATE_CASE_FROM_TEMPLATE = gql`
  mutation createCaseFromTemplate($input: CreateCaseFromTemplateInput!) {
    createCaseFromTemplate(input: $input) {
      case {
        # CreateCaseModal.tsx uses the id from the response to redirect
        # the user to the newly created case, so don't remove id here
        id
        name
      }
    }
  }
`;

export default CREATE_CASE_FROM_TEMPLATE;
