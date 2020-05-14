import gql from "graphql-tag";

const ADD_GROUP_TO_CASE = gql`
  mutation addGroupToCase($input: AddGroupToCaseInput!) {
    addGroupToCase(input: $input) {
      case {
        id
        name
      }
    }
  }
`;

export default ADD_GROUP_TO_CASE;
