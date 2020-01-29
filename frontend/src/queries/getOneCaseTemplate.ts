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
      defaultMemberCount
      defaultGroupCount
      defaultMembers {
        role
        user {
          username
          email
        }
      }
      defaultGroups {
        role
        group {
          id
          name
          userCount
        }
      }
      taskGroups {
        id
        name
        taskTemplates {
          id
          name
          description
          assignedTo {
            username
          }
        }
      }
    }
  }
`;

export default GET_ONE_CASE_TEMPLATE;
