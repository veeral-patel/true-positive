import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
  query {
    me {
      username
    }
  }
`;

export default GET_CURRENT_USER;
