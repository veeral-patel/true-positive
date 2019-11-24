import gql from "graphql-tag";

const GET_ONE_TASK_TEMPLATE = gql`
  query getOneTaskTemplate($id: ID!) {
    taskTemplate(id: $id) {
      id
      name
      description
      assignedTo {
        username
      }
    }
  }
`;

export default GET_ONE_TASK_TEMPLATE;
