import gql from "graphql-tag";

const GET_DEFAULT_STATUS = gql`
  query {
    defaultStatus {
      name
    }
  }
`;

export default GET_DEFAULT_STATUS;
