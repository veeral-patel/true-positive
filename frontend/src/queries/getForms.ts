import gql from "graphql-tag";

const GET_FORMS = gql`
  query {
    forms {
      id
      name
      createdAt
      createdBy {
        username
      }
    }
  }
`;

export default GET_FORMS;
