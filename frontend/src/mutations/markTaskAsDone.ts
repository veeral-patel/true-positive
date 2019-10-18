import gql from "graphql-tag";

const MARK_TASK_AS_DONE = gql`
  mutation markTaskAsDone($input: MarkTaskAsDoneInput!) {
    markTaskAsDone(input: $input) {
      task {
        id
        name
      }
    }
  }
`;

export default MARK_TASK_AS_DONE;
