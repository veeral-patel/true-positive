import gql from "graphql-tag";

const CREATE_CREATE_CASE_EMAIL_ADDRESS = gql`
  mutation createCreateCaseEmailAddress(
    $input: CreateCreateCaseEmailAddressInput!
  ) {
    createCreateCaseEmailAddress(input: $input) {
      createCaseEmailAddress {
        id
        email
      }
    }
  }
`;

export default CREATE_CREATE_CASE_EMAIL_ADDRESS;
