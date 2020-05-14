import gql from "graphql-tag";

const DELETE_A_COMMENT = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      id
    }
  }
`;

export default DELETE_A_COMMENT;
