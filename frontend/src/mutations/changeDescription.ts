import gql from "graphql-tag";

const CHANGE_DESCRIPTION = gql`
  mutation changeDescription($input: ChangeDescriptionInput!) {
    changeDescription(input: $input) {
      case {
        id
      }
      task {
        id
      }
      indicator {
        id
      }
    }
  }
`;

export default CHANGE_DESCRIPTION;
