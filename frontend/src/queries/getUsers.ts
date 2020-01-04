import gql from "graphql-tag";

const GET_USERS = gql`
  query {
    users {
      username
      email
      disabled
    }
  }
`;

export default GET_USERS;
