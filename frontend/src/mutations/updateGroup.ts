import gql from "graphql-tag";

const UPDATE_A_GROUP = gql`
  mutation updateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      group {
        id
        name
      }
    }
  }
`;

export default UPDATE_A_GROUP;
