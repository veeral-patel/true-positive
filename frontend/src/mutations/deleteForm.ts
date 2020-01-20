import gql from "graphql-tag";

const DELETE_A_FORM = gql`
  mutation deleteForm($input: DeleteFormInput!) {
    deleteForm(input: $input) {
      id
    }
  }
`;

export default DELETE_A_FORM;
