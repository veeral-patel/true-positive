import gql from "graphql-tag";

const DELETE_AN_INDICATOR = gql`
  mutation deleteIndicator($input: DeleteIndicatorInput!) {
    deleteIndicator(input: $input) {
      id
    }
  }
`;

export default DELETE_AN_INDICATOR;
