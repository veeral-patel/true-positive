import gql from "graphql-tag";

const CHANGE_A_COMMENT = gql`
  mutation changeComment($input: ChangeCommentInput!) {
    changeComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export default CHANGE_A_COMMENT;
