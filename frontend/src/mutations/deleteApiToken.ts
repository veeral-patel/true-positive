import gql from "graphql-tag";

const DELETE_AN_API_TOKEN = gql`
  mutation deleteApiToken($input: DeleteApiTokenInput!) {
    deleteApiToken(input: $input) {
      id
    }
  }
`;

export default DELETE_AN_API_TOKEN;
