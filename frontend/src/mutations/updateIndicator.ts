import gql from "graphql-tag";

const UPDATE_INDICATOR = gql`
  mutation updateIndicator($input: UpdateIndicatorInput!) {
    updateIndicator(input: $input) {
      indicator {
        id
        name
      }
    }
  }
`;

export default UPDATE_INDICATOR;
