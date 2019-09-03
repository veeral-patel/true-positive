import gql from "graphql-tag";

const RENAME_A_PRIORITY = gql`
  mutation renamePriority($input: RenamePriorityInput!) {
    renamePriority(input: $input) {
      priority {
        name
      }
    }
  }
`;

export default RENAME_A_PRIORITY;
