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
      tasks {
        id
        name
        done
        description
      }
    }
  }
`;

export default GET_CASES;
