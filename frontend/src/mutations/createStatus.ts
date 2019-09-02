import gql from "graphql-tag";

const CREATE_A_STATUS = gql`
  mutation createStatus($input: CreateStatusInput!) {
    createStatus(input: $input) {
      status {
        name
      }
    }
  }
`;

export default CREATE_A_STATUS;
