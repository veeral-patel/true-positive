import gql from "graphql-tag";

const GET_CASES = gql`
  query {
    cases {
      id
      name
      description
      createdAt
      formattedCreatedAt
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
      tags
      tasks {
        id
        name
        description
        status {
          name
        }
        priority {
          name
        }
        tags
      }
    }
  }
`;

export default GET_CASES;
