import gql from "graphql-tag";

const CHANGE_PRIORITY = gql`
  mutation changePriority($input: ChangePriorityInput!) {
    changePriority(input: $input) {
      case {
        id
      }
      task {
        id
      }
    }
  }
`;

export default CHANGE_PRIORITY;
