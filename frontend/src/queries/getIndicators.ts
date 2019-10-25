import gql from "graphql-tag";

const GET_INDICATORS = gql`
  query {
    indicators {
      id
      name
      case {
        id
      }
    }
  }
`;

export default GET_INDICATORS;
