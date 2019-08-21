import gql from "graphql-tag";

const GET_PRIORITIES = gql`
  query {
    priorities {
      id
      name
    }
  }
`;

export default GET_PRIORITIES;
