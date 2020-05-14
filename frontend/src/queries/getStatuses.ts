import gql from "graphql-tag";

const GET_STATUSES = gql`
  query {
    statuses {
      name
    }
  }
`;

export default GET_STATUSES;
