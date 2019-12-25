import gql from "graphql-tag";

const GET_GROUPS = gql`
  query {
    groups {
      name
      userCount
    }
  }
`;

export default GET_GROUPS;
