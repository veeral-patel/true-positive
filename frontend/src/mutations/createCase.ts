import gql from "graphql-tag";

const CREATE_A_CASE = gql`
  mutation createCase($input: CreateCaseInput!) {
    createCase(input: $input) {
      case {
        id
        name
      }
    }
  }
`;

export default CREATE_A_CASE;
