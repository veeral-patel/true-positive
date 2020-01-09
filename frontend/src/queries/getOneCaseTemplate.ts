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
      defaultMembers {
        user {
          username
          email
        }
        role
      }
      defaultGroups {
        group {
          name
        }
      }
    }
  }
`;

export default GET_ONE_CASE_TEMPLATE;
