import { RouteComponentProps } from "@reach/router";
import React from "react";

interface Props extends RouteComponentProps {}

class AllTasksPage extends React.Component<Props> {
  render() {
    return <h2>Tasks</h2>;
  }
}

export default AllTasksPage;
