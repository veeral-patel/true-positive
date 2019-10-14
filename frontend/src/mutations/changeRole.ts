import gql from "graphql-tag";

const CHANGE_ROLE = gql`
  mutation changeRole($input: ChangeRoleInput!) {
    changeRole(input: $input) {
      case {
        id
      }
    }
  }
`;

export default CHANGE_ROLE;
