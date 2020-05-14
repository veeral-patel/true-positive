import gql from "graphql-tag";

const CREATE_A_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export default CREATE_A_COMMENT;
