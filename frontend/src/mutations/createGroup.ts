import gql from "graphql-tag";

const CREATE_A_GROUP = gql`
  mutation createGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      group {
        id
        name
      }
    }
  }
`;

export default CREATE_A_GROUP;
