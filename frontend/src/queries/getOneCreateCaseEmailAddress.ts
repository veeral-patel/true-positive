import gql from "graphql-tag";

const GET_ONE_CC_EMAIL_ADDRESS = gql`
  query createCaseEmailAddress($id: ID!) {
    createCaseEmailAddress(id: $id) {
      id
      email
      createdAt
      createdBy {
        username
      }
      defaultCreator {
        username
      }
      caseTemplate {
        id
      }
    }
  }
`;

export default GET_ONE_CC_EMAIL_ADDRESS;
