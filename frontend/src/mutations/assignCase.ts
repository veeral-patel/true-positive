import gql from "graphql-tag";

const ASSIGN_CASE = gql`
  mutation assignCase($input: AssignCaseInput!) {
    assignCase(input: $input) {
      case {
        id
      }
    }
  }
`;

export default ASSIGN_CASE;
