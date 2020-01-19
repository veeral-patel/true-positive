import gql from "graphql-tag";

const GET_CREATE_CASE_EMAIL_ADDRESSES = gql`
  query {
    createCaseEmailAddresses {
      id
      email
      createdAt
      createdBy {
        username
      }
    }
  }
`;

export default GET_CREATE_CASE_EMAIL_ADDRESSES;
