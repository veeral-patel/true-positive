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
        id
        name
      }
      tasks {
        id
        name
        done
        description
        tags {
          id
          name
        }
      }
    }
  }
`;

export default GET_CASES;
