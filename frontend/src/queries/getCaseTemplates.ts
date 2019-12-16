import gql from "graphql-tag";

const GET_CASE_TEMPLATES = gql`
    caseTemplates {
      id
      name
      createdAt
      createdBy {
        username
      }
    }
`;

export default GET_CASE_TEMPLATES;
