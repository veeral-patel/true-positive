import gql from "graphql-tag";

const GET_GROUPS = gql`
  query {
    groups {
      name
    }
  }
`;

export default GET_GROUPS;
