import gql from "graphql-tag";

const DELETE_A_GROUP = gql`
  mutation deleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) {
      id
    }
  }
`;

export default DELETE_A_GROUP;
