import gql from "graphql-tag";

const CHANGE_ROLE_IN_CASE = gql`
  mutation changeRoleInCase($input: ChangeRoleInCaseInput!) {
    changeRoleInCase(input: $input) {
      case {
        id
      }
    }
  }
`;

export default CHANGE_ROLE_IN_CASE;
