import gql from "graphql-tag";

const DELETE_CREATE_CASE_EMAIL_ADDRESS = gql`
  mutation deleteCreateCaseEmailAddress(
    $input: DeleteCreateCaseEmailAddressInput!
  ) {
    deleteCreateCaseEmailAddress(input: $input) {
      id
    }
  }
`;

export default DELETE_CREATE_CASE_EMAIL_ADDRESS;
