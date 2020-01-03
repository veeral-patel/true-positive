import gql from "graphql-tag";

const GET_ONE_GROUP = gql`
  query getOneGroup($id: ID!) {
    group(id: $id) {
      id
      name
      userCount
      users {
        username
        email
      }
    }
  }
`;

export default GET_ONE_GROUP;
