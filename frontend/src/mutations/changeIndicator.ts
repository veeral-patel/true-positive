import gql from "graphql-tag";

const CHANGE_AN_INDICATOR = gql`
  mutation changeIndicator($input: ChangeIndicatorInput!) {
    changeIndicator(input: $input) {
      indicator {
        id
        name
      }
    }
  }
`;

export default CHANGE_AN_INDICATOR;
