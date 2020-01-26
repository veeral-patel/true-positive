import gql from "graphql-tag";

const GET_ONE_CASE = gql`
  query getOneCase($id: ID!) {
    case(id: $id) {
      id
      name
      isMerged
      completedTaskCount
      totalTaskCount
      taskGroupCount
      tasks {
        id
        name
        done
        assignedTo {
          username
        }
        createdBy {
          username
        }
        createdAt
        description
        comments {
          id
          comment
          createdAt
          createdBy {
            username
          }
        }
        attachmentCount
        attachments {
          id
          name
          url
          createdAt
          size
          friendlySize
        }
      }
      attachmentCount
      attachments {
        id
        name
        url
        createdAt
        size
        friendlySize
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
          case {
            id
          }
          commentCount
        }
      }
      mergedInto {
        id
        name
      }
      mergedCases {
        id
        name
        reasonForMerging
      }
      caseMemberCount
      caseGroupCount
      caseMembers {
        role
        user {
          username
          email
        }
      }
      caseGroups {
        group {
          id
          name
          userCount
        }
      }
      description
      createdAt
      priority {
        name
      }
      status {
        name
      }
      createdBy {
        username
      }
      assignedTo {
        username
      }
      tags {
        name
      }
      indicators {
        id
        name
        indicator
        description
        type
        tags {
          name
        }
        createdBy {
          username
        }
        comments {
          id
          comment
          createdAt
          createdBy {
            username
          }
        }
        case {
          id
        }
        attachmentCount
        attachments {
          id
          name
          url
          createdAt
          size
          friendlySize
        }
      }
      comments {
        id
        comment
        createdAt
        createdBy {
          username
        }
      }
    }
  }
`;

export default GET_ONE_CASE;
