import gql from "graphql-tag";

const UPDATE_CREATE_CASE_EMAIL_ADDRESS = gql`
  mutation updateCreateCaseEmailAddress(
    $input: UpdateCreateCaseEmailAddressInput!
  ) {
    updateCreateCaseEmailAddress(input: $input) {
      createCaseEmailAddress {
        id
        email
      }
    }
  }
`;

export default UPDATE_CREATE_CASE_EMAIL_ADDRESS;
