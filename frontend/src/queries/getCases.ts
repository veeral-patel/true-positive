import gql from "graphql-tag";

const GET_CASES = gql`
  query {
    cases {
      id
      name
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
