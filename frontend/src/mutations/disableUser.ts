import gql from "graphql-tag";

const ENABLE_USER = gql`
  mutation enableUser($input: EnableUserInput!) {
    enableUser(input: $input) {
      user {
        username
      }
    }
  }
`;

export default ENABLE_USER;
