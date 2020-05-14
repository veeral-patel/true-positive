import gql from "graphql-tag";

const UPDATE_CASE = gql`
  mutation updateCase($input: UpdateCaseInput!) {
    updateCase(input: $input) {
      case {
        id
        name
      }
    }
  }
`;

export default UPDATE_CASE;
