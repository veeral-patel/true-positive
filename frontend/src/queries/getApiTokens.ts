import gql from "graphql-tag";

const GET_API_TOKENS = gql`
  query {
    apiTokens {
      id
      name
      apiToken
    }
  }
`;

export default GET_API_TOKENS;
