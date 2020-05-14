import gql from "graphql-tag";

const CREATE_TEXT_INDICATOR = gql`
  mutation createTextIndicator($input: CreateTextIndicatorInput!) {
    createTextIndicator(input: $input) {
      indicator {
        id
        name
      }
    }
  }
`;

export default CREATE_TEXT_INDICATOR;
