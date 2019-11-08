import gql from "graphql-tag";

const GET_PRIORITIES = gql`
  query {
    priorities {
      name
    }
  }
`;

export default GET_PRIORITIES;
