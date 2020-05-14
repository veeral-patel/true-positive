import gql from "graphql-tag";

const GET_TAGS = gql`
  query {
    tags {
      name
    }
  }
`;

export default GET_TAGS;
