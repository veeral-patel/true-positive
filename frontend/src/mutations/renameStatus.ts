import gql from "graphql-tag";

const RENAME_A_STATUS = gql`
  mutation renameStatus($input: RenameStatusInput!) {
    renameStatus(input: $input) {
      status {
        name
      }
    }
  }
`;

export default RENAME_A_STATUS;
