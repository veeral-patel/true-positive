import gql from "graphql-tag";

const DELETE_A_CASE = gql`
  mutation deleteCase($input: DeleteCaseInput!) {
    deleteCase(input: $input) {
      id
    }
  }
`;

export default DELETE_A_CASE;
