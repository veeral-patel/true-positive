import gql from "graphql-tag";

const GET_TAGS = gql`
  query {
    tags {
      id
      name
    }
  }
`;

export default GET_TAGS;
