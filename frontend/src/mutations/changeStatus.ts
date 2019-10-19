import gql from "graphql-tag";

const CHANGE_STATUS = gql`
  mutation changeStatus($input: ChangeStatusInput!) {
    changeStatus(input: $input) {
      case {
        id
      }
    }
  }
`;

export default CHANGE_STATUS;
