import gql from "graphql-tag";

const REMOVE_GROUP_FROM_CASE = gql`
  mutation removeGroupFromCase($input: RemoveGroupFromCaseInput!) {
    removeGroupFromCase(input: $input) {
      case {
        id
        name
      }
    }
  }
`;

export default REMOVE_GROUP_FROM_CASE;
