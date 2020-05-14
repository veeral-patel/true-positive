import gql from "graphql-tag";

const GET_TASK_TEMPLATES = gql`
  query {
    taskTemplates {
      id
      name
      createdAt
      createdBy {
        username
      }
    }
  }
`;

export default GET_TASK_TEMPLATES;
