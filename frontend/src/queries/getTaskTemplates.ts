import gql from "graphql-tag";

const GET_TASK_TEMPLATES = gql`
  query {
    taskTemplates {
      name
    }
  }
`;

export default GET_TASK_TEMPLATES;
