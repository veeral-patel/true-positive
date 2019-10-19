import gql from "graphql-tag";

const RENAME_AN_INDICATOR = gql`
  mutation renameIndicator($input: RenameIndicatorInput!) {
    renameIndicator(input: $input) {
      indicator {
        name
      }
    }
  }
`;

export default RENAME_AN_INDICATOR;
