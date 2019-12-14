import gql from "graphql-tag";

const CREATE_AN_API_TOKEN = gql`
  mutation createApiToken($input: CreateApiTokenInput!) {
    createApiToken(input: $input) {
      apiToken {
        id
        name
        apiToken
      }
    }
  }
`;

export default CREATE_AN_API_TOKEN;
