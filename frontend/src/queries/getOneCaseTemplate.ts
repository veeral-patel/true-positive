import gql from "graphql-tag";

const GET_ONE_CASE_TEMPLATE = gql`
  query getOneCaseTemplate($id: ID!) {
    caseTemplate(id: $id) {
      id
      name
      description
      status {
        name
      }
      priority {
        name
      }
      tags {
        name
      }
      assignedTo {
        username
      }
      defaultUserCount
    }
  }
`;

export default GET_ONE_CASE_TEMPLATE;
