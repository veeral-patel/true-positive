import gql from "graphql-tag";

const GET_TASKS = gql`
      tasks {
        id
        name
        assignedTo {
          username
        }
        createdBy {
          username
        }
        createdAt
        status {
          name
        }
        priority {
          name
        }
        tags {
          id
          name
        }
      }
```;

export default GET_TASKS;
