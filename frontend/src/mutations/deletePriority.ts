import gql from "graphql-tag";

const DELETE_A_PRIORITY = gql`
  mutation deletePriority($input: DeletePriorityInput!) {
    deletePriority(input: $input) {
      name
    }
  }
`;

export default DELETE_A_PRIORITY;
