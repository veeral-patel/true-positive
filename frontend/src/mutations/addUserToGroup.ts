import gql from "graphql-tag";

const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($input: AddUserToGroupInput!) {
    addUserToGroup(input: $input) {
      group {
        id
        name
      }
    }
  }
`;

export default ADD_USER_TO_GROUP;
