import gql from "graphql-tag";

const GET_USERS = gql`
  query {
    users {
      username
      email
    }
  }
`;

export default GET_USERS;
