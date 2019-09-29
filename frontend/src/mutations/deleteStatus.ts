import gql from "graphql-tag";

const DELETE_A_STATUS = gql`
  mutation deleteStatus($input: DeleteStatusInput!) {
    deleteStatus(input: $input) {
      name
    }
  }
`;

export default DELETE_A_STATUS;
