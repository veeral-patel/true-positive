import gql from "graphql-tag";

const CHANGE_ASSIGNEE = gql`
  mutation changeAssignee($input: ChangeAssigneeInput!) {
    changeAssignee(input: $input) {
      case {
        id
      }
      task {
        id
      }
    }
  }
`;

export default CHANGE_ASSIGNEE;
