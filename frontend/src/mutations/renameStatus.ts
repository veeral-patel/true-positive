import gql from "graphql-tag";

const RENAME_A_STATUS = gql`
  mutation renameStatus($input: RenameStatusPriority!) {
    renameStatus(input: $input) {
      priority {
        name
      }
    }
  }
`;

export default RENAME_A_STATUS;
