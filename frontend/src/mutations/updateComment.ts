import gql from "graphql-tag";

const UPDATE_A_COMMENT = gql`
  mutation updateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export default UPDATE_A_COMMENT;
