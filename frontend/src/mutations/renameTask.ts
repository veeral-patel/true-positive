import gql from "graphql-tag";

const RENAME_A_TASK = gql`
  mutation renameTask($input: RenameTaskInput!) {
    renameTask(input: $input) {
      task {
        name
      }
    }
  }
`;

export default RENAME_A_TASK;
