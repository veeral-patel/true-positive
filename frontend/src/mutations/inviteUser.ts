import gql from "graphql-tag";

const INVITE_USER = gql`
  mutation inviteUser($input: InviteUserInput!) {
    inviteUser(input: $input) {
      email
    }
  }
`;

export default INVITE_USER;
