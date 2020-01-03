import gql from "graphql-tag";

const REMOVE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
    removeUserFromGroup(input: $input) {
      group {
        id
        name
      }
    }
  }
`;

export default REMOVE_USER_FROM_GROUP;
