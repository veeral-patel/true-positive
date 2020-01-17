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
        user {
          username
          email
        }
        role
      }
      defaultGroups {
        group {
          id
          name
          userCount
        }
      }
      taskGroups {
        id
        name
        tasks {
          id
          name
          description
          done
          assignedTo {
            username
          }
          commentCount
        }
      }
    }
  }
`;

export default GET_ONE_CASE_TEMPLATE;
