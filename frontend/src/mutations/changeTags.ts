import gql from "graphql-tag";

const CHANGE_TAGS = gql`
  mutation changeTags($input: ChangeTagsInput!) {
    changeTags(input: $input) {
      case {
        id
      }
      task {
        id
      }
      indicator {
        id
      }
    }
  }
`;

export default CHANGE_TAGS;
