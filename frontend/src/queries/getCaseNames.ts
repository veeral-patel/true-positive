import gql from "graphql-tag";

const GET_CASE_NAMES = gql`
  query {
    cases {
      id
      name
    }
  }
`;

export default GET_CASE_NAMES;
