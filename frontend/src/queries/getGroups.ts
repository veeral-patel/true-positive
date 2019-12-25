import gql from "graphql-tag";

const GET_GROUPS = gql`
  query {
    groups {
      id
      name
      userCount
    }
  }
`;

export default GET_GROUPS;
