import gql from "graphql-tag";

const RENAME_A_CASE = gql`
  mutation renameCase($input: RenameCaseInput!) {
    renameCase(input: $input) {
      case {
        name
      }
    }
  }
`;

export default RENAME_A_CASE;
