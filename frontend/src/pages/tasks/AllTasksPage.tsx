import { RouteComponentProps } from "@reach/router";
import { Typography } from "antd";
import React from "react";
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {}

class AllTasksPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <Paragraph>
          These are all the tasks in all the cases you're a member of.
        </Paragraph>
      </div>
    );
  }
}

export default AllTasksPage;
