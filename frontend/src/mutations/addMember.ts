import gql from "graphql-tag";

const ADD_MEMBER = gql`
  mutation addMember($input: AddMemberInput!) {
    addMember(input: $input) {
      case {
        id
      }
    }
  }
`;

export default ADD_MEMBER;
