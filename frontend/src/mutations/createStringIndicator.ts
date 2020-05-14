import gql from "graphql-tag";

const CREATE_STRING_INDICATOR = gql`
  mutation createStringIndicator($input: CreateStringIndicatorInput!) {
    createStringIndicator(input: $input) {
      indicator {
        id
        name
      }
    }
  }
`;

export default CREATE_STRING_INDICATOR;
