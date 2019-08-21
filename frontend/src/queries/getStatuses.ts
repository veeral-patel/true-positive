import gql from "graphql-tag";

const GET_STATUSES = gql`
  query {
    statuses {
      id
      name
    }
  }
`;

export default GET_STATUSES;
