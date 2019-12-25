import gql from "graphql-tag";

const GET_ONE_CASE_TEMPLATE = gql`
  query getOneCaseTemplate($id: ID!) {
    caseTemplate(id: $id) {
      id
      name
      status {
        name
      }
      priority {
        name
      }
      tags {
        name
      }
      description
      assignedTo {
        username
      }
    }
  }
`;

export default GET_ONE_CASE_TEMPLATE;
