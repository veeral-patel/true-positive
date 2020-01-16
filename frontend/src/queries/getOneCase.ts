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
      caseMembers {
        role
        user {
          username
          email
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
