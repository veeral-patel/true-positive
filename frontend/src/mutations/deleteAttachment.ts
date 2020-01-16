import gql from "graphql-tag";

const DELETE_ATTACHMENT = gql`
  mutation deleteAttachment($input: DeleteAttachmentInput!) {
    deleteAttachment(input: $input) {
      id
    }
  }
`;

export default DELETE_ATTACHMENT;
