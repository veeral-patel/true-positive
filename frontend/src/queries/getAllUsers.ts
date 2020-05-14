import gql from "graphql-tag";

const GET_ALL_USERS = gql`
  query {
    allUsers {
      username
      email
      disabled
    }
  }
`;

export default GET_ALL_USERS;
