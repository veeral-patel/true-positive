import gql from "graphql-tag";

const DISABLE_USER = gql`
  mutation disableUser($input: DisableUserInput!) {
    disableUser(input: $input) {
      user {
        username
      }
    }
  }
`;

export default DISABLE_USER;
