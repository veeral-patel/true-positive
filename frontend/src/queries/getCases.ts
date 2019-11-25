import gql from "graphql-tag";

const GET_CASES = gql`
  query {
    cases {
      id
      name
      createdAt
      priority {
        name
      }
      status {
        name
      }
      assignedTo {
        username
      }
      tags {
        name
      }
      completedTaskCount
      totalTaskCount
    }
  }
`;

export default GET_CASES;
