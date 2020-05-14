import gql from "graphql-tag";

const GET_INDICATORS = gql`
  query {
    indicators {
      id
      name
      case {
        id
        name
      }
    }
  }
`;

export default GET_INDICATORS;
