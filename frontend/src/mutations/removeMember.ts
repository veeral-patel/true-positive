import gql from "graphql-tag";

const REMOVE_MEMBER = gql`
  mutation removeMember($input: RemoveMemberInput!) {
    removeMember(input: $input) {
      case {
        id
      }
    }
  }
`;

export default REMOVE_MEMBER;
