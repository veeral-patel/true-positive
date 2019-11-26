import gql from "graphql-tag";

const MERGE_A_CASE = gql`
  mutation mergeCase($input: MergeCaseInput!) {
    mergeCase(input: $input) {
      childCase {
        id
        name
      }
      parentCase {
        id
        name
      }
    }
  }
`;

export default MERGE_A_CASE;
