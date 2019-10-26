import { RouteComponentProps } from "@reach/router";
import React from "react";

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render() {
    return <h3>Search</h3>;
  }
}

export default SearchPage;
