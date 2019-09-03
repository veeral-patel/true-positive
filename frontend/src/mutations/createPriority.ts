import gql from "graphql-tag";

const CREATE_A_PRIORITY = gql`
  mutation createPriority($input: CreatePriorityInput!) {
    createPriority(input: $input) {
      priority {
        name
      }
    }
  }
`;

export default CREATE_A_PRIORITY;
