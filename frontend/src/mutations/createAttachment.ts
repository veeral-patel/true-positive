import gql from "graphql-tag";

const CREATE_ATTACHMENT = gql`
  mutation createAttachment($input: CreateAttachmentInput!) {
    createAttachment(input: $input) {
      attachment {
        id
        name
        url
      }
    }
  }
`;

export default CREATE_ATTACHMENT;
